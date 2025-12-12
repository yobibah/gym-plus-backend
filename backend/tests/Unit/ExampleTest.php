<?php

namespace Tests\Unit;

use App\Http\Controllers\AuthController;
use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_that_true_is_true(): void
    {
        //    $user=[
        //     'email'=>'yobibah7295@gmail'
        // ];
        // $otp = new \App\Services\Otp($user);

        // dd($otp::generete());
        // dd($otp->sendOTp());
        // dd($otp->verifierOtp(123456));

        $email ='ckprod7295@gmail.com';
        $senlink = new AuthController();
        $senlink->ReinitialiserCompte($email);
    }
}
