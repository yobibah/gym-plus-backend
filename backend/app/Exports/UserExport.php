<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Carbon\Carbon;
class UserExport implements FromCollection, WithHeadings, WithMapping
{
    protected $gerantId;

    public function __construct($gerantId)
    {
        $this->gerantId = $gerantId;
    }

public function collection()
{
    $gerant = User::where('id', $this->gerantId)
        ->whereHas('roles', fn($q) => $q->where('name', 'Gerant'))
        ->first();

    if (!$gerant) {
        return collect(); // renvoie une collection vide si aucun gérant trouvé
    }

    // On récupère tous les adhérents du gérant
    return $gerant->salle->adherents() // relation
        ->with(['dernierAbonnement']) // eager load
        ->get(); // <-- IMPORTANT : transforme la relation en Collection
}

    public function headings(): array
    {
        return [
            'ID',
            'Nom',
            'Prenom',
            'Email',
            'Téléphone',
            'Créé le',
            'Status',
            'Suspendu',
            'Debut',
            'Fin',
            'forfait',
            'Numero de Transaction'

        ];
    }


public function map($user): array
{
    $abonnement = $user->dernierAbonnement;

    return [
        $user->id,
        $user->name,
        $user->prenom,
        $user->email,
        $user->telephone ?? '',
        $user->created_at ? Carbon::parse($user->created_at)->format('Y-m-d H:i') : 'N/A',

        // retourner les abonnements
        $abonnement ? ($abonnement->actif ? 'actif' : 'non actif') : 'pas d’abonnement',
        $abonnement ? ($abonnement->date_suspension ? 'suspendu' : 'non suspendu') : 'N/A',

        $abonnement ? ( $abonnement->debut ? Carbon::parse($abonnement->debut)->format('Y-m-d H:i') : 'N/A') : 'N/A',
        $abonnement ? ( $abonnement->fin ? Carbon::parse($abonnement->fin)->format('Y-m-d H:i') : 'N/A') : 'N/A',

        $abonnement ? $abonnement->plan : 'N/A',
        $abonnement ? $abonnement->transID : 'N/A',
    ];
}


}
