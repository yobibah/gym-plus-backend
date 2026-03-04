<?php 

namespace App\Services;

use Illuminate\Support\Carbon;
use App\Models\abonnement;
use App\Models\depenses;
use App\Models\User;

class AiDataNeeded {

    public function __construct(public User $user) {}

    public function Recette()
    {
        $salle = $this->user->salle;

        // abonnements
        $query = abonnement::where('salle_id', $salle->id);

        $dataN = $query
            ->whereMonth('debut', Carbon::now()->month)
            ->whereYear('debut', Carbon::now()->year)
            ->get();

        $troisMois = $query
            ->whereBetween('debut', [
                Carbon::now()->subMonths(3)->startOfDay(),
                Carbon::now()->endOfDay(),
            ])
            ->get();

        $moiD = abonnement::where('salle_id', $salle->id)
            ->whereMonth('debut', Carbon::now()->subMonth()->month)
            ->whereYear('debut', Carbon::now()->year)
            ->get();

        $anD = $query
            ->whereYear('debut', Carbon::now()->subYear()->year)
            ->get();

        // Dépenses
        // $depense = depenses::where('salle_id', $salle->id)->get();

        // Retourne uniquement les totaux (pas les objets complets)
        return [
            'nbrecmoi' => $dataN->count(),
            'MontantCeMois' => $dataN->sum('montant'),

            'nbrtroismois' => $troisMois->count(),
            'MontantTroiMmois' => $troisMois->sum('montant'),

            'nbrmoisDernier' => $moiD->count(),
            'montantMoisDernier' => $moiD->sum('montant'),

            'nbrannerDernierre' => $anD->count(),
            'MontantAnnerDerniere' => $anD->sum('montant'),

            // 'MontantDepnses' => $depense->sum('montant'),
        ];
    }
}
