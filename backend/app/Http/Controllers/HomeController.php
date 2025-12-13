<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    // dans ce controlleur je vais renvoyer tte les donner que le gerant de la salle voudra voir

public function MesAdherants(Request $request)
{
    $current = $request->user();

    // Vérifier que l'utilisateur est gérant
    if (!$current->hasRole('Gerant')) {
        return response()->json(['message' => 'Vous n’êtes pas gérant'], 403);
    }

    // Récupérer la salle du gérant
    $salle = $current->salle; // hasOne → retourne directement le modèle ou null

    if (!$salle) {
        return response()->json(['message' => 'Aucune salle associée'], 404);
    }

    // Récupérer les adhérents de cette salle
$adherents = $salle->adherents()
    // ->whereHas('roles', fn($q) => $q->where('name', 'Adherant')) 
    ->with(['dernierAbonnement'])
    ->paginate(10);

 // 
    // $abonmment = $adherents->Abonnement();
    // $adherents->paginate(10);

    return response()->json([
        'salle' => $salle,
        'adherents' => $adherents ?? ' pas de d\'adherant',
     
    ]);
}


    public function AbonnementExpirer(Request $request){

    }

    /// les autres seront biens reflechis et pensee pour le bien du code 
}
