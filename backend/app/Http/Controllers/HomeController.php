<?php

namespace App\Http\Controllers;

use App\Http\Resources\HistoriqueResource;
use App\Models\abonnement;
use App\Models\historique;
use App\Models\reabonnemen_trace;
use App\Models\User;
use App\Services\IkoddiService;
use App\Services\PaysApiService;
use App\Services\SenfenicoService;
use Aws\Api\Parser\JsonParser;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Senfenico\Senfenico;
use Vtiful\Kernel\Excel;

class HomeController extends Controller
{
    // dans ce controlleur je vais renvoyer tte les donner que le gerant de la salle voudra voir
    private int $cpt = 0;
    private float $mensuel =0;
    private float  $trimestriel =0;
    private float $annuel=0;


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
        // // $adherents->paginate(10);

$abonnement = cache::remember('abonemment_'.$current->id,100,function()use($current){
    return abonnement::where('salle_id',$current->salle->id)->get();
});  

$abonnementpas = cache::remember('abonnementpas_'.$current->id,100,function()use($current){
    return reabonnemen_trace::where('salle_id',$current->salle->id)->get();
});  





foreach ($abonnement as $adh) {
    $plan = $adh->plan;
    if (!$abonnement) continue;

    switch ($plan) {
        case 'mensuel':
            $this->mensuel += $adh->montant;
            break;
        case 'annuel':
            $this->annuel += $adh->montant;
            break;
        case 'trimestriel':
            $this->trimestriel += $adh->montant;
            break;
    }
}


foreach ($abonnementpas as $adh) {
    $plan = $adh->plan;
    if (!$abonnementpas) continue;

    switch ($plan) {
        case 'mensuel':
            $this->mensuel += $adh->montant;
            break;
        case 'annuel':
            $this->annuel += $adh->montant;
            break;
        case 'trimestriel':
            $this->trimestriel += $adh->montant;
            break;
    }
}
          
        return response()->json([

            'adherents' => $adherents ?? ' pas de d\'adherant',
            'mensuel'=>$this->mensuel,
            'trimestriel'=>$this->trimestriel,
            'annuel'=>$this->annuel


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
            // $adhActif = $salle->adherentsActif();
            $adhActif = Cache::remember('adherentActif_'.$user->id,100,function()use($salle){
                return $salle->adherentsActif();

            }); 


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

        try {
            $salle = $user->salle;
            $adhActif = Cache::remember('adherentExpirer_'.$user->id,100,function()use($salle){
                return $salle->adherentsExpirer();

            }); 

            // ici ce quand il n;y pas daderant actif
            if (!$adhActif) {
                return response()->json(['message' => 'aucun adherant est actif'], 404);
            }

            return response()->json([
                // 'expirer'=>$adhActif,
                'nbr' => $adhActif->count() ?? 0,
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
              $bientotExpirer = Cache::remember('bientotExpirer_'.$user->id,100,function()use($salle){
                return $salle->bientotExpirer;

            }); 
            // $bientotExpirer = $salle->bientotExpirer;


            return response()->json([
                'NBexpirer' => $bientotExpirer->count() ?? 0,
                'Bientoexpirer'=>$bientotExpirer
            ]);
        } catch (\Exception $th) {
            //throw $th;
        }


    }

    public function testSms(Request $request){

        $user = $request->user();
        $valdator = Validator::make($request->all(),[
            'numero'=> 'required|string|min:8',
             'montant'=>'required',
             'ext_id'=>'nullable|string'
        ]);

        if ($valdator->fails()){
            return response()->json([
                'message'=>$valdator->errors()
            ]);
        }
       
        $data = [
            'destinataire'=>$request->numero,
            'montant'=>$request->montant,
            'ext_id'=>Hash::make(rand(1,999)).'@'.$request->numerom
        ];

        $sms = new SenfenicoService();
    //     $transID = $user->dernierPaiement->transId;
    //    $ms= $sms ->fetch( (string)$transID);

       $transf =$sms ->Transferer($data);
     
        return $transf;
        

    }
    public function ConnexionHistorique(Request $request){
        $user = $request->user();

        $historique = Cache::remember('historique_'.$user->id,100,function() use($user){
            return historique::where('gerant_id',$user->id)->orderByDesc('date_connexion')->get();
        });

        return response()->json([
            'historiques'=>HistoriqueResource::collection($historique)
        ]);
    }
    /// les autres seront biens reflechis et pensee pour le bien du code 

    // public function ExporterCsv(Request $request){
    //     $user = $request->user();


    // }


}
