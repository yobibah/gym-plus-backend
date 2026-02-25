<?php

namespace App\Mail;

use App\Models\salle;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class SendFacture extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $Adherant;
    public string $facture;

    public $salle;
    public function __construct($Adherant ,  $salle , $pdfUri)
    {
        //
        $this->Adherant = $Adherant;
       
        $this->salle= $salle;
         $this->facture=$pdfUri;
    }

public function build()
{
       
    return $this->subject("Recu d'Inscription / Reinscriptions a la salle " . $this->salle->nom_salle)
        ->view('emails.facture-email')
        ->with([
            'adherent' => $this->Adherant,
            'salle' => $this->salle,
            'facture' => $this->facture
        ]);
   
}
}
