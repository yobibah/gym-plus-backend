<?php
namespace App\Services;

use App\Models\User;

use App\Models\salle;
use App\Mail\sendOtpMail;
use App\Mail\LoginInformation;
use Illuminate\Support\Facades\Mail;

class Otp
{
    public $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /// generer le code otp
    public static function generete(): int
    {
        return rand(100000, 999999);
    }

    ///envoyer le code otp
    public function sendOTp()
    {
        $otp = self::generete();
        //recuperer l'utilisateur et voir si l'otp est la
        $gerant = User::where('email', $this->user->email)->first();

        if (
            Mail::to($this->user->email)->queue(
                new sendOtpMail($this->user, $otp)
            )
        ) {
            if ($gerant->exists() && $gerant->wasRecentlyCreated) {
                //je vais logger pour voir si ca fonctionne ou pas avant d'enregisrter
                $gerant->otp = $otp;
                $gerant->save();
            }

        }

    }


    ///verifier l'Otp

    public function verifierOtp(int $Otp): bool
    {
        return $this->user->otp === $Otp;
    }

    // envoyer le username et le mots de passe 
    public function sendLoginInformation(string $mdp)
    {

        $gerant = User::where('email', $this->user->email)->first();
        if ($gerant->exists()) {
            if (
                Mail::to($this->user->email)->queue(
                    new LoginInformation($gerant->username,$mdp)
                )
            ) {
                return response()->json([
                    'message'=>'indentifiant de connexion envoyer avec succes',
                    'status'=>true,
                    'code'=>200
                ]);


            }




        }
    }
}