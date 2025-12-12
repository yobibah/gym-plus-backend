<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class Otp extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);

        $user=[
            'email'=>'yobibah7295@gmail'
        ];
        $otp = new \App\Services\Otp($user);
    }
}
