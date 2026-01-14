<?php 

namespace Backend\App\Services;

use Illuminate\Support\Facades\Http;

class MoneyfusionService {

    public function __construct(){}

    public function InitPayment(array $data){
        
         return Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post(config('moneyfusion.api_url'), [
            'totalPrice'    => $data['amount'],
            'article'       => $data['article'],
            'personal_Info' => $data['personsal_info'],
            'numeroSend'    => $data['phone'],
            'nomclient'     => $data['name'],
            'return_url'    => config('moneyfusion.return_url'),
            'webhook_url'   => config('moneyfusion.webhook'),
        ])->json();
    }

        public function checkStatus(string $token)
    {
        return Http::get(
            config('moneyfusion.check_url') . '/' . $token
        )->json();
    }


}