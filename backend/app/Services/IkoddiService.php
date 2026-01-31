<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class IkoddiService
{
    public  string $api;
    public $OID;
    public function __construct()
    {
         $this->OID = config('ikkodi.organisationID');
        $this-> api = config('ikkodi.api');
    }

    public function url()
    {
        return "https://api.ikoddi.com/api/v1/groups/{$this->OID}/sms";
    }


    public function InitSms(array $data)
    {

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'x-api-key' => $this->api,
        ])->post($this->url(), [
                    "sentTo" => $data['numero'],
                    "message" => $data['message'],
                    "from" => $data['provenence'],
                    "smsBroadCast" => "com 1",
                    "countryStringCode" => $data['code_pays'] ?? "BF",
                    "countryNumberCode" => $data['code_numero'] ?? "226",
                    "messageType" => "sms",
                ]);
        return response()->json([$response]);
    }



}