<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class paiement extends Model
{
    protected $fillable=[
        
    ]; 

public function gerant()
{
    return $this->belongsTo(User::class, 'gerant_id', 'id');
}



}
