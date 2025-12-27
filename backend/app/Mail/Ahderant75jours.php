<?php

namespace App\Mail;

use App\Models\salle;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Contracts\Queue\ShouldQueue;

class Ahderant75jours extends Mailable implements ShouldQueue
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
    return $this->subject("Abonnement bientot expirer")->with(['user',$this->user,'salle'=>$this->salle])->view('emails.Expiredays');
   }
}
