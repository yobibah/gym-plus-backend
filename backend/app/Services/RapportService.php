<?php 


namespace App\Services;

use App\Models\Finanapport;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Illuminate\Support\Facades\Storage;

class RapportService{
    

 public function generer( $salle, $report)
    {

        
        $pdf = Pdf::loadView('pdf.rapportFinancier', [
            'salle' => $salle,
            'report'=>$report
        
        ])
        ->setPaper('a4', 'landscape')
        ->setWarnings(false);

        $fileName = 'factures/rapportFinancier_' . uniqid() . '.pdf';

  

 
        if (!Storage::disk('minio')->put($fileName, $pdf->output(), 'public')) {
            throw new Exception("Impossible d'enregistrer le rapport financier");
        }
        


      $facture =  Finanapport::create([

            'salle_id'         => $salle->id,
            'numero_finance'   => 'FAC-' . now()->timestamp,
            'finance_url'      => Storage::disk('minio')->url($fileName),
        ]);

        return $facture->finance_url;
    }

}