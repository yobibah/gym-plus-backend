<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use App\Services\Otp;
use App\Models\paiement;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;


use App\Services\YengaPayService;
use App\Services\SenfenicoService;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;


class YengaPayController extends Controller
{
    public function __construct(public SenfenicoService $senfenico)
    {
    }

    public function RetournerPaiement(string $ref){
        return paiement::where('transID',$ref)->first();
    }


    public function payer(Request $request)
    {
        $current = $request->user();
        $otp = new Otp($current);

        $validator = Validator::make($request->all(), [
            "montant" => "required|numeric",
            "forfait" => "required|in:pro,standard,premium",
            'fin' => "nullable|integer"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'une erreur est survenue'
            ], 400);
        }

        try {
            $fin = $request->fin ?? 1;

            switch ($request->forfait) {

            }
            $hasAbonnement = $current->paiements()
                ->where('fin', '>=', Carbon::now())
                ->exists();

            if ($hasAbonnement) {
                return response()->json([
                    'message' => 'Vous avez déjà un abonnement en cours'
                ], 400);
            }

            $paiement = paiement::create([
            'debut' => Carbon::now(),
            'fin' => Carbon::today()->addMonths((int)$fin),
            'montant' => $request->montant,
            'plan' => strtolower($request->forfait), 
            'gerant_id' => $current->id,
            'status' => 'attente',
        ]);
            $response = $this->senfenico->initialize([
                'email' => $current->email,
                'amount' => (float) $request->montant,
                'success_url' => route('paiement.success'),
                'cancel_url' => route('paiement.cancel'),

            ]);

            $reference = $response->data->reference;
      
            $paiement->update([
                    'transId' => $reference,
                    'moyen paiment' => 'OM',
            ]);



            // URL de paiement Senfenico
            $reference = $response->data->reference;
            return response()->json($response->data->authorization_url);

        } catch (Exception $e) {

        }

    }

    public function success(Request $request)
    {
        $reference = $request->query('reference');

        if (!$reference) {
            return response()->json([
                'message' => 'Référence manquante'
            ], 400);
        }
        $checkout = $this->senfenico->fetch($reference);


        if ($checkout->data->status === 'success') {

           $paiement = $this->RetournerPaiement($reference);
           $paiement->update([
            'moyen paiment' => $checkout->data->provider,
           ]);
           
           // Générer mot de passe temporaire
        $mdp = Str::random(10);

        $current = User::where('email',$checkout->data->email)
        ->whereHas('roles',fn($q)=>$q->where('name','Gerant'))
        ->first();
        $current->update([
            'password' => bcrypt($mdp),
            'otp' => null
        ]);
   
          $otp = new Otp($current);
        // Envoyer les informations de connexion
        $otp->sendLoginInformation($mdp);
    }
        return response()->json([
            'message' => 'Paiement réussi',
            'paiement' => $paiement,
            // 'mdp_temporaire' => $mdp
        ], 201);

        

    }

    public function cancel(Request $request)
    {
       $reference = $request->query('reference');

        if (!$reference) {
            return response()->json([
                'message' => 'Référence manquante'
            ], 400);
        }
        $checkout = $this->senfenico->fetch($reference);


        if ($checkout->data->status === 'failed') {

           $paiement = $this->RetournerPaiement($reference);
           $paiement->update([
            'moyen paiment' => $checkout->data->provider,
           ]);
           
           // Générer mot de passe temporaire
            return response()->json([
            'message' => 'Paiement echouer',
            'paiement' => $paiement,
            // 'mdp_temporaire' => $mdp
        ], 500);


 
    }
        
       
    }

    public function handle(Request $request)
    {
        Log::info('Webhook Senfenico', $request->all());

        if ($request->event === 'payment.success') {
            $reference = $request->data['reference'];

            // Paiement confirmé
             $this->RetournerPaiement($reference)->update(['status' => 'reussi']);
        }

        return response()->json(['status' => true]);
    }
}
