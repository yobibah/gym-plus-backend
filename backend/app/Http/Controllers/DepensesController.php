<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class DepensesController extends Controller
{
    //verifier dabord si son abonnement ces la version pro 
    // le front va deja verifier si le ces un pro ,standard ou premium

    public function ajouterDepense(Request $request):void{
        $current = $request->user();
        $abonnment = $current->paiements()->where('fin','>=', Carbon::now())->where('status','reussi')->first();

        if(!$abonnment){
          return response()->json([
            'message'=>' votre abonnement a expiree veuillez vous reabonner'
          ],404);
        }

       $plan = [
        'standard',
        'pro',
        'premium'
       ];

    //    $salleCount = $current->salle()->count();
       if($plan[$abonnment->plan] == $plan[1] ){
        return response()->json([
            'message'=> 'vous ne vous pas effectuer cette action veuillez passe a la version superieur'
        ]);
       }
    }

    public function DepensesSalle(){
      
    }

    public function GenererRapportFinancier(){

    }

}
