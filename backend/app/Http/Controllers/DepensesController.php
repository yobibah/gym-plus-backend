<?php

namespace App\Http\Controllers;

use App\Models\depenses;
use Illuminate\Support\Facades\DB;
use Carbon\Month;
use Carbon\Carbon;
use App\Models\abonnement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Client\ResponseSequence;

class DepensesController extends Controller
{
    protected $plan = [
        'premium',
        'pro'
    ];
    //verifier dabord si son abonnement ces la version pro 
    // le front va deja verifier si le ces un pro ,standard ou premium

    public function ajouterDepense(Request $request)
    {
        $user = $request->user();
        $user = $request->user();
        if (!$user->IsActif()) {
            return response()->json([
                'message' => 'abonnement expirer veuillez vous reaboabonner pour continuer'
            ], 401);
        }

        if (!$user->hasrole('Gerant')) {
            return response()->json([
                'message' => 'non autoriser'
            ], 401);
        }

        // recuperer le dernier paiement du user courant
        $paiemnt = $user->dernierPaiementReussi;


        // verifier si le plan  du user est parmis le tableau
        if (!in_array(strtolower($paiemnt->plan), $this->plan)) {
            return response()->json([
                'message' => ' votre forfais ne vous permet pas d\'avoir acces a cette ressource'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'motif' => 'required|string',
            'montant' => 'required:number',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
            ], 400);
        }
        DB::beginTransaction();
        try {
            $salle = $user->salle;
            // $data= $request->all();
            // $userData = [ 
            //     'gerant_is'=>$user->id,
            //     'salle_id'=>$salle->id,
            //     'date_depense'=>Carbon::now(),
            //     'motif'=>$request->motif,
            //     'montant'=>$request->montant
            // ];

            depenses::create([
                'gerant_id' => $user->id,
                'salle_id' => $salle->id,
                'date_depense' => Carbon::now(),
                'motif' => $request->motif,
                'montant' => $request->montant
            ]);
            DB::commit();
            return response()->json([
                'message' => 'une depense a ete creer'
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    public function MesDepenses(Request $request)
    {
        $user = $request->user();

        if (!$user->hasrole('Gerant')) {
            return response()->json([
                'message' => 'non autoriser'
            ], 401);
        }

        try {
            $salle = $user->salle;
            $depense = depenses::where('gerant_id', $user->id)->where('salle_id', $salle->id)->paginate(10);

            return response()->json([
                'depense' => $depense
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ]);
        }
    }

    /// cette fonctionnalite est juste limite a ceux de pro et premium
    // la rectte sera de facons annuel , trimiestriel et mensuel

    public function Recette(Request $request)
    {
        $user = $request->user();

        // if (!$user->hasrole('Gerant')) {
        //     return response()->json([
        //         'message' => 'non autotoriser'
        //     ], 401);
        // }

        // // recuperer le dernier paiement du user courant
        // $paiemnt = $user->dernierPaiementReussi;


        // // verifier si le plan  du user est parmis le tableau
        // if (!in_array(strtolower($paiemnt->plan), $this->plan)) {
        //     return response()->json([
        //         'message' => ' votre forfais ne vous permet pas d\'avoir acces a cette ressource'
        //     ], 403);
        // }

        // je vais genener les recttes de ce mois en totalisant le gain gagner
        DB::beginTransaction();
        try {

            // essayer de recuperer tous les abonnements pour ce mois 
            $salle = $user->salle;
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

            $result = [
                [
                    'periode' => 'mois_actuel',
                    'total_abonnements' => $dataN->count(),
                    'montant_total' => $dataN->sum('montant'),
                    // 'abonnements' => $dataN->values()
                ],
                [
                    'periode' => '3_derniers_mois',
                    'total_abonnements' => $troisMois->count(),
                    'montant_total' => $troisMois->sum('montant'),
                    // 'abonnements' => $troisMois->values()
                ],
                [
                    'periode' => 'mois_precedent',
                    'total_abonnements' => $moiD->count(),
                    'montant_total' => $moiD->sum('montant'),
                    // 'abonnements' => $moiD->values()
                ],
                [
                    'periode' => 'annee_precedente',
                    'total_abonnements' => $anD->count(),
                    'montant_total' => $anD->sum('montant'),
                    // 'abonnements' => $anD->values()
                ]
            ];

            DB::commit();

            return  response()->json( $result);
           
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }


    // utiliser composer require rap2hpoutre/fast-excel
    //pour exporter en csv
    public function rapportFinancier(Request $request) {}


    public function Rappportavancer() {}
}
