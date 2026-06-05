<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class CustomResetPassword extends ResetPassword 
{
    /**
     * Build the mail representation of the notification.
     */
public function toMail($notifiable)
{
    $frontendUrl = config('app.frontend_url');

    $url = $frontendUrl
        . '/change-password?token=' . $this->token
        . '&email=' . urlencode($notifiable->email);

    return (new MailMessage)
        ->subject(' Réinitialisation de votre mot de passe')
        ->view('emails.reset', [
            'user' => $notifiable,
            'resetLink' => $url,
        ]);
}

}
