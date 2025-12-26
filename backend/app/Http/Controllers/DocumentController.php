<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\salle;
use App\Models\document;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Mail\DocumentValiation;
use App\Mail\DemandeVerification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\File;

class DocumentController extends Controller
{
    // au cas ou on doit verifier une salle qui viens detre creer
// public function SalleDocument(Request $request)
// {
//     $current = $request->user();

//     // Validation
//     $validator = Validator::make($request->all(), [
//         'salle_id' => 'required|integer',
//         'rccm' => 'required|string',
//         'ufi' => 'required|string',
//         'numero_identite' => 'required|max:13',
//         'document_type' => 'required|string',
//         'recto' => 'required|mimes:pdf,png,jpeg,jpg',
//         'verso' => 'required|mimes:pdf,png,jpeg,jpg'
//     ]);

//     if ($validator->fails()) {
//         return response()->json([
//             'message' => 'Veuillez remplir les champs correctement'
//         ], 400);
//     }

//     // Vérifier la salle
//     $salle = Salle::find($request->salle_id);
//     if (!$salle || $salle->id != $current->salle()->id) {
//         return response()->json(['message' => 'Salle invalide'], 404);
//     }

//     // Vérifier les fichiers
//     if (
//         !$request->hasFile('recto') || !$request->file('recto')->isValid() ||
//         !$request->hasFile('verso') || !$request->file('verso')->isValid()
//     ) {
//         return response()->json(['message' => 'Fichiers invalides'], 422);
//     }

//     $timestamp = now()->timestamp;
    
//     // Génération des noms de fichiers
//     $rectoName = $salle->id . '_recto_' . $timestamp . '.' . $request->file('recto')->getClientOriginalExtension();
//     $versoName = $salle->id . '_verso_' . $timestamp . '.' . $request->file('verso')->getClientOriginalExtension();

//     try {
//         // Upload vers MinIO - Méthode 1: Utiliser putFileAs avec l'instance UploadedFile
//         $rectoPath = Storage::disk('minio')->putFileAs('documents', $request->file('recto'), $rectoName);
//         $versoPath = Storage::disk('minio')->putFileAs('documents', $request->file('verso'), $versoName);
        
//         // Alternative: Utiliser storeAs si la méthode ci-dessus ne fonctionne pas
//         // $rectoPath = $request->file('recto')->storeAs('documents', $rectoName, 'minio');
//         // $versoPath = $request->file('verso')->storeAs('documents', $versoName, 'minio');

//         // Vérification
//         if (!$rectoPath || !$versoPath) {
//             return response()->json(['message' => 'Échec de l\'upload vers MinIO'], 500);
//         }

//         // URLs publiques
//         $rectoUrl = Storage::disk('minio')->url($rectoPath);
//         $versoUrl = Storage::disk('minio')->url($versoPath);

//         // Création du document
//         $document = Document::create([
//             'type' => $request->document_type,
//             'numero_identite' => $request->numero_identite,
//             'recto' => $rectoUrl,
//             'verso' => $versoUrl,
//             'status' => 'attente',
//             'salle_id' => $salle->id,
//             'date_soumission' => now(),
//             'date_verification' => null
//         ]);

//         // Notification admin
//         if ($document->exists()) {
//             Mail::to(env('ADMIN'))->queue(new DocumentValiation($current, $document));
//         }

//         return response()->json([
//             'message' => 'Documents soumis avec succès',
//             'recto_url' => $rectoUrl,
//             'verso_url' => $versoUrl
//         ], 201);

//     } catch (\Exception $e) {
//         \Log::error('Erreur upload MinIO: ' . $e->getMessage());
//         return response()->json([
//             'message' => 'Erreur lors de l\'upload des fichiers',
//             'error' => $e->getMessage()
//         ], 500);
//     }
// }
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
                $salle=$current->salle;
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
