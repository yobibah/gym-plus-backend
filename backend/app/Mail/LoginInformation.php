<?php

namespace App\Mail;

use App\Models\paiement;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Content;

class LoginInformation extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public string $username;
    public string $password;

    public $paiement;

    public function __construct(string $username, string $password, ?paiement $paiement = null)
    {
        $this->username = $username;
        $this->password = $password;
        $this->paiement = $paiement;
    }

    /**
     * Define the envelope (subject, sender…)
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Information de connexion'
        );
    }

    /**
     * Define the view + data
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.LoginInformation',
            with: [
                'username' => $this->username,
                'mdp'      => $this->password,
                'paiement'=>$this->paiement
            ]
        );
    }
}
