<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class activites extends Model
{
    use SoftDeletes, Notifiable;

    protected $fillable = [
        "nom_activite",

        "descriptions",

        "images_activte",

        "date_activite",

        "heure_activite",

        "status",

        "gerant_id",
    ];

    //

    public function Gerant(){
        return $this->belongsTo(User::class,'gerant_id');
    }
}
