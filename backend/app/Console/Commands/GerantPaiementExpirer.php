<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class GerantPaiementExpirer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:gerant-paiement-expirer';

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


        $datef = Carbon::now()->addDays(7)->startOfDay();


        $users = User::whereHas('roles', fn($q) => $q->where('name', 'Gerant'))
            ->whereHas('DernierPaiement', function ($q) use ($datef) {
                $q->whereDate('fin', '<', Carbon::today());
            })
            ->get();

        foreach ($users as $user) {
            $paiem = $user->DernierPaiement;
            $paiem->update([
                'status' => 'attente'

            ]);

            // Mail::to($user->email)->queue(new RappelGerant($user));
            // mettre le status a expirer 
            // $user->update(['status','expirer']);
        }

        $this->info("Emails envoyés à " . $users->count() . " salle(s).");

    }
}
