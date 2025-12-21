<?php

namespace App\Mail;

use App\Models\Document;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DocumentValiation extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $gerant;
    public $documment;

    public function __construct(User $gerant, Document $documment)
    {
     
        $this->gerant = $gerant;
        $this->documment = $documment;
    }

    public function build()
    {
        // Récupère la salle liée au document
        $salle = $this->documment->salle;

        return $this->subject('Validation des documents d\'un nouveau client')
                    ->with([
                        'document' => $this->documment,
                        'gerant' => $this->gerant,
                        'salle' => $salle
                    ])
                    ->view('emails.DocumentValidation');
    }
}
