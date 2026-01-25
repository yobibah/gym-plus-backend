<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\User;
use App\Mail\RappelGerant;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class PaiementExpire extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:paiement-expire';

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

        
        $users = User::whereHas('roles',fn($q)=>$q->where('name','Gerant'))
        ->whereHas('DernierPaiement', function ($q) use ($datef) {
            $q->whereBetween('fin', [
                now()->startOfDay(),          
                now()->addDays(7)->endOfDay() 
            ]);
        })
         
            ->get();

        foreach ($users as $user) {
           
            Mail::to($user->email)->queue(new RappelGerant($user));
            // mettre le status a expirer 
            // $user->update(['status','expirer']);
        }

        $this->info("Emails envoyés à " . $users->count() . " salle(s).");
        
    }
}
