<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\salle;
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
        'prenom'
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




public function salles(): HasMany
{
     if (!$this->hasRole('Gerant')) {
            throw new HttpResponseException(
                response()->json([
                    'message' => 'Vous n\'êtes pas autorisé'
                ], 401)
            );
        }
    return $this->hasMany(Salle::class, 'gerant_id', 'id');
}








    // pour le gerant
    public function paiements(): HasMany
    {
        if (!$this->hasRole('Gerant')) {
            throw new HttpResponseException(
                response()->json([
                    'message' => 'Vous n\'êtes pas autorisé'
                ], 401)
            );
        }

        return $this->hasMany(paiement::class, 'gerant_id','id');
    }
    // public function paiements()
// {
//     return $this->hasMany(paiement::class, 'gerant_id');
// }

    public function document(): HasMany
    {
        return $this->hasRole('Gerant') ? $this->hasMany(document::class, 'gerant_id') : throw new HttpResponseException(
            response()->json([
                'message' => 'vous n\'ete pas autorise'
            ], 401)
        );
    }


    public function historique(){
        return $this->hasRole('Gerant') ? $this->hasMany(historique::class,'gerant_id') : throw new HttpResponseException( 
            response()->json([
                'message'=> ''
                ], 401)
                );

    }

        public function historique_Mdp(){
        return $this->hasRole('Gerant') ? $this->hasMany(HistoriqueMdp::class,'gerant_id') : throw new HttpResponseException( 
            response()->json([
                'message'=> ''
                ], 401)
                );

    }

    // Espace adherant ici je vais declarer tte les methodes lier a l'adherant

    /// pour l'adherant 

    public function Abonnement(): HasMany
    {
        if (!$this->hasRole('Adherant')) {
            throw new HttpResponseException(
                response()->json([
                    'message' => 'Vous n\'êtes pas autorisé'
                ], 401)
            );
        }

        return $this->hasMany(abonnement::class, 'adherant_id');
    }



}
