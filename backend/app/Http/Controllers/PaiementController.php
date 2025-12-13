<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaiementController extends Controller
{
    public function simulation(Request $request){
        $current = $request->user();
        $validator = Validator::make($request->all() ,[
            "montant"=> "required",
        ]);
    }
}
