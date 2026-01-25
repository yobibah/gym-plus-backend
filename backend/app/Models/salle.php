<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
        'gerant_id',
        "updated_at"

    ];




    // public function Gerant()
// {
//     return $this->belongsTo(Salle::class, 'gerant_id');
// }

    public function gerant():HasOne
    {
        return $this->HasOne(User::class, 'gerant_id');
    }


    public function documents(){
        return $this->hasMany(Document::class,'salle_id','id');
    }

    public function adherents()
    {
        return $this->belongsToMany(User::class, 'adherent_salle', 'salle_id', 'adherent_id')
            // ->withPivot(['date_inscription', 'statut'])
            ->withTimestamps();
    }

        public function coach()
    {
        return $this->belongsToMany(coach::class, 'coach_salle', 'salle_id', 'coach_id')
            // ->withPivot(['date_inscription', 'statut'])
            ->withTimestamps();
    }



    public function gerantIds()
{
    return $this->coach()->pluck('coach_salle.salle_id');
}


    public function adherentsActif()
    {
        return $this->belongsToMany(User::class, 'adherent_salle', 'salle_id', 'adherent_id')
            ->whereHas('abonnements', fn ($q)=>$q->where('actif',1))->get();
          
    }



    // public function Mensuel()
    // {
    //     return $this->belongsToMany(User::class, 'adherent_salle', 'salle_id', 'adherent_id')
    //         ->whereHas('abonnements', fn ($q)=>$q->where('plan','mensuel'))
    //         ->with()->get();
          
    // }



public function adherentsExpirer()
{
    return $this->belongsToMany(User::class, 'adherent_salle', 'salle_id', 'adherent_id')
        ->whereHas('abonnements', function ($q) {
            $q->where('actif', 0)
              ->whereDate('fin', '<', Carbon::today());
        })
        ->get();
}
    // abonnement bientot expirer

  

public function bientotExpirer()
{
  return $this->belongsToMany(User::class, 'adherent_salle', 'salle_id', 'adherent_id')
    ->whereHas('abonnements', function ($q) {
        $q->whereBetween('fin', [
                now()->startOfDay(),          
                now()->addDays(7)->endOfDay() 
        ])
        

            ->where('actif', 1);
    })->with(['abonnements']);

}



}
