<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActiviteRessource;
use App\Mail\ActivityMail;
use App\Models\activites;
use App\Services\Activity;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Excel;

class ActivitesController extends Controller
{
    //
    // public function __construct(public Activity $activite){}
    private array $states=['publie', 'attente', 'annule'];

    public function MesActivites(Request $request)
    {
        $user = $request->user();

        try {

            $activites = activites::where('gerant_id', $user->id)->get();
            if (!$activites) {
                return response()->json([
                    'message' => 'vous n\'avez aucune activite pour le moment'
                ], 200);
            }

            // $activites = ActiviteRessource::collection($activites)

            return response()->json([
                'activites' => ActiviteRessource::collection($activites)
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    protected function Activity(array $data)
    {

        $activites = activites::create(
            $data
        );
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
        if (!$user->IsActif()) {
            return response()->json([
                'message' => 'abonnement expirer veuillez vous reaboabonner pour continuer'
            ], 401);
        }

        Log::info('donne recus des activites ' . $request->formData);

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
                'standard' => 4,
                'pro' => 8,
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

                if ($res['data']->status == 'publie') {
                    // rechercher les adherents 
                    $salle = $user->salle;
                    $adh = $salle->adherentsActif();

                    foreach ($adh as $ad) {
                        Mail::to($ad->email)->queue(new ActivityMail($salle, $res['data']));
                    }
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

                if ($res['data']->status == 'publie') {
                    // rechercher les adherents 
                    $salle = $user->salle;
                    $adh = $salle->adherentsActif();

                    foreach ($adh as $ad) {
                        Mail::to($ad->email)->queue(new ActivityMail($salle, $res['data']));
                    }
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
        } catch (Exception $e) {
            Log::error($e->getMessage());

            return response()->json([
                'message' => $e->getMessage(),
            ]);
        }
    }


    public function DeletedActivity(Request $request)
    {
        $user = $request->user();
        if (!$user->IsActif()) {
            return response()->json([
                'message' => 'abonnement expirer veuillez vous reaboabonner pour continuer'
            ], 401);
        }
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
            $oldImages = $activite->images_activte;
            if ($oldImages && Storage::disk('public')->exists('documents/' . $oldImages)) {
                Storage::disk('public')->delete('documents/' . $oldImages);
            }
            if ($activite->delete()) {
                $activite->status = 'attente';
                $activite->save();
                // appeler la methode delete dans \services\activity pour envois un mail pour notifier l'annulation et le repport
            }
            return response()->json([
                'message'=> ' activite supprimer avec success'
            ]);
        } catch (Exception $e) {
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

    public function UpdateActivite(Request $request)
    {
        $user = $request->user();

        if (!$user->IsActif()) {
            return response()->json([
                'message' => 'abonnement expirer veuillez vous reaboabonner pour continuer'
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            "id" => 'required',
            "nom_activite" => 'nullable|string',

            "descriptions" => 'nullable|string',

            "images_activte" => 'nullable|image',

            "date_activite" => 'nullable',

            "heure_activite" => 'nullable',

            "status" => 'nullable|in:attente,publie,annule',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'une erreur est survenue'
            ], 400);
        }

        DB::beginTransaction();
        try {


            $activite = activites::find($request->id);
            if (!$activite || $activite->gerant_id != $user->id) {
                return response()->json([
                    'message' => 'Oups !! activite indisponible'
                ]);
            }
            $oldImages = $activite->images_activte;



            if ($request->hasFile('images_activte')) {

                if ($oldImages && Storage::disk('public')->exists('documents/' . $oldImages)) {
                    Storage::disk('public')->delete('documents/' . $oldImages);
                }
                $images_activte = $user->id . 'images_activte' . time() . '.' . $request->file('images_activte')->extension();

                if ($images_activte) {
                    $request->file('images_activte')->storeAs('documents', $images_activte, 'public');
                }
            }

            $activite->update([
                "nom_activite" => $request->nom_activite ?? $activite->nom_activite,

                "descriptions" => $request->descriptions ?? $activite->descriptions,

                "images_activte" => $images_activte ?? $oldImages,

                "date_activite" => $request->date_activite ?? $activite->date_activite,

                "heure_activite" => $request->heure_activite ?? $activite->heure_activite,

                "status" => $request->status ?? $activite->status,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'activiter creer avec succes'
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("update activite errorrs" . $e->getTraceAsString());

            return response()->json([
                'message' => 'Oups !! une erreur est survenue',
                'ms' => $e->getTraceAsString()
            ], 500);
        }
    }


    public function SendToAdherent(Request $request)
    {
        $user = $request->user();
        if (!$user->IsActif()) {
            return response()->json([
                'message' => 'abonnement expirer veuillez vous reaboabonner pour continuer'
            ], 401);
        }
        $validator = Validator::make($request->all(), [
            'id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Oups !! donnees manquantes veuillez ressayer'
            ]);
        }
        try {

            $salle = $user->salle;
            $adh = $salle->adherentsActif();
            $activite = activites::find((int)$request->id);
            if (!$activite || $activite->gerant_id != $user->id) {
                return response()->json([
                    'message' => 'Oups !! une erreur est survenue'
                ], 409);
            }
            if ($activite->Ispast()) {
                return response()->json([
                    'message' => 'votre activite est passe. Impossible d\'envoyer a vos utilisateur'
                ], 409);
            }

            if ($activite->status == 'publie') {
                // rechercher les adherents 
                // Log::info($salle);
                // Log::info($activite);

                foreach ($adh as $ad) {
                    Mail::to($ad->email)->queue(new ActivityMail($salle, $activite));
                }
            }
            return response()->json([
                'mesage' => 'mail envoyer...'
            ]);
        } catch (Exception $e) {
            Log::error('activite publication exception ' . $e->getMessage());
            return response()->json([
                'message' => 'erreur liee au serveur ! Veuillez reessayer'
            ], 500);
        }
    }



public function switchStatus(Request $request)
{
    $user = $request->user();

    $validator = Validator::make($request->all(), [
        'id' => 'required|integer'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Identifiant non fourni'
        ], 400);
    }

    DB::beginTransaction();

    try {

        $activite = Activites::find($request->id);

        if (!$activite || $activite->gerant_id != $user->id) {
            return response()->json([
                'message' => 'Une erreur est survenue'
            ], 409);
        }
        if ($activite->Ispast()){
            return response()->json([
                'message'=> 'veuillez mettre a jour l\'activite avant de pouvoir modifier les Etats'
            ],409);
        }
        // recup la position du status
        $currentIndex = array_search($activite->status, $this->states);

        if ($currentIndex === false) {
            return response()->json([
                'message' => 'Status invalide'
            ], 400);
        }

        // Passer au status suivant+++
        $nextIndex = ($currentIndex + 1) % count($this->states);

    
        $activite->update([
            'status'=>$this->states[$nextIndex]
        ]);
       

        DB::commit();

        return response()->json([
            'message' => 'Status mis à jour',
            'status' => $activite->status
        ],200);

    } catch (Exception $e) {

        DB::rollBack();

        return response()->json([
            'message' => 'Oups !! une erreur est survenue',
            'error' => $e->getMessage()
        ], 500);
    }
}
}
