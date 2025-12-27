<?php

namespace App\Console\Commands;

use App\Models\salle;
use App\Models\User;
use AWS\CRT\HTTP\Request;
use App\Jobs\Ahderant7jours;
use App\Mail\Ahderant75jours;
use Illuminate\Support\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class AdherantExpirer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:adherant-expirer';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // recuperer tous les gerant 
        // verifier si chaque gerant a un paiement en cours si 
        //non  - on ne notifie pas ses adherants
        //oui - je regarde son forfais si 
        // standard je limit seulema 50 utilisateurs 
        //pro a 200 
        // je cree une table deja notifier pour ce moi et je les notifiers dans cette table  et je verifie voir si t'es pas encore notifier  
        // comme ca j'evite les redondances et les mails ennuiyeuses
        $gerant = User::whereHas('roles', fn($q) => $q->where('name', 'Gerant'))->get();
        // $this->info('les rrrrrrrrr '. count($gerant));
        // charger les gerant ayant un paiement actif

        $gerant_paiement = [];
        foreach ($gerant as $ger) {
            if ($ger->dernierPaiementReussi) {
                $gerant_paiement[] = $ger;
            }
        }
        // charger les adherant de chaque gerant 
        $adh = collect();

        foreach ($gerant_paiement as $ger) {
            $salle = $ger->salle;
            if ($salle) {
                $adh = $adh->merge($salle->adherents()->get());
            }
        }

        // adherent ayant la date s'expire dans une semaine (7) jours

        $adhbeientot = collect();



        foreach ($gerant_paiement as $ger) {
            $salle = $ger->salle;
            if ($salle) {
                // récupérer les adhérents bientôt expirés
                $adhs = $salle->bientotExpirer()->get();

                // ajouter salle_id à chaque adhérent
                $adhs->transform(function ($adh) use ($salle) {
                    $adh->salle_id = $salle->id;
                    return $adh;
                });

                // fusionner dans la collection finale
                $adhbeientot = $adhbeientot->merge($adhs);
            }
        }



        foreach ($adhbeientot as $adherant) {
            $salle = salle::find($adherant->salle_id);
            Mail::to($adherant->email)->queue(new Ahderant75jours($adherant, $salle));
        }

        // Informations pour le debug
        $this->info('les gerants ' . count($gerant_paiement));
        $this->info('les adherants ' . count($adh));
        $this->info('les adherants expirant dans 7 jours ' . count($adhbeientot));

    }
}
