<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class coach extends Model
{
    protected $table="coach";

    protected $fillable=[
        'nom','prenom','telephone','salle_id'
    ];





    public function Skills():HasMany{
    return $this->hasMany(skills::class,'coach_id');
         
    }

    // public function getSkillsAttribute($value){
    //     return $this->toJson($value);
    // }
}

