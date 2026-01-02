<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\salle;
use App\Notifications\CustomResetPassword;
use App\Services\Activity;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasPermissions;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, HasPermissions, HasApiTokens;
    // protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $fillable = [
        'name',
        'email',
        'password',
        'telephone',
        'username',
        'prenom',
        'email_verified_at',
        'otp'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }




    public function sendPasswordResetNotification($token)
    {
        $this->notify(new CustomResetPassword($token));
    }


    public function salle(): HasOne
    {
        // if (!$this->hasRole('Gerant')) {
        //     throw new HttpResponseException(
        //         response()->json([
        //             'message' => 'Vous n\'êtes pas autorisé'
        //         ], 401)
        //     );
        // }
        return $this->HasOne(Salle::class, 'gerant_id', 'id');
    }


    //salle avec adherant
    public function salles()
    {
        return $this->belongsToMany(Salle::class, 'adherent_salle', 'adherent_id', 'salle_id')
            ->withPivot(['date_inscription', 'statut'])
            ->withTimestamps();
    }







    // pour le gerant
    public function paiements(): HasMany
    {
        // if (!$this->hasRole('Gerant')) {
        //     throw new HttpResponseException(
        //         response()->json([
        //             'message' => 'Vous n\'êtes pas autorisé'
        //         ], 401)
        //     );
        // }

        return $this->hasMany(paiement::class, 'gerant_id', 'id');
    }
    // public function paiements()
// {
//     return $this->hasMany(paiement::class, 'gerant_id');
// }

    public function document(): HasMany
    {
        return $this->hasMany(document::class, 'gerant_id');
    }


    public function historique()
    {
        return $this->hasMany(historique::class, 'gerant_id');

    }

    public function historique_Mdp()
    {
        return $this->hasMany(HistoriqueMdp::class, 'gerant_id');
    }

    // Espace adherant ici je vais declarer tte les methodes lier a l'adherant

    /// pour l'adherant 

    public function abonnements(): HasMany
    {

        return $this->hasMany(abonnement::class, 'adherant_id');
    }


    // recuperer avec le dernier abonnement peut importe si ces expirer ou a jour
    public function dernierAbonnement()
    {
        return $this->hasOne(abonnement::class, 'adherant_id')

            ->latestOfMany('fin');
    }

    public function dernierAbonnementReussi()
    {
        return $this->hasOne(abonnement::class, 'adherant_id')
            ->where('actif', 1)
            ->where('fin', '>=', Carbon::today())
            ->latestOfMany('fin');
    }


    public function DernierPaiement()
    {
        return $this->hasOne(paiement::class, 'gerant_id')->latestOfMany('fin');
    }

    public function dernierPaiementReussi(): HasOne
    {
        return $this->hasOne(paiement::class, 'gerant_id')
            ->where('status', 'reussi')->where('fin', '>=', Carbon::now())
            ->latestOfMany('fin');
    }

    public function Activites()
    {
        return $this->hasMany(Activites::class, 'gerant_id');
    }


    public function salleprix(): HasOne
    {
        return $this->hasOne(salleprix::class, 'gerant_id');
    }


    protected function activityByID($id)
    {
        return $this->Activites()->where('id', $id)->first();
    }

    public function Aherantsalles()
    {
        return $this->belongsToMany(
            Salle::class,
            'salle_adherant',
            'adherant_id',
            'salle_id'
        )
            ->withTimestamps();
    }

    public function dernierAbonnementExpirer()
    {
        return $this->hasOne(abonnement::class, 'adherant_id')
            ->where('actif', 0)
            ->where('fin', '<', Carbon::today())
            ->latestOfMany('fin');
    }

    public function facture()
    {
        return $this->hasMany(facture::class, 'adherant_id');
    }


}
