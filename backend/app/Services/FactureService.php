<?php

namespace App\Services;

use Exception;
use App\Models\User;
use App\Models\Salle;
use App\Models\facture;
use App\Models\Abonnement;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class FactureService
{
    public function generer( $salle,  $adherant,  $abonnement)
    {

        
        $pdf = Pdf::loadView('pdf.facture', [
            'salle' => $salle,
            'user' => $adherant,
            'abonnement' => $abonnement,
        ])
        ->setPaper('a4', 'landscape')
        ->setWarnings(false);

        $fileName = 'factures/facture_' . uniqid() . '.pdf';

 
        if (!Storage::disk('minio')->put($fileName, $pdf->output(), 'public')) {
            throw new Exception("Impossible d'enregistrer la facture");
        }
        


        facture::create([
            'adherant_id'      => $adherant->id,
            'salle_id'         => $salle->id,
            'abonnement_id'    => $abonnement->id,
            'Numero_facure'   => 'FAC-' . now()->timestamp,
            'facture_url'      => Storage::disk('minio')->url($fileName),
        ]);
    }
}
