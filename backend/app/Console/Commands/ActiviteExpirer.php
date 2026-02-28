<?php

namespace App\Console\Commands;

use App\Http\Resources\ActiviteRessource;
use App\Models\activites;
use Illuminate\Console\Command;

class ActiviteExpirer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     * 
     */
     public int $count = 0;
    protected $signature = 'app:activite-expirer';

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
        $activitee = activites::all();
        $act = ActiviteRessource::collection($activitee);
      

        foreach($act as $ac){
            if ($ac && $ac->ispast){
                $ac->update([
                    'status'=>'expirer'
                ]);
                $this->count++;
            }
        }


    }
}
