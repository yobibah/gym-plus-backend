<?php

namespace App\Services;

use Twilio\Rest\Client;


class TwilioService
{
    public function __construct(public  Otp $otp){}

    public function sendSms(string $numero)
    {
        $otp = $this->otp::generete();

        $twilio = new Client(
            config('services.twilio.sid'),
            config('services.twilio.token')
        );

        $twilio->messages->create(
            $numero,
            [
                'from' => config('services.twilio.from'),
                'body' => "Bonjour, votre code de vérification est : $otp"
            ]
        );

        return $otp;
    }
}
