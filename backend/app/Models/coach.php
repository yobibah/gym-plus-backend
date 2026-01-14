<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class coach extends Model
{
    protected $table="coach";

    protected $fillable=[
        'nom','prenom','telephone','salle_id'
    ];

    protected $casts =[
        'skills'=>'array'
    ];

       public function coachsalle()
    {
        return $this->belongsToMany(
            Salle::class,
            'coach_salle',
            'coach_id',
            'salle_id'
        )
            ->withTimestamps();
    }


    // public function getSkillsAttribute($value){
    //     return $this->toJson($value);
    // }
}

