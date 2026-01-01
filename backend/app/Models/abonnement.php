<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class abonnement extends Model
{
    protected $fillable = [
        "created_at",

        "updated_at",

        "transID",

        "plan",

        "montant",

        "debut",

        "fin",

        "adherant_id",

        "salle_id",
        "actif",
        "date_suspension"
    ];




    public function adherant()
    {
        return $this->belongsTo(User::class, 'adherant_id', 'id');
    }


    public static function VerifierAbonnement($adh_id,$salle_id){
       return  self::where( 'adherant_id',$adh_id)
                ->whereDate('fin','>=',Carbon::today())
                ->where('actif',1)
                ->where('salle_id',$salle_id)
                ->first();
    }

        public static function VerifierSuspendu($adh_id,$salle_id){
       return  self::where( 'adherant_id',$adh_id)
                ->whereDate('fin','>=',Carbon::today())
                ->where('actif',0)
                ->where('salle_id',$salle_id)
                ->first();
    }


}
