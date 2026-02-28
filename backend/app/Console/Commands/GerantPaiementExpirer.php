<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Console\Command;

class GerantPaiementExpirer extends Command
{
    protected $signature = 'app:gerant-paiement-expirer';
    protected $description = 'Expire automatiquement les paiements des gérants';

    public function handle()
    {
        $count = 0;

        $users = User::whereHas('roles', fn($q) => $q->where('name', 'Gerant'))
            ->whereHas('DernierPaiement', function ($q) {
                $q->where('status', 'reussi')
                  ->whereDate('fin', '<', Carbon::now());
            })
            ->with('DernierPaiement')
            ->get();

        foreach ($users as $user) {
            $paiement = $user->DernierPaiement;

            if ($paiement) {
                $paiement->update([
                    'status' => 'expirer'
                ]);

                $count++;
            }
        }

        $this->info("Paiements expirés : $count gérant(s).");
    }
}