<?php

namespace App\Mail;

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

    public function __construct(string $username, string $password)
    {
        $this->username = $username;
        $this->password = $password;
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
            ]
        );
    }
}
