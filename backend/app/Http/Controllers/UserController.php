<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use Log;
use Exception;
use App\Models\User;
use App\Models\facture;
use App\Mail\welcomeMail;
use App\Models\salleprix;
use App\Models\abonnement;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\adherent_salle;
use Illuminate\Support\Carbon;
use App\Services\FactureService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Framework\Constraint\IsEmpty;

class UserController extends Controller
{
    protected $limit = [
        'pro' => 100,
        'standard' => 50,
        'premium' => PHP_INT_MAX
    ];
    protected static $majniveau = 90;
    public function mesInfo(Request $request)
    {
        $user = $request->user();
        if (!$user->hasrole('Gerant')) {
            return response()->json([
                'message' => 'pas authentifier.'
            ], 401);
        }

        return response()->json([
            'user' => $user,
            'salle' => $user->salle
        ]);
    }
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
            'name' => strtolower($data['nom']),
            'email' => strtolower($data['email']),
            'telephone' => $data['tel'],
            'prenom' => strtolower($data['prenom']),
            'username' => strtolower($data['nom'] . ' ' . $data['prenom']),
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
//                     'error' => true,  
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
            'tel' => 'required|min:8',
            'plan' => 'required|in:mensuel,trimestriel,annuel'


        ]);
        $abonementPlan = strtolower($request->plan);

        switch ($abonementPlan) {
            case 'mensuel':
                $fin = 1;
                break;
            case 'trimestriel':
                $fin = 3;
                break;
            case 'annuel':
                $fin = 12;
                break;
        }

        $data = [
            'name' => strtolower($request->nom),
            'email' => strtolower($request->email),
            'telephone' => strtolower($request->tel),
            'prenom' => strtolower($request->prenom),

        ];
        if ($validator->fails()) {
            return response()->json([
                'message' => 'les champs ne sont pas correctement renseigne'
            ]);
        }
        $exist = User::where('email', $request->email)
            ->whereHas('roles', function ($q) {
                $q->where('name', 'Adherant');
            })
            ->whereHas('salles', function ($q) use ($gerant) {
                $q->where('gerant_id', $gerant->id);
            })
            ->exists();

        if (User::where('email', $request->email)->exists()) {
            return response()->json([
                'message' => 'cet utilisateur existe deja',
                'user' => $exist
            ], status: 409);
        }


        if ($exist) {
            return response()->json([
                'message' => 'cet utilisateur existe deja',
                'user' => $exist
            ], 409);
        }


        try {

            //verifier si le paiement est actif avant de continuer
            // $paiement = $gerant->paiements()->where('fin', '>=', Carbon::now())->first();
            // $adherantCount = User::whereHas('roles', function ($q) {
            //     $q->where('name', 'Adherant');
            // })
            //     ->where('gerant_id', $gerant->id)
            //     ->where('salle_id', $gerant->salle_id)
            //     ->count();

            $ab = $gerant->dernierPaiementReussi;
            $adherantCount = $ab->limit;
            $plan = $ab->plan;
            if (!$ab) {
                return response()->json([
                    'message' => 'Votre abonnement a expiré'
                ], 403);
            }


            Log::info(' pour les adherant ' . $adherantCount);
            Log::info('abonnemet ' . $ab);



            if ($adherantCount >= $this->limit[$plan]) {
                return response()->json([
                    'message' => 'vous avez atteint la limite autorise. Veuillez passer au plan supererieur'
                ]);

            }

            //vider  le cache

            collect(['adherentActif', 'adherentExpirer', 'bientotExpirer', 'abonnementpas', 'abonemment'])->each(fn($key) => Cache::forget($key));
            // ici ajouter  des adherants 

            $res = $this->AddUsers($request->all(), $gerant);

            ;
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

            $salle = $gerant->salle;
            Log::info('salle ' . $salle->id);

            if (!$salle) {
                return [
                    'error' => true,
                    'code' => 404,
                    'message' => "Vous devez d'abord créer et valider votre salle avant d'ajouter un abonnement."
                ];
            }



            $transID = Str::random(4) . '#' . Carbon::today() . '@' . rand(111, 999);
            $mtn = $gerant->salleprix;
            $staus = 0;
            if ($abonementPlan == 'mensuel') {
                $montant = $mtn->montant_1;
                $staus = 1;
            } elseif ($abonementPlan == 'trimestriel') {
                $montant = $mtn->montant_2;
                $staus = 1;
            } else {
                $montant = $mtn->montant_3;
                $staus = 1;
            }

            $abonnement = abonnement::create([
                'adherant_id' => $res['user']->id,
                'email' => $res['user']->email,
                'debut' => Carbon::now(),
                'fin' => Carbon::now()->addMonths($fin),
                'date_ajout' => Carbon::now(),
                'transID' => $transID,
                'montant' => $montant,
                'plan' => $request->plan,
                'salle_id' => $salle->id,
                'actif' => $staus,
            ]);
            $ab->limit += 1;
            $ab->save();

            adherent_salle::forceCreate([
                'adherent_id' => $res['user']->id,
                'salle_id' => $salle->id,
            ]);

            // notifier l'utilisateur 

            Mail::to($request->email)->queue(new welcomeMail($res['user'], $salle));


            // gerer la facture d'abonnement si le gerant est premium ou pro

            if ($gerant->isPro || $gerant->isPremium) {
                $facture = new FactureService();
                $facture->Generer($gerant->salle, $adherant, $abonnement);
            }


            return response()->json([
                'message' => 'adherant cree avec succes',
                'adherant' => $res['user'],
                'abonnement' => $abonnement
            ]);


        } catch (Exception $th) {
            Log::info($th->getMessage(), $th->getTrace());
            return response()->json([
                'message' => 'erreur liee au serveur',
                'error' => $th->getMessage(),
                'line' => $th->getLine()
            ], 500);
        }




    }


    public function PlanChoisit(Request $request)
    {
        $user = $request->user();
        $plan = $user->dernierPaiement->plan;
        $abonnement = $user->dernierPaiement;
        return response()->json([
            'plan' => $plan,
            'abonnement' => $abonnement

        ]);

    }


    public function AddSallePrix(Request $request)
    {
        $user = $request->user();
        if (!$user->hasrole('Gerant')) {
            return response()->json(['message' => 'vous n\etes pas autoriser a effectuer cette action'], 401);
        }
        $salle = $user->salle;
        $existsallprix = salleprix::where('gerant_id', $user->id)->where('salle_id', $salle->id)->first();
        if ($existsallprix) {
            return response()->json(['message' => 'vous ne pouvez pas ajouter'], 409);
        }
        $validator = Validator::make($request->all(), [
            'montant_1' => 'required|numeric',
            'montant_2' => 'required|numeric',
            'montant_3' => 'required|numeric',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => ' veuillez remplir correctement les donnees'
            ], 400);
        }

        try {
            $sallePrix = salleprix::create([
                'montant_1' => $request->montant_1,
                'montant_2' => $request->montant_2,
                'montant_3' => $request->montant_3,
                'gerant_id' => $user->id,
                'salle_id' => $salle->id
            ]);

            return response()->json([
                'message' => 'vous venez de definir les prix de votre salle',
                'data' => $sallePrix
            ]);
        } catch (Exception $e) {
            if ($validator->fails()) {
                return response()->json([
                    'message' => ' une erreur est survenue',
                    'erro' => $e->getMessage(),
                    'line' => $e->getLine(),
                ], 500);
            }
        }


    }

    public function SallePrix(Request $request)
    {
        $user = $request->user();

        try {
            if (!$user->hasrole('Gerant')) {
                return response()->json(['message' => 'vous n\etes pas autoriser a effectuer cette action'], 401);
            }

            $montant = $user->salleprix;
            if (!$montant) {
                return response()->json([
                    'message' => 'vous n\'avez pas configuerer les prix pour votre salle'
                ], 404);
            }

            return response()->json([
                'montant' => $montant
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'une erreur est survenue',
                'error' => $th->getMessage(),
                'line' => $th->getLine(),
            ], 500);
        }

    }

    public function deletePrix(Request $request)
    {
        $user = $request->user();
        if (!$user->hasrole('Gerant')) {
            return response()->json([
                'message' => 'non autorise'
            ], 401);
        }

        DB::beginTransaction();

        try {
            $prix = $user->salleprix;
            if (!$prix) {
                return response()->json([
                    'message' => 'configurer les prix'
                ], 404);
            }

            $prix->delete();

            DB::commit();

            return response()->json([
                'message' => 'les prix de votre salle ont ete supprimes'
            ]);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
                'trace' => $e->getTrace()
            ], 500);
        }

    }

    public function UpdatePrix(Request $request)
    {
        $user = $request->user();
        if (!$user->hasrole('Gerant')) {
            return response()->json([
                'message' => 'non autorise'
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'montant_1' => 'nullable|numeric',
            'montant_2' => 'nullable|numeric',
            'montant_3' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'les champs de ne sont pas correctement remplis'
            ], 400);
        }
        DB::beginTransaction();
        try {
            $salleprix = $user->salleprix;
            if (!$salleprix) {
                return response()->json([
                    'message' => 'veuillez configurer le prix des salles'
                ]);
            }
            $salleprix->update([
                'montant_1' => $request->montant_1 ?? $salleprix->montant_1,
                'montant_2' => $request->montant_2 ?? $salleprix->montant_2,
                'montant_3' => $request->montant_3 ?? $salleprix->montant_3,
            ]);

            DB::commit();
            return response()->json([
                'message' => 'modification reussi'
            ], 201);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
                'trace' => $e->getTrace()
            ], 500);
        }
    }

    public function UpdateUser(Request $request)
    {
        $user = $request->user();
        if (!$user->hasrole('Gerant')) {
            return response()->json([
                'message' => 'non autorise'
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'nullable|string',
            'prenom' => 'nullable|string',
            'telephone' => 'nullable|string',
            'email' => 'nullable|email'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'les champs de ne sont pas correctement remplis'
            ], 400);
        }
        DB::beginTransaction();
        try {
            $user->update([
                'name' => $request->nom ?? $user->nom,
                'prenom' => $request->prenom ?? $user->prenom,
                'telephone' => $request->telephone ?? $user->telephone,
                'email' => $request->email ?? $user->email
            ]);

            DB::commit();
            return response()->json([
                'message' => 'modification reussi'
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
                'trace' => $e->getTrace()
            ], 500);

        }
    }

    public function UpdateMdp(Request $request)
    {
        $user = $request->user();

        if (!$user->hasrole('Gerant')) {
            return response()->json([
                'message' => 'non autorise'
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'password' => 'required|string',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'les champs de ne sont pas correctement remplis'
            ], 400);
        }
        DB::beginTransaction();
        try {

            $user->update([
                'password' => Hash::make($request->password)
            ]);

            DB::commit();

            return response()->json([
                'message' => 'modification reussi'
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'trace' => $e->getTrace()
            ], 500);


        }

    }
    public function NotifierAherant(Request $request)
    {
        $user = $request->user();
        if (!$user->hasrole('Gerant')) {
            return response()->json([
                'message' => 'vos droit sont restreint'
            ], 401);
        }
        $validator = Validator::make($request->all(), [
            'id' => 'required|numeric'
        ]);
        if ($validator->fails()) {
            return;
        }



        try {
            $adh = User::find($request->id);
            $salle = $user->salle;
            if ($salle->adherant_id === $request->id && $adh->hasRole('Adherant')) {

            }

        } catch (Exception $th) {

        }

    }


    public function AddLogo(Request $request)
    {
        $user = $request->user();


        if (!$user->hasrole('Gerant')) {
            return response()->json([
                'message' => 'vos droit sont restreint'
            ], 401);
        }
        $validator = Validator::make($request->all(), [
            'logo' => 'required|image|mimes:jpg,png,jpeg'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'le format doit etre respcter'
            ]);
        }

        try {
            $rectoName = 'logo_' . $user->id . uniqid() . '.' . $request->file('logo')->extension();

            $logopath = $request->file('logo')->storeAs('logo', $rectoName, 'minio');


            if (!$logopath) {
                throw new Exception('Échec de l’upload des documents');
            }
            $salle = $user->salle;
            $salle->logo_salle = Storage::disk('minio')->url($logopath);
            $salle->save();

            return response()->json([
                'image' => 'logo ajouter avec succes',
                'url' => $user->logo
            ]);

        } catch (Exception $th) {
            return response()->json([
                'message' => 'une erreur est survenue'
            ]);
        }

    }




    public function EditLogo(Request $request)
    {
        $user = $request->user();

        if (!$user->hasRole('Gerant')) {
            return response()->json([
                'message' => 'vos droits sont restreints'
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'logo' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first()
            ], 400);
        }

        $salle = $user->salle;

        if (!$salle) {
            return response()->json([
                'message' => 'aucune salle associée'
            ], 404);
        }

        try {

            if ($salle->logo_salle) {
                $bucket = config('filesystems.disks.minio.bucket');

                $path = parse_url($salle->logo_salle, PHP_URL_PATH);
                $path = ltrim($path, "/{$bucket}/");

                if (Storage::disk('minio')->exists($path)) {
                    Storage::disk('minio')->delete($path);
                }
            }


            $newPath = $request->file('logo')
                ->store('logos', 'minio');


            $salle->logo_salle = Storage::disk('minio')->url($newPath);
            $salle->save();

            return response()->json([
                'message' => 'logo modifié avec succès',
                'logo' => $salle->logo_salle
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'erreur lors de la modification du logo'
            ], 500);
        }
    }


    public function DeleteLogo(Request $request)
    {

        $user = $request->user();

        DB::beginTransaction();
        try {
            $salle = $user->salle;
            if ($salle->logo_salle) {
                $bucket = config('filesystems.disks.minio.bucket');

                $path = parse_url($salle->logo_salle, PHP_URL_PATH);
                $path = ltrim($path, "/{$bucket}/");

                if (Storage::disk('minio')->exists($path)) {
                    Storage::disk('minio')->delete($path);
                }
            }

            $salle->logo_salle = null;
            $salle->save();
            DB::commit();

            return response()->json([
                'message' => 'votre logo a ete supprimer'
            ], 200);



        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'une erreur est survenue'
            ], 500);
        }
    }

    public function Mesfacutures(Request $request)
    {
        $user = $request->user();
        if (!$user->hasrole('')) {
            return response()->json([
                'message' => 'non autoriser'
            ]);
        }
        $validator = Validator::make($request->all(), [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
            ], 400);
        }

        try {

            $salle = $user->salle;

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

            $facuture = facture::where('salle_id', $salle->id)->where('adherant_id', $request->id)->get();
            if (!$facuture) {
                return response()->json([
                    'message' => ' vous n\'avez pas encore de facture'
                ], 404);
            }

            return response()->json([
                'factures' => $facuture
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }
    }

    public function DeleteAdherent(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
            ], 400);
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

            $adh->delete();
            DB::commit();
            return response()->json([
                'message' => 'cet utilisateur a ete supprime'
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    public function UpdateAdherent(Request $request)
    {

        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'telephone' => 'required|string',
            'email' => 'required|email'

        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
            ], 400);
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

            $adh->update([
                'name' => $request->nom ?? $adh->name,
                'prenom' => $request->prenom ?? $adh->prenom,
                'email' => $request->email ?? $adh->email,
                'telephone' => $request->telephone ?? $adh->telephone
            ]);
            DB::commit();
            return response()->json([
                'message' => 'les donnees de cet adherents ont ete modifier '
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

        }

    }


    public function CachetSigner(Request $request)
    {
        $user = $request->user();


        // if (!$user->hasrole('Gerant')) {
        //     return response()->json([
        //         'message' => 'vos droit sont restreint'
        //     ], 401);
        // }
        $validator = Validator::make($request->all(), [
            'cachet' => 'required|image|mimes:jpg,png,jpeg'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'le format doit etre respcter'
            ]);
        }

        try {
            $rectoName = 'cachet_' . $user->id . uniqid() . '.' . $request->file('cachet')->extension();

            $cachetpath = $request->file('cachet')->storeAs('logo', $rectoName, 'minio');


            if (!$cachetpath) {
                throw new Exception('Échec de l’upload des documents');
            }
            $salle = $user->salle;
            $salle->cachet_signer = Storage::disk('minio')->url($cachetpath);
            $salle->save();

            return response()->json([
                'image' => 'cachet ajouter avec succes',
                'url' => $user->logo
            ]);

        } catch (Exception $th) {
            return response()->json([
                'message' => 'une erreur est survenue'
            ]);
        }

    }


    public function Deletecachet(Request $request)
    {

        $user = $request->user();

        DB::beginTransaction();
        try {
            $salle = $user->salle;
            if ($salle->cachet_signer) {
                $bucket = config('filesystems.disks.minio.bucket');

                $path = parse_url($salle->cachet_signer, PHP_URL_PATH);
                $path = ltrim($path, "/{$bucket}/");

                if (Storage::disk('minio')->exists($path)) {
                    Storage::disk('minio')->delete($path);
                }
            }

            $salle->cachet_signer = null;
            $salle->save();
            DB::commit();

            return response()->json([
                'message' => 'votre logo a ete supprimer'
            ], 200);



        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'une erreur est survenue'
            ], 500);
        }
    }



    public function EditCachet(Request $request)
    {
        $user = $request->user();

        if (!$user->hasRole('Gerant')) {
            return response()->json([
                'message' => 'vos droits sont restreints'
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'cachet' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first()
            ], 400);
        }

        $salle = $user->salle;

        if (!$salle) {
            return response()->json([
                'message' => 'aucune salle associée'
            ], 404);
        }

        try {

            if ($salle->cachet_signer) {
                $bucket = config('filesystems.disks.minio.bucket');

                $path = parse_url($salle->cachet_signer, PHP_URL_PATH);
                $path = ltrim($path, "/{$bucket}/");

                if (Storage::disk('minio')->exists($path)) {
                    Storage::disk('minio')->delete($path);
                }
            }


            $newPath = $request->file('cachet')
                ->store('logos', 'minio');


            $salle->cachet_signer = Storage::disk('minio')->url($newPath);
            $salle->save();

            return response()->json([
                'message' => 'logo modifié avec succès',
                'logo' => $salle->cachet_signer
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'erreur lors de la modification du logo'
            ], 500);
        }
    }

    // c'est une methode de test apres on va ajouter les moyens de paienents
    public function Mettre_a_Niveau(Request $request)
    {
        $user = $request->user();

        DB::beginTransaction();

        try {
            $paiemnt = $user->dernierPaiementReussi;

            if (!$paiemnt) {
                return response()->json([
                    'message' => 'aucun paiement trouvé'
                ], 404);
            }

            $lim = $paiemnt->limit;
            $forfait = strtolower($paiemnt->plan);

            // seuils par forfait
            $tab = [
                'standard' => [190, 200],
                'pro' => [900, 1000],
            ];


            if ($forfait === 'premium') {
                return response()->json([
                    'message' => 'deja a niveau'
                ], 400);
            }


            if (!isset($tab[$forfait])) {
                return response()->json([
                    'message' => 'forfait invalide'
                ], 400);
            }


            $nouvelleLimite = $lim;

            if (!in_array($nouvelleLimite, $tab[$forfait])) {
                return response()->json([
                    'message' => 'vous avez encore une limite suffisante',
                    'niv' => self::$majniveau,
                    'limit' => $lim
                ], 409);
            }

            if (in_array($forfait, $this->limit)) {
                return response()->json([
                    'message' => 'vous avez besoin de vous reabonner'
                ], 403);
            }

            switch (strtolower($forfait)) {
                case 'pro':
                    $paiemnt->limit = intdiv($lim, 10);
                    break;

                case 'standard':
                    $paiemnt->limit = intdiv($lim, 20);
                    break;
            }

            $paiemnt->save();


            $montant = $paiemnt->montant / 0.25;

            DB::commit();

            return response()->json([
                'message' => 'votre abonnement a ete mis a jour',
                'message2' => 'vous pouvez prendre de nouveaux adherents',
                'montant' => $montant
            ], 200);

        } catch (Exception $e) {

            DB::rollBack();

            return response()->json([
                'message' => 'une erreur est survenue',
                'msg' => $e->getMessage()
            ], 500);
        }
    }


}
