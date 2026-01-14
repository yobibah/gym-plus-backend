<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Expr\Cast;

class coach_salle extends Model
{
    protected $table ='coach_salle';

    protected $fillable  =[
        'salle_id','coach_id','date'
    ];

    protected $casts =[
        'date'=> 'datetime'
    ];
}
