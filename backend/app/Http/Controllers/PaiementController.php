<?php

namespace App\Http\Controllers;

use App\Models\paiement;
use App\Services\Otp;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;

class PaiementController extends Controller
{
    //
   public function simulation(Request $request)
{
    $current = $request->user();
    $otp = new Otp($current);

    $validator = Validator::make($request->all(), [
        "montant" => "required|numeric",
        "forfait" => "required|in:Pro,Standard,Premium",
        'fin' => "nullable|integer"
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Veuillez remplir correctement les champs'
        ], 400);
    }

    try {
        $fin = $request->fin ?? 1;

        // Vérifier s’il a déjà un abonnement actif
        $hasAbonnement = $current->paiements()
            ->where('fin', '>=', Carbon::now())
            ->exists();

        if ($hasAbonnement) {
            return response()->json([
                'message' => 'Vous avez déjà un abonnement en cours'
            ], 400);
        }

        // Créer le paiement
        $transID = Str::random(4) . Carbon::now()->format('Ymd') . '@' . rand(111, 999);
        $paiement = paiement::create([
            'debut' => Carbon::now(),
            'fin' => Carbon::now()->addMonths($fin),
            'montant' => $request->montant,
            'plan' => $request->forfait, // utiliser la valeur reçue
            'gerant_id' => $current->id,
            'transId' => $transID,
            'moyen paiment' => 'OM',
            'status' => 'reussi',
        ]);

        // Générer mot de passe temporaire
        // $mdp = Str::random(10);
        // $current->update([
        //     'password' => bcrypt($mdp),
        //     'otp' => null
        // ]);

        // Envoyer les informations de connexion
        // $otp->sendLoginInformation($mdp, $paiement);

        return response()->json([
            'message' => 'Paiement réussi',
            'paiement' => $paiement,
            // 'mdp_temporaire' => $mdp
        ], 201);

    } catch (\Throwable $th) {
        return response()->json([
            'message' => 'Paiement échoué',
            'source' => $th->getMessage(),
            'fichier'=> $th->getFile(),
            'ligne'=>$th->getLine(),
        ], 500);
    }
}

    
}
