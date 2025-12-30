<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    // dans ce controlleur je vais renvoyer tte les donner que le gerant de la salle voudra voir
    private int $cpt = 0;

    public function MesAdherants(Request $request)
    {
        $current = $request->user();

        // Vérifier que l'utilisateur est gérant
        if (!$current->hasRole('Gerant')) {
            return response()->json(['message' => 'Vous n’êtes pas gérant'], 401);
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

            'adherents' => $adherents ?? ' pas de d\'adherant',


        ]);
    }

    public function NbreAdherant(Request $request)
    {
        $user = $request->user();

        $adhr = $user->salle->adherents();
        return response()->json([
            'nbr_adherant' => $adhr->count()
        ]);
    }

    public function AdherantActif(Request $request)
    {
        $user = $request->user();
        if (!$user->hasRole('Gerant')) {
            return response()->json(['message' => 'vous n\'etes pas autoriser'], 401);
        }
        try {
            $salle = $user->salle;
            $adhActif = $salle->adherentsActif();


            // ici ce quand il n;y pas daderant actif
            if (!$adhActif) {
                return response()->json(['message' => 'aucun adherant est actif'], 404);
            }

            return response()->json([
                // 'actif'=>$adhActif,
                'nbr_actif' => $adhActif->count() ?? 0,
                'actif'=>$adhActif,

                // 'nombre'=>count($actif),
            ], 200);
        } catch (\Exception $th) {
            return response()->json([
                'message' => $th->getMessage(),
                'line' => $th->getLine(),

            ], 500);
        }


    }

    public function AdherantExpirer(Request $request)
    {
        // ici on va selectionner tous les adherant actif.....

        $user = $request->user();
        if (!$user->hasRole('Gerant')) {
            return response()->json([
                'messsage' => 'vous n\'etes pas autorise a utiliser'
            ], 401);
        }

        try {
            $salle = $user->salle;
            $adhActif = $salle->adherentsExpirer();


            // ici ce quand il n;y pas daderant actif
            if (!$adhActif) {
                return response()->json(['message' => 'aucun adherant est actif'], 404);
            }

            return response()->json([
                // 'expirer'=>$adhActif,
                'nb' => $adhActif->count() ?? 0,
                'expirer'=>$adhActif

                // 'nombre'=>count($actif),
            ], 200);
        } catch (\Exception $th) {

        }

    }
    public function BientotExpirer(Request $request)
    {

        $user = $request->user();

        if (!$user->hasRole('Gerant')) {
            return response()->json([
                'message' => 'vous n\'avez pas l\'autorisation'
            ], 401);
        }

        try {
            $salle = $user->salle;
            $bientotExpirer = $salle->bientotExpirer();


            return response()->json([
                'NBexpirer' => $bientotExpirer->count() ?? 0,
                'Bientoexpirer'=>$bientotExpirer
            ]);
        } catch (\Exception $th) {
            //throw $th;
        }


    }

    /// les autres seront biens reflechis et pensee pour le bien du code 
}
