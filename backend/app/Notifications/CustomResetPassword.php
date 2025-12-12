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
        // Génère l'URL de réinitialisation
        $url = 'http://localhost:5173/reset-password?token=' . $this->token . '&email=' . urlencode($notifiable->email);

        // Retourne un email utilisant ta vue Tailwind
        return (new MailMessage)
                    ->subject('🔑 Réinitialisation de votre mot de passe')
                    ->view('emails.reset', [
                        'user' => $notifiable,
                        'resetLink' => $url,
                    ]);
    }
}
