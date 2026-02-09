<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class skills extends Model
{
    protected $table = 'skills';
    protected $fillable =[
        'coach_id','comptence'
    ];

    public function Coach():BelongsTo{
        return $this->belongsTo(coach::class);
    }

    public function GetCompetenceAtrribute($value){
        return ucfirst($value);
    }
}
