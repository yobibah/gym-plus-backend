<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Container\Attributes\Log;
use Mail;

class ActiveGerantPaiement extends Command
{
    protected $signature = 'app:active-gerant-paiement';
    protected $description = 'Active les abonnements expirés et enchaîne les nouveaux';

    public function handle()
    {

        $users = User::whereHas('roles', fn($q) => $q->where('name', 'Gerant'))
            ->with(['DernierPaiementAttente', 'DernierPaiementReussi'])->get();


        foreach ($users as $user) {

            $attente = $user->DernierPaiementAttente;
            $reussi = $user->DernierPaiementReussi;
            if ($attente && $reussi) {
                // dois etre renommer dabord
                if ($attente->moyen_paiment && $attente->moyen_paiment != 'N/A') {


                    // mettre a jour les donnees 
                    $fin = $reussi->fin;

                    if (Carbon::parse($fin)->isPast()) {
                        // retrouver les memes utilisateurs pour modifier leurs donnees
                        if ($reussi->gerant_id == $attente->gerant_id) {
                            $attente->update([
                                'status' => 'reussi',
                                'debut' => Carbon::today(),
                                'fin' => Carbon::today()->addMonths(1)
                            ]);
                            $attente->save();
                            $reussi->status = 'expirer';
                            $reussi->save();
                            $this->info('votre abonnement a ete reactiver ');
                        }
                        /// laisser un mail au gerant pour lui faire part que son abonnement a ete ajuster en raison de son reabonmment
                        else {

                            $this->info('condition non remplis pour');
                        }
                    }
                }
                else{
                     $this->info('paiements suspect');
                }
            }
        }
    }
}
