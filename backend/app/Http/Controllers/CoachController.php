<?php

namespace App\Http\Controllers;

use App\Http\Resources\CoachRessource;
use App\Models\coach;
use App\Models\coach_salle;
use Exception;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use League\Uri\Encoder;

class CoachController extends Controller
{

    // gerer , affecter ,les coach a un cours 
    // modifier,supprimer, un coach

    public function AjouterCoach(Request $request)
    {

        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'telephone' => 'required|string|min:8',
            'competence' => 'required|array'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'les champs ne sont pas correctement remplis'
            ], 400);
        }

        DB::beginTransaction();
        try {
            $exist = $user->salle->coach->where('telephone', $request->telephone);

            if ($exist->IsNotEmpty()) {
                return response()->json([
                    'message' => 'cet numero est associer a un coach'
                ], 409);
            }

            $c = coach::create([
                'nom' => strtolower($request->nom),
                'prenom' => strtolower($request->prenom),
                'telephone' => $request->telephone,
                'skills' => $request->competence,

            ]);


            coach_salle::forceCreate([
                'coach_id' => $c->id,
                'salle_id' => $user->salle->id,

            ]);
            Cache::forget('coach_' . $user->id);

            DB::commit();
            return response()->json([
                'message' => 'coach ajouter a votre salle avec succes'
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'une erreur est survennue',
                'trace' => $e->getMessage() . ' ' . $e->getTraceAsString()
            ], 500);
        }
    }

    public function mesCoach(Request $request)
    {
        $user = $request->user();
        $coach = Cache::remember('coach_' . $user->id, now()->addMinutes(5), function () use ($user) {
            return $user->salle->coach;
        });

 

        return response()->json([
            'coach' => CoachRessource::collection( $coach),
   



        ]);

    }

    public function deleteCoach(Request $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'veuillez remplir correctement les champs'
            ], 400);
        }


        try {
            DB::beginTransaction();
            $coach = $user->salle->coach->where('id', $request->id);
            if ($coach->IsEmpty()) {
                return response()->json([
                    'message' => 'coach non trouve'
                ], 404);
            }

            $coach->delete();
            Cache::forget('coach_' . $user->id);
            DB::commit();

            return response()->json([
                'message' => 'coach supprimer avec succes'
            ], 200);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                'message' => 'une erreu est survenue',
                'trace' => $e->getMessage() . ' ' . $e->getTraceAsString()
            ], 500);

        }
    }

    public function UpdateCoach(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'email' => 'nullable|email',
            'nom' => 'nullable|string',
            'prenom' => 'nullable|string',
            'telephone' => 'nullable|string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'champ {id} requis'
            ]);
        }

        $user = $request->user();

        try {
            $coach = coach::find($request->id);
            if (!$coach->exists || $coach->salle_id === $user->salle->id) {
                return response()->json(
                    [
                        'message' => 'une erreur est survenue veuillez ressayer plus tard'
                    ],
                    500
                );
            }
  

            $coach->update([
                'email' => $request->email ?? $coach->email,
                'nom' => $request->nom ?? $coach->nom,
                'prenom' => $request->prenom ?? $coach->prenom,
                'telephone' => $request->telephone ?? $coach->telephone
            ]);
             DB::commit();

                return response()->json([
                'coach' => CoachRessource::collection($coach)
            ], 200);

        } catch (Exception $e) {
        }
    }


    public function affecterCoachCours(Request $request){
        $user = $request->user();
        // un cours est avec des adherant precis 
        // le gerant selectionne le nombre d'haderant pour programmer a un cours precis
        // le coach doit etre disponible 
        // notifier le coach par sms ou par mail pour prendre par de sa disponibilte
        
        $validator = Validator::make($request->all(),[
            'id_adherent'=>'required|array|integer',
            'date'=>'required',
            'heure'=>'required',
            'coach_id'=>'required'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=> 'remplir tous les champs'
            ],400);
            
        }

        try{
            $coach = coach::findOrFail($request->coach_id);

            // on recupere tous les cours et on verifie les coachs non libre




        }
        catch(Exception $e){
            
        }

    } 




}
