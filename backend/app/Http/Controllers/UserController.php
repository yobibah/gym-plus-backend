<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\paiement;
use App\Models\abonnement;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Log;

class UserController extends Controller
{
    private function AddUsers(array $data, $gerant)
    {

        $exist = User::where('email', $data['email'])
            ->whereHas('roles', fn($q) => $q->where('name', 'Adherant'))
            ->where('salle_id', $gerant->salle_id)
            ->exists();


        if ($exist) {
            return [
                'error' => true,
                'message' => "Oups !!! Cet utilisateur existe déjà dans votre salle."
            ];
        }

        $adherant = User::create([
            'name' => $data['nom'],
            'email' => $data['email'],
            'telephone' => $data['telephone'],
            'prenom' => $data['prenom'],
            'username' => $data['nom'] . ' ' . $data['prenom'],
            'password' => 'adherant'
        ]);
        $adherant->assignRole('Adherant');
        Log::info('log pour voir les adherant ' . $adherant);
        return [
            'error' => false,
            'user' => $adherant
        ];
    }

//     private function AddAbonnement(array $data, $gerant = null)
//     {
//         try {
//             //ajouter email dans le table abonnement
//             $exists = abonnement::where('adherant_id', $data['adherant']['id'])->orWhere('email', $data['adherant']['email'])->where('fin' >= Carbon::now())->exists();
//             if ($exists) {
//                 return [
//                     'message' => 'abonnement en cours de validite',
//                     'error' => false,
//                     'code' => 200
//                 ];
//             }

//             $transID = Str::random(4) . '#' . Carbon::today() . '@' . rand(111, 999);
//             // $fin= $data['fin'];
//             // Log::info('la fin'. $fin);
//             // switch ($fin){
//             //     case 30 :
//             //         $plan = "mensuel";
//             //       break;
//             //     case 60:
//             //         $plan = "trimestriel";
//             //         break;
//             //     case 360:
//             //         $plan = "annuel";

//             // }

//             // Vérifier que l'utilisateur est bien un gérant
// // if (!$gerant->hasRole('Gerant')) {
// //     return[
// //         'message' => "Vous n'êtes pas autorisé"
// //     ], 401);
// // }

//             // Le gérant doit avoir UNE salle ACTIVE
//             $salle = $gerant->salles()->where('active', true)->first();

//             if (!$salle) {
//                 return [
//                     'error' => true,  // 🔥 AJOUT OBLIGATOIRE
//                     'code' => 404,
//                     'message' => "Vous devez d'abord créer et valider votre salle avant d'ajouter un abonnement."
//                 ];
//             }


//             $abonnement = abonnement::create([
//                 'adherant_id' => $data['adherant']['id'],
//                 'email' => $data['adherant']['email'],
//                 'debut' => Carbon::now(),
//                 'fin' => Carbon::now()->addMonths(1),
//                 'date_ajout' => Carbon::now(),
//                 'transID' => $transID,
//                 'montant'=>45000,
//                 'plan' => 'mensuel',
//                 'salle_id' => $salle->id,
//             ]);

//             return [
//                 'abonnement' => $abonnement,
//                 'error' => false,
//                 'code' => 201,
//                 'message' => 'votre abonnement a ete approuve avec success'

//             ];

//         } catch (\Throwable $th) {

//             return [

//                 'error' => true,
//                 'code' => 500,
//                 'message' => 'une erreur est survenue lors de l\'abonnement'

//             ];
//         }


//     }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public function AjouterAdherant(Request $request)
    {
        //si version standar on aura au max 100 adherant;
        //           pro                     3000 adherant
        //           premium                   illimite

        $gerant = $request->user();
        if (!$gerant->hasrole('Gerant')) {
            return response()->json([
                'message' => 'vous n\'avez pas l\'autirisaton'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email',
            'telephone' => 'required|min:8',
            //fin ces la fin de l'abonnement
            'fin' => 'required|integer',
            'status'=>'required|boolean'


        ]);

        $data = [
            'name' => $request->nom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'prenom' => $request->prenom,
            'fin' => $request->fin
        ];
        if ($validator->fails()) {
            return response()->json([
                'message' => 'les champs ne sont pas correctement renseigne'
            ]);
        }


        try {

            //verifier si le paiement est actif avant de continuer
            $paiement = $gerant->paiements()->where('fin', '>=', Carbon::now())->first();
            $adherantCount = User::whereHas('roles', function ($q) {
                $q->where('name', 'Adherant');
            })
                ->where('gerant_id', $gerant->id)
                ->where('salle_id', $gerant->salle_id)
                ->count();


            Log::info(' poue les adherant ' . $adherantCount);
            Log::info('abonnemet ' . $paiement);

            $limit = [
                'pro' => 1000,
                'standard' => 200,
                'premium' => PHP_INT_MAX
            ];

            if (!$paiement) {
                return response()->json([
                    'message' => 'votre abonnement  a expire'
                ]);
            }

            if ($adherantCount >= $limit[$paiement->plan]) {
                return response()->json([
                    'message' => 'vous avez atteint la limite autorise. Veuillez passer au plan supererieur'
                ]);

            }

            // ici ajouter  des adherants

            $res = $this->AddUsers($request->all(), $gerant);




            if ($res['error']) {
                return response()->json([
                    'message' => $res['message']
                ], 409);
            }

            $adherant = $res['user'];
            // $data = [
            //     'adherant' => [
            //         'id' => $adherant->id,
            //         'email' => $adherant->email,
            //     ],
            //     'abonnement' => [
            //         'montant' => $request->montant,
            //         'fin' => $request->fin
            //     ]
            // ];

            // ici ajouter l'abonnement des adherants

              $salle = $gerant->salles()->first();
              Log::info('salle '.  $salle->id);

            if (!$salle) {
                return [
                    'error' => true,  // 🔥 AJOUT OBLIGATOIRE
                    'code' => 404,
                    'message' => "Vous devez d'abord créer et valider votre salle avant d'ajouter un abonnement."
                ];
            }



       $transID = Str::random(4) . '#' . Carbon::today() . '@' . rand(111, 999);

            $abonnement = abonnement::create([
                'adherant_id' => $res['user']->id,
                'email' => $res['user']->email,
                'debut' => Carbon::now(),
                'fin' => Carbon::now()->addMonths(1),
                'date_ajout' => Carbon::now(),
                'transID' => $transID,
                'montant'=>45000,
                'plan' => 'mensuel',
                'salle_id' => $salle->id,
                'status'=>$request->status,
            ]);


            return response()->json([
                'message' => 'adherant cree avec succes',
                'adherant' => $res['user'],
                'abonnement'=>$abonnement
            ]);


        } catch (Exception $th) {
            Log::info($th->getMessage(), $th->getTrace());
            return response()->json([
                'message' => 'erreur liee au serveur'
            ], 500);
        }




    }


      public function PlanChoisit(Request $request){
        $user = $request->user();
        $plan = $user->dernierPaiementReussi->plan;
        return response()->json([
            'plan'=>$plan
        ]);

      }

  

    public function NotifierAherant()
    {

    }

    public function SuspendreAdherent()
    {

    }


    // si version premium
    public function ProgrammerActiviter(Request $request)
    {

    }


}
