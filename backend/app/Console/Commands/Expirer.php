<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Console\Command;

class Expirer extends Command
{
    protected $signature = 'app:expirer';

    protected $description = 'Expire les abonnements arrivés à terme';

    public function handle()
    {
        // récupérer les adhérents avec abonnement
        $adherants = User::whereHas('roles', fn ($q) => $q->where('name', 'Adherant'))
            ->whereHas('abonnements')
            ->with('abonnements')
            ->get();

        $count = 0;

        foreach ($adherants as $user) {
            foreach ($user->abonnements as $abonnement) {
                // apres je vais modifier pour mettre isyesterday
                if (Carbon::parse($abonnement->fin)->isPast()) {
                    $abonnement->update([
                        'actif'=>0
                    ]);
                 
                    $count++;
                }
            }
        }

        $this->info("Abonnements expirés aujourd'hui : {$count}");
    }
}
