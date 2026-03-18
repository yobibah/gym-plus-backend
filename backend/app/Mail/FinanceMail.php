<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class FinanceMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $finance_url;

    /**
     * Create a new message instance.
     */
    public function __construct($url)
    {
        $this->finance_url = $url;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $fileContent = file_get_contents($this->finance_url);

        return $this->subject('Rapport Financier')
            ->view('emails.finance') // ta vue email
            ->attachData(
                $fileContent,
                'rapport_financier.pdf',
                [
                    'mime' => 'application/pdf',
                ]
            );
    }
}