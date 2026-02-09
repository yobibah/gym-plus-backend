<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class YengaPayService
{
    public function createPayment(array $data)
    {
        $url = config('yenga.base_url')
            . '/api/v1/groups/'
            . config('yenga.org_id')
            . '/payment-intent/'
            . config('yenga.project_id');

        return Http::withHeaders([
            'Authorization' => 'Bearer ' . config('yenga.api_key'),
            'Accept'        => 'application/json',
            'Content-Type'  => 'application/json',
        ])->post($url, [
            'paymentAmount' => (float) $data['amount'],  
            'currency'      => 'XOF',
            'reference'     => $data['reference'],      
            'customerNumber'=> $data['phone'],          
            'callbackUrl'   => $data['callback_url'],    
            'returnUrl'     => $data['return_url'],      
            'description'   => $data['description'] ?? 'Abonnement au service de Gymplus',
        ]);
    }
}
