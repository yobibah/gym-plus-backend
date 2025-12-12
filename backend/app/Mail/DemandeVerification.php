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

class DemandeVerification extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $gerant;
    public $document;
    public function __construct(User $gerant,document $document)
    {
                $this->gerant = $gerant;
                $this->document = $document;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Demande Verification',
        );
    }


    public function build(){
        return $this->subject('Reponse de la demande de validation')->with([
            'gerant'=> $this->gerant,
            'document'=> $this->document
        ])->view('emails.Resultatdocument');
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
