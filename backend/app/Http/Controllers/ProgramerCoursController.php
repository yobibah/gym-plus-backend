<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProgrammerCoursRessource;
use App\Models\ProgramerCours;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;


class ProgramerCoursController extends Controller
{
    // methode a redefinir pour se conformer
    public function ProgrammerCours(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'ahderent_id' => 'required|array',
            'cours_id' => 'required|exists:cours,id',
            'jours' => 'required|array',
            'horaire' => 'required|array',
            'prof_id' => 'required|exists:coach,id'
        ]);


        if ($validator->fails()) {
            return response()->json([
                'message' => 'Veuillez remplir correctement les champs demandés',
                'errors' => $validator->errors()
            ], 400);
        }

        DB::beginTransaction();

        try {

            // je vais devoir verifier l'existence de chaque donnne et qu'il n'use pas dautre donnees


            $horaire = implode(',', $request->horaire);

            $jours = implode(',', $request->jours);
            $adh = implode(',', $request->ahderent_id);
            Log::info('horaire fusionné', ['horaire' => $horaire]);

            Cache::forget('cours_' . $user->id);

            ProgramerCours::forceCreate([
                'adherent_id' => $adh,
                'jours' => $jours,
                'horaire' => $horaire,
                'cours_id' => $request->cours_id,
                'coach_id' => $request->prof_id,
                'salle_id' => $user->salle->id,
                'permannent' => true
            ]);


            //          $jours = implode(',', $request->jours);
            // $horaire = implode(',', $request->horaire);

            // // Prépare les données pour l'insertion multiple
            // $data = array_map(function($adh) use ($jours, $horaire, $request, $user) {
            //     return [
            //         'adherent_id' => $adh,
            //         'jours'       => $jours,
            //         'horaire'     => $horaire,
            //         'cours_id'    => $request->cours_id,
            //         'coach_id'    => $request->prof_id,
            //         'salle_id'    => $user->salle->id,
            //         'permannent'  => true,
            //         'created_at'  => now(),
            //         'updated_at'  => now()
            //     ];
            // }, $request->ahderent_id);


            DB::commit();

            return response()->json([
                'message' => 'Cours programmé avec succès'
            ], 200);

        } catch (Exception $e) {
            DB::rollBack();

            Log::error($e);

            return response()->json([
                'message' => 'Erreur serveur',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function MesCoursProgrammer(Request $request)
    {
        $user = $request->user();

        try {
            $cours = ProgramerCours::where('salle_id', $user->salle->id)->get();
            

            if (!$cours) {
                return response()->json([
                    'message' => 'aucun cours programme pour l\'instant'
                ], 404);
            }


            return ProgrammerCoursRessource::collection($cours);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'une ereur est survenue'
            ], 500);
        }




    }
}
