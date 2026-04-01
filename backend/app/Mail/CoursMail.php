<?php

namespace App\Mail;

use App\Models\cours;
use App\Models\salle;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CoursMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public salle $salle, public cours $cours)
    {
        //
    }

    public function build(){
        $mail = $this->subject('Nouveau cours programme')
        ->with([
            'salle'=>$this->salle,
            'cours'=>$this->cours
        ])->view('emails.cours');

        return $mail;

    }
}
