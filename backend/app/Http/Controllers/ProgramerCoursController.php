<?php

namespace App\Http\Controllers;

use App\Models\ProgramerCours;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProgramerCoursController extends Controller
{
    // methode a redefinir pour se conformer
    public function ProgrammerCours(Request $request){
        $validator = Validator::make($request->all(),[
            'ahderent_id'=>'nullable|array',
            'all'=>'nullable',
            'cours_id'=>'nullable|array',
            'jours'=>'nullable|array',
            'horaire'=>'nullable|array',
            'permanent'=>'nullable',
            'prof_id'=>'required|array'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message'=>'veuillez remplir correctement les champs demandes'

            ],400);
        }

        try{
            if (!isset($request->all)){

            }

                   $count = count($request->jours);

        for ($i = 0; $i < $count; $i++) {
            ProgramerCours::create([
                'jour'    => $request->jours[$i],
                'horaire' => $request->horaire[$i],
                'cours_id'=> $request->cours_id[$i],
                'niveau'  => $request->niveau[$i],
                'prof_id' => $request->prof_id[$i],
            ]);
        }



        }
        catch(Exception $e){

        }


    }


}
         