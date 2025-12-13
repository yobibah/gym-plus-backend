<?php

namespace App\Http\Controllers;

use App\Models\historique;
use Auth;
use Exception;
use App\Models\User;
use App\Services\Otp;
use App\Models\gerant;
use App\Mail\demandeDemo;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Notifications\ResetPassword;

class AuthController extends Controller
{


    // register

    // verifions les informations de la salle ou du gerant d'abord
    public function Register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'nom' => 'required|string|min:2',
            'prenom' => 'required|string|min:2',
            'telephone' => 'required|min:8'
        ]);

        if ($validator->fails()) {
            Log::info($validator->errors()->all());

            return response()->json([
                'message' => 'veuillez saisir tous les champs demandés'
            ], 400);
        }


        $gerantExiste = User::where('email', $request->email)
            ->whereHas('roles', fn($q) => $q->where('name', 'Gerant'))
            ->exists();


        if ($gerantExiste) {
            return response()->json([
                'message' => 'cet adresse email est deja associe a un compte.'
            ], 400);
        }

        $mdp = (Str::random(10));
        $username = ($request->nom) . '_' . Str::random(6);
        $gerant = User::create([
            'email' => $request->email,
            'name' => $request->nom,
            'prenom' => $request->prenom,
            'telephone' => $request->telephone,
            'username' => $username,
            'password' => bcrypt($mdp),
        ]);


        $gerant->assignRole('Gerant');



        try {

            $otp = new Otp($gerant);
            $otp->sendOtp();
            // verifier l'email avant d'envoyer le login
           

            $token = $gerant->createToken('auth_token')->plainTextToken;
            $gerant->remember_token = $token;
            $gerant->save();


            return response()->json([
                'message1' => 'votre compte a été bien créé',
                'message2' => 'un code de validation a été envoyé dans votre boîte mail',
                'gerant' => [
                    'nom' => $gerant->name,
                    'prenom' => $gerant->prenom,
                    'email' => $gerant->email,
                    
                ],
                'token' => $gerant->remember_token ,
            ], 201);

        } catch (Exception $th) {
            return response()->json([
                'message' => 'Erreur lors de la création du compte.',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|min:6',
            'password' => 'required|string|min:8'
        ]);
        if ($validator->fails()) {

            return response()->json([
                'message' => 'veuillez remplir tous les champs demande'
            ], 400);
        }

        try {
            $credientials = $request->only('username', 'password');
            $gerant = User::whereHas('roles', fn($q) => $q->where('name', 'Gerant'))->where('username', $request->username)->first();
            
            if (!$gerant) {
                return response()->json([
                    'message' => 'aucun utilisateur associe a cet nom d\'utilisateur.',
                    'code' => 404
                ], 404);
            }
            if ($gerant->email_verified_at == null){
                      return response()->json([
                    'message' => 'votre compte n\'a pas ete verifier veuillez verifier.',
                    'code' => 401
                ], 401);
            }
            if (!Auth::attempt($credientials)) {
                return response()->json([

                    'message' => 'Identifient de connexion incorrect',
                    'code' => 401

                ], 401);
            }

            $token = $gerant->createToken('auth_token')->plainTextToken;
            $gerant = Auth::user();
            $gerant->remember_token = $token;
            $gerant->save();

            //recuperer le paiement (abonnement en cours pour le gerant)

            $paiement = $gerant->paiements()->where('fin', '>=', Carbon::now())->first();

            $data = [

                'id' => $gerant->id,
                'name' => $gerant->name,
                'prenom' => $gerant->prenom,
                'email' => $gerant->email,
                'abonnement' => $paiement ? $paiement : 'Aucun abonnement en cours de validite veuillez vous reabonner'
            ];

            historique::create([
                "date_connexion"=>Carbon::now(),
                "gerant_id"=>$gerant->id,
            ]);

            return response()->json([
                'message' => 'connexion reussi',
                'code' => 200,
                'user' => $data,
                'token' => $token,

            ], 200);

        } catch (Exception $th) {
            Log::info($th->getMessage());

        }
    }

    public function VerifieEmail(Request $request)
    {
        $current = $request->user();
        $otp = new Otp($current);
        $validator = Validator::make($request->all(), [
            'codeOtp' => 'required|max:6'

        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'remplir les champs avec les bonnes valeurs'

            ], 400);
        }
      if(  $otp->verifierOtp($request->codeOtp) ){
        
    $current->update(['email_verified' => Carbon::now()]);
      }
       if ($current->email_verified_at) {
          $mdp = (Str::random(10));
                $otp->sendLoginInformation($mdp);
                $current->update([
                    'password',$mdp,
                    'otp'=> null
            ]);
            }
          
        return response()->json([
            'message' => 'Votre code Otp a ete bien verifie'
        ], 200);

    }

    public function SendLink(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            Log::info($validator->fails());
            return response()->json([
                'message' => 'veuillez saisir un mail valide'
            ], 400);

        }
        // verifier et envoyer un lien de renitiallisation

        try {
            $gerant = User::where('email', $request->email)
                ->whereHas('roles', fn($q) => $q->where('name', 'Gerant'))
                ->exists();

                

            if (!$gerant) {
                return response()->json([
                    'message' => 'cet adresse email n\'est pas associe a un compte '
                ]);
            }

        $status = Password::sendResetLink($request->only(('email')));
        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'message' => 'un lien de recuperation a ete envoyer sur ' . $request->email,
            ], 200);
        }
        } catch (\Throwable $th) {
            Log::info($th->getMessage());

            return response()->json([
                'message'=> $th->getMessage()
                ], 500);
        }

    }




    public function resetpassword(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'password' => 'required',
            'token' => 'required',
            'email' => 'required|email'
        ]);



        if($validate->fails()){
            // Log::info('erreur liee au remplissage de champ :'.$validate->errors()->all());
            return response()->json([
                'message'=>$validate->errors()->all()
            ],400);
        }
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );
        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'mots de passe reinitiliser avec succes'
            ], 200);

        } else {
            return response()->json([
                'message' => 'le lien est invalide'
            ], 400);
        }
    }



    // envoi de mail de conntact pour demander u demo ou nous contacter seulement
    public function demo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'message' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'veuillez remplir les champs demande'
            ], 400);
        }

        try {

            if (Mail::to(env('ADMIN'))->queue(new demandeDemo($request->email, $request->message)))


                return response()->json([
                    'message' => 'votre demande a ete prise en compte nou vous enverrons un message de confirmation'
                ], 200);




        } catch (Exception $th) {
            return response()->json([
                'message' => 'une errreur est survenue'
            ], 500);
        }
    }
}
