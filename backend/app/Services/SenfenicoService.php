<?php

namespace App\Services;

use Exception;
use Psy\TabCompletion\Matcher\FunctionsMatcher;
use Senfenico\Checkout;
use Senfenico\Senfenico;
use function PHPUnit\Framework\returnArgument;

class SenfenicoService
{
    protected Checkout $checkout;
    protected Senfenico $senfenico;

    public function __construct()
    {
        $this->checkout = new Checkout(config('services.senfenico.key'));
        $this->senfenico = new Senfenico(config('services.senfenico.key'));
    }


    public function initialize(array $data)
    {
        return $this->checkout->initialize([
            'email' => $data['email'] ?? 'client@test.com',
            'amount' => $data['amount'],
            'success_url' => $data['success_url'],
            'cancel_url' => $data['cancel_url'],
        ]);
    }

    public function fetch(string $reference)
    {
        return $this->checkout->fetch($reference);
    }


    protected function DeterminerNumero(string $numero)
    {
        $db = [
            'moov_bf' => [
                '01',
                '02',
                '03',
                '41',
                '42',
                '43',
                '51',
                '52',
                '53',
                '61',
                '62',
                '63',
                '40',
                '50',
                '60',
                '70',
                '71',
                '72',
                '73'
            ],
            'orange_bf' => [
                '04',
                '05',
                '06',
                '07',
                '54',
                '55',
                '56',
                '57',
                '64',
                '65',
                '66',
                '67',
                '74',
                '75',
                '76',
                '77'
            ],
        ];


        $dp = substr($numero, 0, 2);


        $reseau = null;
        foreach ($db as $key => $prefixes) {
            if (in_array($dp, $prefixes)) {
                $reseau = $key;
                break;
            }

        }


        return $reseau ?: $reseau = 'sank_bf';
    }




    public function Transferer(array $data)
    {
        //  [orange_bf, moov_bf, sank_bf]
        try {

            $response = $this->senfenico->transfer->create([
                'amount' => $data['amount'],
                'recipient_phone' => $data['phone'],
                'recipient_wallet' => $this->DeterminerNumero($data['phone']),
                'ext_id' => '98b96ea4-210d-4ea0-9b03-8d7fd96e4064'
            ]);

            //  $status = collect($response->json()['status'] ?? [])->pluck('status')->values();


            return $response;

            // if (is_object($responseData)) {
            //     $responseData = json_decode(json_encode($responseData), true);
            // }
            // if (!empty($responseData['status']) && $responseData['status'] === true) {
            //     return response()->json([
            //         'response' => $responseData,
            //         'message' => 'Transfert réussi'
            //     ],200);
            // } else {
            //     return response()->json([
            //         'response' => $response,
            //         'message' => 'Transfert échoué'
            //     ], 400);
            // }

        } catch (Exception $e) {
            return response()->json([
                'erreur' => $e->getMessage()
            ], 500);
        }


    }

    public function charge(array $data)
    {
        return $this->senfenico->charge->create([
            'amount' => (float) $data['montant'],
            'phone' => (string) $data['numero'],
            'provider' => (string) $data['provider']
        ]);
    }

    public function Otp(array $data)
    {

        return $this->senfenico->charge->submitOtp([
            'otp' => $data['otp'],
            'charge_reference' => $data['reference'],
        ]);
    }

    public function Decharger($montant)
    {
        return $this->senfenico->settlement->create([
            'amount' => $montant
        ]);
    }

    public function AnnulerRegelement(string $ref){
        return $this->senfenico->settlement->cancel($ref);
    }

   public function PayementDirect (){
    
   }
}
