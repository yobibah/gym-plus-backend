<?php

namespace App\Http\Controllers;

use App\Models\cours;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use function PHPUnit\Framework\isNull;

class CoursController extends Controller
{
    // programmer un cours 
    // modifier un cours 
    // supprimer un cours 
    // faire une liste d'absent ou d'admin en fonction des cours programmer les matin ou les soirs 
    // toutes presence et regularite dans le paiement aura droit a des points de fidelite 
    // imprimer le cours actuelle

    public function AjouterCours(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'cours' => 'required|string',
            'niveaux' => 'required|in:debutant,intermediaire,all'
        ]);

        if ($validator->fails()) {
            return response()->json(
                ['message' => 'veuillez remplir les champs'],
                400
            );
        }
        ;


        try {
            DB::beginTransaction();

            cours::create([
                'nom_cours' => $request->cours,
                'salle_id' => $user->salle->id,
                'niveaux' => $request->niveaux
            ]);

            DB::commit();
            Cache::forget('cours_' . $user->id);


            return response()->json([
                'message' => 'cours cree avec succes'
            ], 201);


        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'une erreur est survenue'
            ]);
        }
    }

    public function UpdateCours(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'cours' => 'nullable|string',
            'niveaux' => 'nullable|in:debutant,intermediaire,all'
        ]);

        if ($validator->fails()) {
            return response()->json(
                ['message' => 'Veuillez remplir correctement les champs', 'errors' => $validator->errors()],
                400
            );
        }

        try {
            DB::beginTransaction();

            $cours = Cours::find($request->id);

            if (!$cours || $cours->salle_id != $user->salle->id) {
                return response()->json(
                    ['message' => 'Cours non trouvé, veuillez réessayer'],
                    404
                );
            }

            $cours->update([
                'nom_cours' => $request->cours ?? $cours->nom_cours,
                'niveaux' => $request->niveaux ?? $cours->niveaux
            ]);

            DB::commit();
            Cache::forget(key: 'cours_' . $user->id);

            return response()->json([
                'message' => 'Ce cours vient d\'être modifié'
            ], 200);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Une erreur est survenue, veuillez réessayer : ' . $e->getMessage()
            ], 500);
        }
    }


    public function DeleteCours(Request $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(
                ['message' => 'veuillez remplir les champs'],
                400
            );
        }
        ;

        try {
            DB::beginTransaction();
            $cours = cours::find($request->id);

            if (!$cours || $cours->salle_id != $user->salle->id) {
                return response()->json(
                    ['message' => 'cours non trouver veuillez reessayer'],
                    404
                );
            }

            $cours->delete();

            DB::commit();
            Cache::forget('cours_' . $user->id);

            return response()->json([
                'message' => 'cet coours viens d\'etre retirer de la liste des cours'
            ], 200);


        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'une erreur est survenue veuillez ressayer'
            ], 500);

        }


    }


    public function Mescours(Request $request)
    {
        $user = $request->user();
        $salle = $user->salle;

        $cours = cours::where('salle_id', $salle->id)->paginate(10);
        

        if (!$cours) {
            return response()->json([
                'message' => 'vous n\'avez pas de cours veuillez creer'
            ], 404);
        }

        return response()->json([
            'cours' => $cours
        ]);
    }


}
