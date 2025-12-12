<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RappelMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $user;
        public function __construct(User $user)
    {
        $this->user= $user;
    }

    /**
     * Get the message envelope.
     */
    public function build (){
        return $this->subject('Rappel d\'Abonnement de la salle de sport '.$this->user->salle->nom)
        ->with(['users'=>$this->user])
        ->view('emails.RappelMail');
    }
}
