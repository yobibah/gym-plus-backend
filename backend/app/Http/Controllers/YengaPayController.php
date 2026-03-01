<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Services\Otp;
use App\Models\paiement;
use Illuminate\Cache\Events\CacheHit;
use Illuminate\Support\Facades\Cache;
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
    public array $forfait = [
        15000 => 'standard',
        25000 => 'pro',
        40000 => 'premimum'
    ];
    public function __construct(public SenfenicoService $senfenico) {}

    public function RetournerPaiement(string $ref)
    {
        return paiement::where('transID', $ref)->first();
    }


    // public function payer(Request $request)
    // {
    //     $current = $request->user();
    //     $otp = new Otp($current);

    //     $validator = Validator::make($request->all(), [
    //         "montant" => "required|numeric",
    //         "forfait" => "required|in:pro,standard,premium",
    //         'fin' => "nullable|integer"
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'message' => 'une erreur est survenue'
    //         ], 400);
    //     }

    //     try {
    //         $fin = $request->fin ?? 1;

    //         switch ($request->forfait) {

    //         }
    //         $hasAbonnement = $current->paiements()
    //             ->where('fin', '>=', Carbon::now())
    //             ->exists();

    //         if ($hasAbonnement) {
    //             return response()->json([
    //                 'message' => 'Vous avez déjà un abonnement en cours'
    //             ], 400);
    //         }

    //         $paiement = paiement::create([
    //             'debut' => Carbon::now(),
    //             'fin' => Carbon::today()->addMonths((int) $fin),
    //             'montant' => $request->montant,
    //             'plan' => strtolower($request->forfait),
    //             'gerant_id' => $current->id,
    //             'status' => 'attente',
    //             'moyen paiment' => 'OM',
    //             'transId' => Str::random(4) . Carbon::now()->format('Ymd') . '@' . rand(111, 999)
    //         ]);
    //         $response = $this->senfenico->initialize([
    //             'email' => $current->email,
    //             'amount' => (float) $request->montant,
    //             'success_url' => route('paiement.success'),
    //             'cancel_url' => route('paiement.cancel'),

    //         ]);

    //         $reference = $response->data->reference;

    //         $paiement->update(attributes: [
    //             'transId' => $reference,
    //             'moyen paiment' => 'OM',
    //         ]);



    //         // URL de paiement Senfenico
    //         $reference = $response->data->reference;
    //         return response()->json($response->data->authorization_url);

    //     } catch (Exception $e) {
    //         return response()->json([
    //             'message' => 'une erreur est survenue',
    //             'error' => $e->getMessage()
    //         ]);

    //     }

    // }

    // public function success(Request $request)
    // {
    //     $reference = $request->query('reference');

    //     if (!$reference) {
    //         return response()->json([
    //             'message' => 'Référence manquante'
    //         ], 400);
    //     }
    //     $checkout = $this->senfenico->fetch($reference);


    //     if ($checkout->data->status === 'success') {

    //         $paiement = $this->RetournerPaiement($reference);
    //         $paiement->update([
    //             'moyen paiment' => $checkout->data->provider,
    //             'status' => 'reussi'
    //         ]);

    //         // Générer mot de passe temporaire
    //         $mdp = Str::random(10);

    //         $current = User::where('email', $checkout->data->email)
    //             ->whereHas('roles', fn($q) => $q->where('name', 'Gerant'))
    //             ->first();
    //         $current->update([
    //             'password' => bcrypt($mdp),
    //             'otp' => null
    //         ]);

    //         $otp = new Otp($current);
    //         // Envoyer les informations de connexion
    //         $otp->sendLoginInformation($mdp);
    //     }
    //     return response()->json([
    //         'message' => 'Paiement réussi',
    //         'paiement' => $paiement,
    //         // 'mdp_temporaire' => $mdp
    //     ], 201);



    // }

    // public function cancel(Request $request)
    // {
    //     $reference = $request->query('reference');

    //     if (!$reference) {
    //         return response()->json([
    //             'message' => 'Référence manquante'
    //         ], 400);
    //     }
    //     $checkout = $this->senfenico->fetch($reference);


    //     if ($checkout->data->status === 'failed') {

    //         $paiement = $this->RetournerPaiement($reference);
    //         $paiement->update([
    //             'moyen paiment' => $checkout->data->provider,
    //         ]);

    //         // Générer mot de passe temporaire
    //         return response()->json([
    //             'message' => 'Paiement echouer',
    //             'paiement' => $paiement,
    //             // 'mdp_temporaire' => $mdp
    //         ], 500);



    //     }


    // }


    /// ces methodes sont reserver pour faire le sans redirection

    public function charge(Request $request)
    {
        $current = $request->user();

        $validator = Validator::make($request->all(), [
            "montant" => "required|numeric",
            'numero' => "required|string|min:8",
            'forfait' => 'required|string',
            'provider' => 'required|string|in:orange_bf,moov_bf,sank_bf,coris_bf',
            'type' => 'required|string|in:reinscription,inscription'
        ]);

        // $forfait = $request->query('forfait');
        // verifier le forfait

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 400);
        }

        try {
            $fin = $request->fin ?? 1;

            switch ($this->forfait) {
            }
            $hasAbonnement = $current->paiements()
                ->whereBetween('fin', [Carbon::now(), Carbon::now()->addDays(7)])
                ->where('status', 'reussi')
                ->exists();

            // $hasAbonnement = $current->paiements()
            //     ->whereBetween('fin', [Carbon::now(), Carbon::now()->addDays(7)])
            //     ->where('status', 'reussi')
            //     ->exists();

            $paiementAttente = $current->paiements()->where('status', 'attente')->latest('fin')
                ->exists();
            if ($paiementAttente) {
                return response()->json([
                    'message' => 'Vous avez un abonnement en cours',
                    'info' => 'Si vous souhaitez renouveler, veuillez attendre la fin de votre abonnement actuel.'
                ], 403);
            }

            // if (!$hasAbonnement) {
            //     return response()->json([
            //         'message' => 'abonnement en cours ou une erreur est survenue'
            //     ], 409);
            // }

            $paiement = paiement::create([
                'debut' => Carbon::now(),
                'fin' => Carbon::today()->addMonths((int) $fin),
                'montant' => $request->montant,
                'plan' => strtolower($request->forfait),
                'gerant_id' => $current->id,
                'status' => 'attente',
                'moyen paiment' => 'N/A',
                'transId' => Str::random(4) . Carbon::now()->format('Ymd') . '@' . rand(111, 999)
            ]);

            $data = [
                "montant" => $request->montant,
                'numero' => $request->numero,
                'provider' => $request->provider
            ];

            $response = $this->senfenico->charge($data);

            if ($response && $response->status == true) {
                $ref = $response->data->reference;
                $message = $response->data->display_text;
                // maj
                $paiement->update([
                    'transId' => $ref,
                ]);


                Cache::put('reference_' . $current->id, $ref, now()->addMinutes(15));
                cache::put('type_' . $current->id, $request->type, now()->addMinutes(15));

                return response()->json([
                    'message' => $message,
                    'reference' => $ref
                ]);
            } else {
                return response()->json([
                    'message' => ' erreur lier au paiement ou verifier l\'operateur choisi'
                ], 409);
            }
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getTraceAsString(),

            ]);
        }
    }

    public function AnnulerPaiement() {}

    public function chargeOtp(Request $request)
    {
        $current = $request->user();
        $validator = Validator::make($request->all(), [
            'otp' => 'required|digits:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => ' le code otp doit comporter six chiffres'
            ]);
        }
        try {

            $data = [
                'reference' => Cache::get('reference_' . $current->id),
                'otp' => $request->otp
            ];

            $response = $this->senfenico->Otp($data);
            $paiement = Paiement::where('gerant_id', $current->id)
                ->where('transId', Cache::get('reference_' . $current->id))
                ->first();
            // return $response->data;

            if ($response && $response->status == true) {

                $data = $response->data;
                $msg = $response->message;




                if (!$paiement) {
                    return response()->json([
                        'message' => 'Aucun paiement trouvé pour cette référence'
                    ], 404);
                }


                $paiement->update([
                    'status' => 'reussi',
                    'moyen paiment' => $data->provider
                ]);

                // verfier s'il a eu abonnement actif auparavant 
                // si oui lui notifier par mail et par sms que le paiement est acccepter
                // sinon lui envoyer ses identifiant de connexion

                $type = Cache::get('type_' . $current->id);

                if ($type === 'inscription') {

                    $mdp = Str::random(10);

                    $current->update([
                        'password' => bcrypt($mdp),
                        'otp' => null
                    ]);

                    try {
                        $send = new Otp($current);
                        $send->sendLoginInformation($mdp);
                    } catch (\Throwable $e) {
                        Log::error('Erreur envoi identifiants', [
                            'user_id' => $current->id,
                            'error' => $e->getMessage()
                        ]);
                    }
                }


                return response()->json(['message' => 'paiement reussi merci de profiter de nos services'], 200);
            } else {
                $paiement->update([
                    'status' => 'echoue',

                ]);
                return response()->json([
                    'message' => $response->message ?? 'le paiement a echouer pour une raison independant de notre volonte',
                    Cache::get('reference_' . $current->id)

                ], 500);
            }
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getTrace()
            ], 500);
        }
    }


    public function handle(Request $request)
    {
        Log::info('Webhook Senfenico', $request->all());



        $payload = $request->getContent();
        $webhook_hash = $request->header('X-Webhook-Hash');
        $webhook_key = config('services.webhooks');

        try {
            $webhook = \Senfenico\Webhook::constructEvent($payload, $webhook_hash, $webhook_key);
        } catch (Exception $e) {
            Log::debug('Message: ' . $e->getMessage());
            return response()->json(['message' => 'une erreur sest produite'], 400);
        }


        // Handle the event
        switch ($webhook->event) {
            case 'checkout.pending':
                $this->RetournerPaiement($webhook->data->reference)->update(['status' => 'attente']);
                break;
            case 'checkout.success':
                $this->RetournerPaiement($webhook->data->reference)->update(['status' => 'reussi']);

                break;

            default:
                Log::debug('Received unknown event type ' . $webhook->event);
                $this->RetournerPaiement($webhook->data->reference)->update(['status' => 'echoue']);
        }

        return response()->json(['message' => 'Webhook reccus'], 200);
    }



    public function Reglement(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'montant' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'remplir correctement les champs'
            ], 400);
        }

        try {
            $response = $this->senfenico->Decharger((int) $request->montant);

            if ($response->status == true) {

                // je creer une table avec le user_id , la date de 

                // Reglement::create([
                //     'admin_id'=>$user->id,
                //      'date'=> Carbon::now(),
                //      'status'=>$response->data->status,
                //      'reference'=>$response->data->reference,
                //      'montant'=>$response->montant
                // ]);

                return response()->json([
                    'message' => $response->data->message,
                    'status' => $response->data->status == 'processing' ? ' en cours ' : 'erreur'

                ], 201);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }
    }


    public function Annuler(Request $request)
    {
        $user = $request->user();

        $validator = validator::make($request->all(), [
            'reference' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'token dois etre en string'
            ]);
        }

        try {
            $response = $this->senfenico->AnnulerRegelement($request->reference);
            if ($response->status != true) {
                return response()->json([
                    'message' => 'une erreur est survenue'
                ]);
            }
        } catch (Exception $e) {
        }
    }
}
