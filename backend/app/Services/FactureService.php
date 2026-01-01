<?php

namespace App\Services;

use App\Models\User;
use App\Models\Salle;
use App\Models\Abonnement;
use App\Models\facture;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Exception;

class FactureService
{
    public function __construct(
        public User $user,
        public Salle $salle,
        public Abonnement $abonnement
    ) {
    }

    public function generer()
    {
        // 1️⃣ Générer le PDF
        $pdf = Pdf::loadView('pdf.facture', [
            'user' => $this->user,
            'salle' => $this->salle,
            'abonnement' => $this->abonnement
        ]);

        // 2️⃣ Nom du fichier
        $fileName = 'documents/facture_' . uniqid() . '.pdf';

        // Stockage MinIO
        $stored = Storage::disk('minio')->put(
            $fileName,
            $pdf->output(),
            'public'
        );


        if (!$stored) {
            throw new Exception("Échec de l'enregistrement de la facture");
        }

        // 4️⃣ Enregistrer en base
        $facture = Facture::create([
            'adherant_id' => $this->user->id,
            'salle_id' => $this->salle->id,
            'abonnement_id' => $this->abonnement->id,
            'Numero_facure' => 'FAC-' . time(),
            'facture_url' => Storage::disk('minio')->url($fileName),
        ]);

        return $pdf->download('facture.pdf');
    }

    protected function supprimer()
    {
    }

    protected function editer()
    {
    }
}
