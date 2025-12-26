<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class salle extends Model
{
    protected $fillable = [
        'nom_salle',

        'pays_salle',

        "region_salle",

        "adresse_salle",

        "descriptions_salle",

        "logo_salle",

        "numero_salle",

        "email_salle",
        'gerant_id'

    ];




    // public function Gerant()
// {
//     return $this->belongsTo(Salle::class, 'gerant_id');
// }

    public function gerant()
    {
        return $this->belongsTo(User::class, 'gerant_id');
    }


    public function documents(){
        return $this->hasMany(Document::class,'salle_id','id');
    }

    public function adherents()
    {
        return $this->belongsToMany(User::class, 'adherent_salle', 'salle_id', 'adherent_id')
           ->with('abonnements')
            ->withTimestamps();
    }



public function adherentsActif()
{
    return $this->belongsToMany(User::class, 'adherent_salle', 'salle_id', 'adherent_id')
        ->whereHas('abonnements', function ($q) {
            $q->where('actif', 1);
        })
        ->with(['abonnements' => function ($q) {
            $q->where('actif', 1);
        }])
        ->withTimestamps();
}


        public function adherentsExpirer()
    {
        return $this->belongsToMany(User::class, 'adherent_salle', 'salle_id', 'adherent_id')
             ->with(['abonnements',fn($q)=>$q->where('actif',false)])
            ->withTimestamps();
    }

}
