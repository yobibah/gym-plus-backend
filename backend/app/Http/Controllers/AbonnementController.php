<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\abonnement;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Log;

class AbonnementController extends Controller
{
    public function reabonemment(Request $request){
        $current = $request->user();

        $validator = Validator::make($request->all(),[
            'id'=>'required|integer',
            'email'=> 'required|email',
             'plan'=> 'required|in:mensuel,trimestriel,annuel'
        ]);

        if ($validator->fails()){
            return response()->json([
                'status'=> 'error',
                'message'=> $validator->errors()->first()
                ],200);
        }

        try{
            $adherant = User::where('email',$request->email)->whereHas('roles',fn($q) => $q->where('name','Adherant'))->exists();
            if(!$adherant){
                return response()->json([
                    'message'=>'adherant non trouve',
                    
                ],404);
            }
            // mtn ajouter l'abonnement..
            $abonnement = $adherant->abonnement()->where('fin','>=',Carbon::now())->first();
            if($abonnement){
                return response()->json([
                    'message'=> 'un abonnement est en cours de validite pour cet utilisateur'
                ]);
            }

            
            $transID = Str::random(4) . '#' . Carbon::today() . '@' . rand(111, 999);
            $abonnement = abonnement::create([
                'adherant_id' => $adherant->id,
                'email' => $adherant->email,
                'debut' => Carbon::now(),
                'fin' => Carbon::now()->addMonths($request->fin),
                'date_ajout' => Carbon::now(),
                'transID' => $transID,
                'montant'=>$request->montant,
                'plan' => 'mensuel',
                'salle_id' => $adherant->salle_id,
            ]);

            return response()->json([
                'message'=>'abonnement mise a jours'
            ]);

        }
        catch(\Exception $e){
            Log::error($e->getMessage());
            return response()->json([
                'message'=> $e->getMessage(),
            ]);
        }
        
    }

    public function AbonnementEnCours(Request $request){
        $current = $request->user();
        try{
            
         $abc= abonnement::where('fin','>=', Carbon::now())->all();

        if(!$abc){
            return response()->json([
                'message'=>'aucun abonnemn en cours de validite'
            ]);
        }

        return response()->json([
                'abonnnement'=>$abc
            ]);
     
             } catch(\Exception $e){
                Log::error($e->getMessage());
             }
    }
    
    
}
