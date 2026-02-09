<?php


/// ici je vais declarer les routes pour gerer les taches a faire dans mon code
// Artisan::command('inspire', function () {
//     $this->comment(Inspiring::quote());
// })->purpose('Display an inspiring quote');
use Illuminate\Support\Facades\Schedule;

Schedule::command('app:adherant-expirer')
    ->daily()
    ->withoutOverlapping()
    ->runInBackground();

// Schedule::command('email-rappel')->daily();

Schedule::command('app:paiement-expire')
    ->daily()
    ->withoutOverlapping()
    ->runInBackground();

Schedule::command('active-gerant-paiement')
    ->daily()
    ->withoutOverlapping()
    ->runInBackground();