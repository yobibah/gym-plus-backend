<?php

namespace App\Http\Controllers;

use App\Models\coach;
use App\Models\coach_salle;
use Exception;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CoachController extends Controller
{
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
        $coach = $user->salle->coach;
        return response()->json([
            'coach' => $coach,

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

            DB::commit();

            return response()->json([
                'message' => 'coach supprimer avec succes'
            ], 200);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                'message' => 'une erreu est survenue',
                'trace'=>$e->getMessage(). ' ' .$e->getTraceAsString()
            ], 500);

        }
    }

    public function UpdateCoach(Request $request){
        
    }

}
