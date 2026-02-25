<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MdpModifier extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public readonly User $user)
    {
        //
    }


    public function build()
{
    $mail = $this->subject("Mot de passe change ")
                ->with([
                    'user' => $this->user,
                ])
                ->view('emails.mdp-change-email');

    // if (!empty($this->activite->images_activte) &&
    //     Storage::disk('public')->exists('documents/' . $this->activite->images_activte)) {

    //     $mail->attach(
    //         storage_path('app/public/documents/' . $this->activite->images_activte)
    //     );
    // }

    return $mail;
}
}
