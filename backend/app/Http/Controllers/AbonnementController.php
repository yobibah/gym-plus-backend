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

            $abonnement_passer = abonnement::where('adherant_id',$adherant->id)
                        ->where('salle_id',$salle->id)
                        ->where('actif',0)->latest('fin')->first();
            Log::info($abonnement_passer);
               
            reabonnemen_trace::forceCreate([
                'plan'=> $abonnement_passer->plan,
                'adherant_id'=> $abonnement_passer->adherant_id,
                'salle_id'=> $abonnement_passer->salle_id,
                'abonnement_id'=>$abonnement_passer->id,
                'debut'=>$abonnement_passer->debut

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
            Mail::to($adherant->email)->queue(new ReabonnementMail($adherant,$salle));
            DB::commit();
            return response()->json([
                'message' => 'abonnement mise a jours'
            ]);


        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json([
                'message' => $e->getMessage(),
                'line'=>$e->getTrace(),
                'error'=>$e->getTraceAsString()
            ]);
        }

    }




}
