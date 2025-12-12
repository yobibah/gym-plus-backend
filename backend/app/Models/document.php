<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class document extends Model
{
    protected $fillable = [
        "numero_identite",

        "recto",

        "verso",

        "status",

        "salle_id",

        "date_soumission",

        "date_verification",
    ];






    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function salle(){
        return $this->hasMany(salle::class,'salle_id');
    }
}
