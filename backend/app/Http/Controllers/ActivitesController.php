<?php

namespace App\Http\Controllers;

use App\Models\activites;
use App\Services\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ActivitesController extends Controller
{
    //
    // public function __construct(public Activity $activite){}

        public function MesActivites(Request $request){
        $user = $request->user();

        try{

        $activites = activites::where('gerant_id',$user->id)->get();
        if ($activites->isEmpty()) {
            return response()->json([
                'message' => 'vous n\'avez aucune activite pour le moment'
            ], 200);
        }
        return response()->json($activites);    

        }
        catch(\Exception $e){
            Log::error($e->getMessage());
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
            
        }
    }
    protected function Activity(array $data)
    {

        $activites = activites::create(
            $data);
        if (!$activites) {
            return [
                'status' => true,
                'data' => $activites ?? [],
                'code' => '500'

            ];
        }

        return [
            'status' => false,
            'data' => $activites,
            'code' => 201

        ];
    }

    public function createActivity(Request $request)
    {
        $user = $request->user();

        Log::info('donne recus des activites '.$request->formData);

        try {


            $validator = Validator::make($request->all(), [
                "nom_activite" => 'required|string',

                "descriptions" => 'required|string',

                "images_activte" => 'nullable|image',

                "date_activite" => 'required',

                "heure_activite" => 'required',

                "status" => 'required|in:attente,publie,annule',
            ]);

            Log::info($request->all());

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'veuillez remplir les champs correctements',
                    'ms' => $validator->errors()->all()
                ], 400);
            }
            $images_activte = '';

            if ($request->hasFile('images_activte')) {
                $images_activte = $user->id . 'images_activte' . time() . '.' . $request->file('images_activte')->extension();

                // $versoName = $salle->id . "." . $request->file('verso')->extension() . rand(111, 999);
                if ($images_activte) {
                    $request->file('images_activte')->storeAs('documents', $images_activte, 'public');
                }
            }

            $data = [
                "nom_activite" => $request->nom_activite,

                "descriptions" => $request->descriptions,

                "images_activte" => $images_activte,

                "date_activite" => $request->date_activite,

                "heure_activite" => $request->heure_activite,

                "status" => $request->status,
                "gerant_id" => $user->id,
            ];
            if (!$user->hasRole("Gerant")) {
                return response()->json([
                    'message' => 'seule les gerants sont habilette a creer une activitees'
                ], 401);
            }
            //virifier la duree de vide......

            $limit = [
                'standard' => 10,
                'pro' => 100,
            ];

            $countActivity = activites::where('gerant_id', $user->id)->count();

            if ($user->dernierPaiementReussi->plan === 'premium') {
                // creer plusieurs fois
                $res = self::Activity($data);
                if ($res['status'] && $res['code'] == 500) {
                    return response()->json([
                        'message' => 'Oups !! une erreur est survenue lors de la creation'
                    ], $res['code']);
                }
                return response()->json([
                    'message' => 'une activite a ete cree vos adherant seront notifie'
                ], $res['code']);

                Log::error($res['code']);

                // notifier tous les utilisateurs sur les potentiels activites lier a la salle
            } else
                if ($countActivity < $limit[$user->dernierPaiementReussi->plan]) {
                $res = self::Activity($data);
                if ($res['status'] && $res['code'] == 500) {
                    return response()->json([
                        'message' => 'Oups !! une erreur est survenue lors de la creation'
                    ], $res['code']);
                }

                return response()->json([
                    'message' => 'une activite a ete cree ',
                    $user->dernierPaiementReussi->plan === 'pro' ? ' vos adherant seront notifie ' : ''
                ], $res['code']);
            } else {
                return response()->json([
                    'message' => 'vous avez atteint votre limite. vous n\'etes plus autoriser a creer des activite passer a la version pro'
                ], 401);
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return response()->json([
                'message' => $e->getMessage(),
            ]);
        }
    }


    public function DeletedActivity(Request $request)
    {
        $user = $request->user();
        if (!$user->hasRole('Gerant'))
            return response()
                ->json(['message' => 'vous n\'etes pas autorise'], 401);
        try {
            $validator = Validator::make($request->all(), [
                'id' => 'required|integer'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'ce id n\'existe pas',
                ], 400);
            }

            $activite = activites::find($request->id);
            if ($activite->delete()) {
                $activite->status = 'attente';
                $activite->save();
                // appeler la methode delete dans \services\activity pour envois un mail pour notifier l'annulation et le repport
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function reporter(Request $request)
    {
        $user = $request->user();
        if (!$user->hasRole('Gerant')) {
            return response()->json(['message' => 'vous n\'etes pas autoriser'], 401);
        }
    }

    public function update(Request $request) {}
}
