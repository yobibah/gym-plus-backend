<?php

namespace App\Services;

use App\Models\activites;
use App\Models\salle;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class Activity
{


    public function __construct(public Activity $activity, public User $gerant)
    {
    }
    protected function CreateActiviter()
    {
        // on va creer une activity et notifier les adherants de la salle de l'activity creer
        // utiliser les evenements et listeners ( si l'evenement est creer on notifi les adherant concerne)
        // Mail::to($this->activity->user->email)->send(new Activiter($this->activity, $this->gerant, $this->salle));

        try {
            $adherant = $this->gerant->salle->adherents;

            if ($this->activity->status == 'publie')
                foreach ($adherant as $adh) {
                    // envoyer a chaque adherant de cette salle en pricision
                    if (Mail::to($adh->email)->queue(new Activiter($adh, $this->activity)))
                        return response()->json([
                            'message' => 'mail envoyer a ' . $adh->email . ' avec succes'
                        ]);
                }

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'une erreur seest survenue lors de l\'envoi du mail  a ' . $adh->email
            ]);
        }





    }

    protected function UpdateActiviter()
    {
        // modifier une activite deja programmer

    }

    public function DeleteActiviter()
    {
        //annuller une activity

     

    }




}