<?php

namespace App\Console\Commands;

use App\Mail\RappelMail;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class EmailRappel extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:email-rappel';

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
        // 


        $datef = Carbon::now()->addDays(3)->startOfDay();

        
        $users = User::whereHas('Role',fn($q)=>$q->where('name','Adherant'))->whereHas('abonnement', function ($q) use ($datef) {
            $q->whereDate('fin', '=', $datef);
        })
            ->with('abonnement')
            ->get();

        foreach ($users as $user) {
            Mail::to($user->email)->queue(new RappelMail($user));
        }

        $this->info("Emails envoyés à " . $users->count() . " utilisateur(s).");

    }
}
