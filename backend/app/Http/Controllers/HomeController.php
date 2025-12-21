<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    // dans ce controlleur je vais renvoyer tte les donner que le gerant de la salle voudra voir
    private int $cpt = 0;
    public array $actif = [];
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

    public function NbreAdherant(Request $request)
    {
        $user = $request->user();

        $adhr = $user->salle->adherents();
        return response()->json([
            'nbr_adherant' => $adhr
        ]);
    }

    public function AdherantActif(Request $request)
    {
        $user = $request->user();
        $salle = $user->salle;
        $adhr = $salle->adherents()
            // ->whereHas('roles', fn($q) => $q->where('name', 'Adherant')) 
            ->with(['dernierAbonnement'])
            ->paginate(10);
        $adhr = array($adhr);
        

        // recuperer les adherant actifs 
        $status = [];

        foreach ($adhr as $ad) {
            if ($ad['status'] == false) {
                $this->actif = array_merge($this->actif, $adhr);
                $this->cpt += 1;
                $status[] = $ad['status'];

            }
        }
        // retourner les utlisateurs actif
        return response()->json([
            'adherantActif' => $this->actif,
            'nbr_actif' => $this->cpt,
            'status' => $status
        ]);

    }

    public function AdherantExpirer(Request $request)
    {

    }
    public function AbonnementExpirer(Request $request)
    {

    }

    /// les autres seront biens reflechis et pensee pour le bien du code 
}
