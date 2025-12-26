<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

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
        $date = Carbon::now(); 
        $adh = User::whereHas('roles', fn($q)=>$q->where('mame','Adherant'))
        ->whereDate('fin','=', $date)
        ->where('status', 1)
        ->get();

        try{
            foreach($adh as $ad){
                $ad->status = 0;
                $ad->save();

                /// prevoir ici appeler la methode qui va mail tous les utilisateurs concerner que la date d'expireation de l'abonnement a ete atteinte
            }
            $this->info(count($adh) .' abonnement expire(s) '. $date .' ');
            
        }   
        catch(\Exception $e){
            $this->error($e->getMessage());
        }
    }
}
