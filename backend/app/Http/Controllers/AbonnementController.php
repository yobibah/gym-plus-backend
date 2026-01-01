<?php

namespace App\Http\Controllers;

use App\Mail\ReabonnementMail;
use App\Models\reabonnemen_trace;
use App\Models\User;
use App\Models\abonnement;
use Illuminate\Database\Events\TransactionBeginning;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Log;

class AbonnementController extends Controller
{
    protected $plan = ["pro", "premium"];
    public function reabonemment(Request $request)
    {
        $current = $request->user();

        if (!$current->hasrole('Gerant')) {
            return response()->json([
                'message' => 'vous n\'etes pas autorise'
            ]);
        }

        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'email' => 'required|email',
            'plan' => 'required|in:mensuel,trimestriel,annuel'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 200);
        }
        DB::beginTransaction();

        try {
            $adherant = User::where('email', $request->email)->whereHas('roles', fn($q) => $q->where('name', 'Adherant'))->first();
            if (!$adherant) {
                return response()->json([
                    'message' => 'adherant non trouve',

                ], 404);
            }
            // mtn ajouter l'abonnement..
            $abonnement = $adherant->dernierAbonnement;
            Log::info($abonnement);
            if ($abonnement) {
                return response()->json([
                    'message' => 'un abonnement est en cours de validite pour cet utilisateur'
                ]);
            }
            $sallepri = $current->salleprix;
            $salle = $current->salle;

            switch ($request->plan) {
                case 'mensuel':
                    $montant = $sallepri->montant_1;
                    $fin = 1;
                    break;
                case 'trimestriel':
                    $montant = $sallepri->montant_2;
                    $fin = 3;
                    break;
                case 'annuel':
                    $montant = $sallepri->montant_3;
                    $fin = 12;
                    break;
            }

            $abonnement_passer = abonnement::where('adherant_id', $adherant->id)
                ->where('salle_id', $salle->id)
                ->where('actif', 0)->latest('fin')->first();
            Log::info($abonnement_passer);

            reabonnemen_trace::forceCreate([
                'plan' => $abonnement_passer->plan,
                'adherant_id' => $abonnement_passer->adherant_id,
                'salle_id' => $abonnement_passer->salle_id,
                'abonnement_id' => $abonnement_passer->id,
                'debut' => $abonnement_passer->debut

            ]);
            // $abonnement_passer->delete();
            // $abonnement_passer->save();

            //$transID = Str::random(4) . '#' . Carbon::today() . '@' . rand(111, 999);
            $abonnement = $abonnement_passer->update([

                'debut' => Carbon::now(),
                'fin' => Carbon::today()->addMonths($fin),
                'montant' => $montant,
                'plan' => $request->plan,
                'actif' => 1
            ]);

            // mail le user que son abonnement a ete mise a jours
            Mail::to($adherant->email)->queue(new ReabonnementMail($adherant, $salle));
            DB::commit();
            return response()->json([
                'message' => 'abonnement mise a jours'
            ]);


        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json([
                'message' => $e->getMessage(),
                'line' => $e->getTrace(),
                'error' => $e->getTraceAsString()
            ]);
        }

    }

    /// suspendre un abonnement uniquement reserver au pro et premium
    public function SusprendreAbonnement(Request $request)
    {
        $user = $request->user();
        if (!$user->hasRole('Gerant')) {
            return response()->json([
                'message' => 'non autoriser'
            ], 401);
        }

        $paiement = $user->dernierPaiementReussi;
        if (!in_array($paiement->plan, $this->plan)) {
            return response()->json([
                'message' => 'vous ne pouvez pas effectuer cette action'
            ], 403);

        }

        $validator = Validator::make($request->all(), [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
            ]);
        }

        DB::beginTransaction();

        try {
            $adh = User::find($request->id);
            if (!$adh) {
                return response()->json([
                    'message' => 'non trouve'
                ], 404);
            }
            $salle = $user->salle;
            if (!$adh->hasrole('Adherant') || !$salle->adherents()->where('adherant_id', $request->id)) {

                return response()->json([
                    'message' => 'cet utlisateur n\'existe pas dans votre salle'
                ], 404);
            }

            $abonnement = abonnement::VerifierAbonnement($request->id, $salle->id);
            if (!$abonnement) {
                return response()->json([
                    'message' => 'aucun abonnement actif'
                ], 404);
            }

            // preocerder a la suspension de l'abonnement

            $abonnement->date_suspension = Carbon::now();
            $abonnement->actif = 0;
            $abonnement->save();

            DB::commit();

            return response()->json([

                'message' => ' l\'abonnement de ' . $adh->name . ' ' . $adh->prenom . ' a ete geler avec succes'

            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    public function reactiverAbonnemnt(Request $request)
    {
        $user = $request->user();
        if (!$user->hasRole('Gerant')) {
            return response()->json([
                'message' => 'non autoriser'
            ], 401);
        }

        $paiement = $user->dernierPaiementReussi;
        if (!in_array($paiement->plan, $this->plan)) {
            return response()->json([
                'message' => 'vous ne pouvez pas effectuer cette action'
            ], 403);

        }

        $validator = Validator::make($request->all(), [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
            ]);
        }

        DB::beginTransaction();

        try {
            $adh = User::find($request->id);
            if (!$adh) {
                return response()->json([
                    'message' => 'non trouve'
                ], 404);
            }
            $salle = $user->salle;
            if (!$adh->hasrole('Adherant') || !$salle->adherents()->where('adherant_id', $request->id)) {

                return response()->json([
                    'message' => 'cet utlisateur n\'existe pas dans votre salle'
                ], 404);
            }

            $abonnement = abonnement::VerifierSuspendu($request->id, $salle->id);
            if (!$abonnement) {
                return response()->json([
                    'message' => ' abonnement deja degeler'
                ], 404);
            }

            $dateReprise = Carbon::now();

            $joursRestants = Carbon::parse($abonnement->fin)
                ->diffInDays(Carbon::parse($abonnement->date_suspension));

            $abonnement->date_suspension = null;
            $abonnement->fin = $dateReprise->copy()->addDays($joursRestants);
            $abonnement->actif = 1;
            $abonnement->save();

            DB::commit();

            return response()->json([

                'message' => ' l\'abonnement de ' . $adh->name . ' ' . $adh->prenom . ' a ete degeler avec succes'

            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }


}
