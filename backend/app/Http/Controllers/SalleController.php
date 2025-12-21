<?php

namespace App\Http\Controllers;

use App\Mail\DocumentValiation;
use App\Models\document;
use App\Models\salle;
use App\Models\User;
use App\Services\Otp;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Exists;

class SalleController extends Controller
{
    public function AjouterSalle(Request $request)
    {
        $current = $request->user();
        // verifier d'abord s'il a une salle et voir selon son forfaits
        $salle = Salle::where('gerant_id', $current->id);

        if ($salle->count->exists())
            return response()->json(['message' => 'vous avez deja une salle']);

        $validator = Validator::make($request->all(), [
            'nomSalle' => 'required|string',
            'ville' => 'required|string',
            'region' => 'required|string',
            'pays' => 'required|string',
            'description' => 'nullable|string',
            'numRegistre' => 'required|string',
            'numFiscale' => 'required|string',
            // "numero_identite" => "required|max:13",
            // "document_type" => "required|string",
            'fileRVerso' => 'required|file',
            'fileF' => 'required|file'
        ]);


        if ($validator->fails()) {
            Log::info($validator->errors()->all());

            return response()->json([
                'message' => 'Veuillez remplir correctement tous les champs',
                'errors' => $validator->errors(),
            ], 400);
        }

        try {


            $salle = salle::create([
                'nom_salle' => $request->nomSalle,
                'numero_salle' => $current->telephone,
                'ville' => $request->ville,
                'region_salle' => $request->region,
                'email_salle' => $current->email,
                'pays_salle' => $request->pays,
                'descriptions_salle' => $request->description ?? 'Pas de description',
                'logo_salle' => '',
                'adresse_salle' => $request->ville . ' ' . $request->region . ' ' . $request->pays,
                'gerant_id' => $current->id,
                // 'document_id'       => null, // en attendant l'upload de document
            ]);
            // valider la salle 

            // if(!$salle->active){
            //     //soummission des document de validation ou une alerte pour valider la salle
            // }


            // recto et verso des fichier a verifier si ca concorde
            if ($request->hasFile('fileF') && $request->hasFile('fileRVerso')) {
                $rectoName = $salle->id . '_recto_' . time() . '.' . $request->file('fileF')->extension();
                $versoName = $salle->id . '_verso_' . time() . '.' . $request->file('fileRVerso')->extension();
                // $versoName = $salle->id . "." . $request->file('verso')->extension() . rand(111, 999);

                $rectoPath = Storage::disk('minio')->putFileAs('documents', $request->file('recto'), $rectoName);
                $versoPath = Storage::disk('minio')->putFileAs('documents', $request->file('verso'), $versoName);

                // Alternative: Utiliser storeAs si la méthode ci-dessus ne fonctionne pas
                // $rectoPath = $request->file('recto')->storeAs('documents', $rectoName, 'minio');
                // $versoPath = $request->file('verso')->storeAs('documents', $versoName, 'minio');
                $rectoUrl = Storage::disk('minio')->url($rectoPath);
                $versoUrl = Storage::disk('minio')->url($versoPath);

                // Vérification
                if (!$rectoPath || !$versoPath) {
                    return response()->json(['message' => 'Échec de l\'upload vers MinIO'], 500);
                }


            }


            //apres je viens verifier ici
            $documment = document::create([
                //type = cni ou passport
                "type" => $request->type_document ? $request->type_document : 'cni',
                "numero_identite" => $request->numRegistre . ' ' . $request->numFiscale,
                "recto" => $rectoUrl,
                "verso" => $versoUrl,
                "status" => 'attente',
                "salle_id" => $salle->id,
                "date_soumission" => Carbon::now(),
                "date_verification" => null,
            ]);


            //notifier les admins sur les potentiels envois de document de verifications .....

            Mail::to(env('ADMIN'))->queue(
                new DocumentValiation($current, $documment)
            );

            return response()->json([
                'message' => 'Salle créée avec succès et demande de verification soumise avec succes',
                'salle' => $salle,
                'valide' => $salle->active ? 'la salle est active' : ' la salle n\'a pas ete activer veuilez soumettre les documents de verifications',
            ], 201);



        } catch (Exception $e) {

            Log::error("Erreur création salle : " . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la création de la salle.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



}
