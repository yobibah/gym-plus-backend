<?php

namespace App\Mail;

use App\Models\document;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DocumentValiation extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */

   public  $gerant ;
   public $documment;
    public function __construct(User $gerant, document $documment)
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Document Valiation',
        );
    }


    public function build(){
        $salle = $this->documment->salle;
        return $this->subject('Validation des docuement d\'un nouveau client')->with([
            'document'=>$this->documment,
            'gerant'=>$this->gerant,
            'salle'=>$salle
        ])->view('emails.DocumentValidation');
    }
    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'view.name',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
