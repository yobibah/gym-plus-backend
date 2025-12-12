<?php

namespace App\Http\Controllers;

use App\Mail\DemandeVerification;
use App\Models\salle;
use App\Models\document;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Mail\DocumentValiation;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class DocumentController extends Controller
{
    // au cas ou on doit verifier une salle qui viens detre creer
    public function SalleDocuemnt(Request $request)
    {
        $current = $request->user();

        $validator = Validator::make($request->all(), [
            'salle_id' => 'required|integer',
            'rccm' => 'required|string',
            'ufi' => 'required|string',
            "numero_identite" => "required|max:13",
            "document_type" => "required|string",
            'recto' => 'required|mimes:pdf,png,jpeg,jpg',
            'verso' => 'required|mimes:pdf,png,jpeg,jpg'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'veuillez remplir les champs avec les bones valeurs'
            ], 400);
        }

        //  enregistrer les documents...


        // verifier si la salle existe
        $salle = salle::find($request->salle_id);
        if ($salle->id == $current->salle()->id) {
            // recto et verso des fichier a verifier si ca concorde
            if ($request->hasFile('recto') && $request->hasFile('verso')) {
                $rectoName = $salle->id . '_recto_' . time() . '.' . $request->file('recto')->extension();
                $versoName = $salle->id . '_verso_' . time() . '.' . $request->file('verso')->extension();
                // $versoName = $salle->id . "." . $request->file('verso')->extension() . rand(111, 999);
                if ($rectoName && $versoName) {
                    $request->file('recto')->storeAs('documents', $rectoName, 'public');
                    $request->file('verso')->storeAs('documents', $versoName, 'public');

                }
            }

            $documment = document::create([
                //type = cni ou passport
                "type" => $request->type,
                "numero_identite" => $request->numero_identite,
                "recto" => $rectoName,
                "verso" => $versoName,
                "status" => 'attente',
                "salle_id" => $salle->id,
                "date_soumission" => Carbon::now(),
                "date_verification" => null,
            ]);

            if ($documment->exists()) {
                //notifier les admins sur les potentiels envois de document de verifications .....
                if (
                    Mail::to(env('ADMIN'))->queue(
                        new DocumentValiation($current, $documment)
                    )
                ) {
                    return response()->json([
                        'message' => 'votre document a ete soumis nous vous reviendrons dans 72h au plus',
                    ], 201);
                }

            }
        }
    }


    public function ApprouveDesaprouve(Request $request)
    {
        $current = $request->user();
        try {
            if ($current->hasrole('superAdmin')) {
                $validator = Validator::make($request->all(), [
                    'document_id' => 'required|integer',
                    'salle_id' => 'required|integer',
                    'action' => 'required|string'
                ]);

                if ($validator->fails()) {
                    return response()->json([
                        'message' => 'les champs ne sont pas correctement renseigne'
                    ], 400);
                }

                //trouver la salle

                $document = document::find($request->document_id);
                $document->date_verification = Carbon::now();
                $document->save();
                // salle;
                $salle = $document->salle()->first();
                if ($salle->id != $document->salle_id) {
                    return response()->json([
                        'message' => ' Oups salle non trouvee'
                    ], 404);
                }
                // if($request->action != 'Approuve'){
                //       $salle->active =true;
                //      $salle->save();
                // }


                $request->action = 'Approuve' ? $salle->active = true : $salle->active = false;

                // $salle->active =true;
                $salle->save();
                $gerant = User::where('id', $salle->gerant_id)
                    ->wherehas('role', fn($q) => $q->where('name', 'Gerant')->first()->id)
                    ->first();

                //notifier par mail 

                Mail::to($gerant->email)->queue(
                    new DemandeVerification($gerant, $document)
                );

                return response()->json([
                    'message' => $salle->active ? 'Felicitation votre salle a ete active vous pouvez commenencer le boulot'
                        : 'les documents fournis ne sont pas conforme veuillez resoumettre les documents requis'
                ]);


            }

            return response()->json([
                'message' => 'vous n\'avez pas l\'autorisation'
            ], 401);
        } catch (Exception $th) {
            //throw $th;
        }

    }

  

}
