<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class cours extends Model
{
    protected $fillable=[
        'nom_cours',
        'salle_id',
        'niveaux',
    ];

    public function GetNomCoursAttribute($value){
        return ucfirst($value);
    }

    public function GetNiveauxAttribute($value){
        return ucfirst($value);
    }


}
