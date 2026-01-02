<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\salle;
use App\Services\Otp;
use App\Models\document;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Mail\DocumentValiation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Exists;
use Illuminate\Support\Facades\Validator;

class SalleController extends Controller
{
   public function AjouterSalle(Request $request)
{
    $current = $request->user();

    $validator = Validator::make($request->all(), [
        'nomSalle'      => 'required|string|max:255',
        'ville'         => 'required|string|max:255',
        'region'        => 'required|string|max:255',
        'pays'          => 'required|string|max:255',
        'description'   => 'nullable|string',
        'numRegistre'   => 'required|string|max:50',
        'numFiscale'    => 'required|string|max:50',
        'fileF'         => 'required|file|mimes:jpg,jpeg,png,pdf|',
        'fileRVerso'    => 'required|file|mimes:jpg,jpeg,png,pdf|',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Veuillez remplir correctement tous les champs',
            'errors'  => $validator->errors(),
        ], 422);
    }

    // Une seule salle par gérant
    if (Salle::where('gerant_id', $current->id)->exists()) {
        return response()->json([
            'message' => 'Vous avez déjà une salle'
        ], 409);
    }

    DB::beginTransaction();

    try {
        $salle = Salle::create([
            'nom_salle'         => $request->nomSalle,
            'numero_salle'      => $current->telephone,
            'ville'             => $request->ville,
            'region_salle'      => $request->region,
            'email_salle'       => $current->email,
            'pays_salle'        => $request->pays,
            'descriptions_salle'=> $request->description ?? 'Pas de description',
            'logo_salle'        => null,
            'adresse_salle'     => "{$request->ville} {$request->region} {$request->pays}",
            'gerant_id'         => $current->id,
            'active'            => false,
        ]);

        // Upload documents
        $rectoName = $salle->id.'_recto_'.uniqid().'.'.$request->file('fileF')->extension();
        $versoName = $salle->id.'_verso_'.uniqid().'.'.$request->file('fileRVerso')->extension();

        $rectoPath = $request->file('fileF')->storeAs('documents', $rectoName, 'minio');
        $versoPath = $request->file('fileRVerso')->storeAs('documents', $versoName, 'minio');

        if (!$rectoPath || !$versoPath) {
            throw new Exception('Échec de l’upload des documents');
        }

        $document = Document::create([
            'type'              => $request->type_document ?? 'cni',
            'numero_identite'   => $request->numRegistre.' '.$request->numFiscale,
            'recto'             => Storage::disk('minio')->url($rectoPath),
            'verso'             => Storage::disk('minio')->url($versoPath),
            'status'            => 'attente',
            'salle_id'          => $salle->id,
            'date_soumission'   => now(),
        ]);

        Mail::to(env('ADMIN'))
            ->queue(new DocumentValiation($current, $document));

        DB::commit();

        return response()->json([
            'message' => 'Salle créée avec succès. Vérification en attente.',
            'salle'   => $salle,
        ], 201);

    } catch (Exception $e) {
        DB::rollBack();

        Log::error('Erreur création salle', [
            'user_id' => $current->id,
            'error'   => $e->getMessage()
        ]);

        return response()->json([
            'message' => 'Erreur lors de la création de la salle'
        ], 500);
    }
}

public function updateSalle(Request $request){
    $user = $request->user();
    if(!$user->hasrole('Gerant')){
        return response()->json([
            'message'=> 'non autoriser'
        ]);
    }

    $valiator = Validator::make($request->all(),[
        'nom_salle'=>'nullable|string',
         'pays'=>'nullable|string', 
         'région'=>'nullable|string'
    ]);

    if($valiator->fails()){
        return response()->json([
            'message'=> 'entrez des donnees valides'
        ]);
    }
    DB::beginTransaction();

    try{
        $salle = $user->salle;

        $salle->update([
            'nom_salle'    => $request->nom_salle ?? $salle->nom_salle,
            'pays_salle'   => $request->pays ?? $salle->pays_salle,
            'region_salle' => $request->region ?? $salle->region_salle,
        ]);

        DB::commit();
        return response()->json([
            'message'=>'salle modifier avec succes'
        ],201);
    }
    catch (Exception $e) {
        DB::rollBack();

        return response()->json([
            'message'=> $e->getMessage(),
            'trace'=>$e->getTraceAsString()
        ]);

    }
}
}
