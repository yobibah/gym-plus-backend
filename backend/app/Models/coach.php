<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class coach extends Model
{
    protected $table="coach";

    protected $fillable=[
        'nom','prenom','telephone','salle_id','skills'
    ];

    protected $casts =[
        'skills'=>'array'
    ];





    // public function getSkillsAttribute($value){
    //     return $this->toJson($value);
    // }
}

