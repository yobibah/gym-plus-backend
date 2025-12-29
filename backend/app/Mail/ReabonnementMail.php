<?php

namespace App\Mail;

use App\Models\salle;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReabonnementMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public User $user,public salle $salle)
    {
        //
    }

    /**
     * Get the message envelope.
     */
   public function build(){
    return $this->subject('Mail de confirmation de Reabonnement')
    ->with([
            'username'=>$this->user->name,
        'prenom'=>$this->user->prenom,
        'nom_salle'=>$this->salle->nom_salle,
        'region_salle'=>$this->salle->region_salle,
         'contact'=>$this->salle->numero_salle,
    ])
    ->view('emails.reabonnement');
   }
}
