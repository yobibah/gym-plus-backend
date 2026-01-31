<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MembreController extends Controller
{
    public function AjouterMembre(Request $request){

        $user = $request->user();

        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'username' => 'required|string|min:2',
            'telephone' => 'required|min:8',
            'password'=>'required|min:8|confirmed'
            
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'les champs ne sont pas correctement remplis'
            ]);
        }


    }
}
