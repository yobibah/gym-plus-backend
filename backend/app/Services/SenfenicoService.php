<?php

namespace App\Services;

use Senfenico\Checkout;

class SenfenicoService
{
    protected Checkout $checkout;

    public function __construct()
    {
        $this->checkout = new Checkout(config('services.senfenico.key'));
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
}
