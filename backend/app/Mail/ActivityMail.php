<?php

namespace App\Mail;

use App\Models\activites;
use App\Models\salle;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class ActivityMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public salle $salle ,public activites $activite)
    {
        //
    }

public function build()
{
    $mail = $this->subject("Nouvelle activité : " . $this->activite->nom_activite)
                ->with([
                    'salle' => $this->salle,
                    'activite' => $this->activite
                ])
                ->view('emails.activity-email');

    // if (!empty($this->activite->images_activte) &&
    //     Storage::disk('public')->exists('documents/' . $this->activite->images_activte)) {

    //     $mail->attach(
    //         storage_path('app/public/documents/' . $this->activite->images_activte)
    //     );
    // }

    return $mail;
}

}
