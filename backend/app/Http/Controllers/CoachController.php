<?php

namespace App\Http\Controllers;

use App\Http\Resources\CoachRessource;
use App\Models\coach;
use App\Models\skills;
use Exception;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use League\Uri\Encoder;
use function PHPUnit\Framework\isEmpty;

class CoachController extends Controller
{

    // gerer , affecter ,les coach a un cours 
    // modifier,supprimer, un coach

    public function AjouterCoach(Request $request)
    {

        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'telephone' => 'required|string|min:8',
            'competence' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'les champs ne sont pas correctement remplis'
            ], 400);
        }

        DB::beginTransaction();
        try {
            $exist = coach::where('telephone', $request->telephone)->where('salle_id', $user->salle->id)->exists();

            if ($exist) {
                return response()->json([
                    'message' => 'cet numero est associer a un coach'
                ], 409);
            }

            // if (isEmpty($request->competence)){
            //     return response()->json([
            //         'message' => 'ajouter au moins une comptence'
            //     ], 400);
            // }


            $coach = coach::create([
                'nom' => strtolower($request->nom),
                'prenom' => strtolower($request->prenom),
                'telephone' => $request->telephone,
                'salle_id' => $user->salle->id,

            ]);

            if (is_array($request->competence)) {
                $skills = $request->competence;
                foreach ($skills as $skill) {
                    skills::create([
                        'coach_id' => $coach->id,
                        'comptence' => $skill
                    ]);
                }
            } else {
                skills::create([
                    'coach_id' => $coach->id,
                    'comptence' => $request->competence
                ]);
            }


            Cache::forget('coach_' . $user->id);

            DB::commit();
            return response()->json([
                'message' => 'coach ajouter a votre salle avec succes'
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'veuillez verifier les donnees saisies',
                'trace' => $e->getMessage() . ' ' . $e->getTraceAsString()
            ], 500);
        }
    }

    public function mesCoach(Request $request)
    {
        $user = $request->user();
        $coach = Cache::remember('coach_' . $user->id, now()->addMinutes(5), function () use ($user) {
            return $user->coach();
        });



        return response()->json([
            'coach' => CoachRessource::collection($coach),

        ]);

    }

    public function DeleteCoach(Request $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'veuillez remplir correctement les champs'
            ], 400);
        }


        try {
            DB::beginTransaction();
            $coach = coach::where('id', $request->id)->where('salle_id', $user->salle->id)->first();


            if (!$coach) {
                return response()->json([
                    'message' => 'coach n\'existe pas veuillez creer un nouveu coach'
                ], 404);
            }

            $coach->delete();
            Cache::forget('coach_' . $user->id);
            DB::commit();

            return response()->json([
                'message' => 'coach supprimer avec succes'
            ], 200);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                'message' => 'une erreu est survenue',
                'trace' => $e->getMessage() . ' ' . $e->getTraceAsString()
            ], 500);

        }
    }

    public function UpdateCoach(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'nom' => 'nullable|string',
            'prenom' => 'nullable|string',
            'telephone' => 'nullable|string|min:8',
            'competence' => 'nullable'

        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'champ "id" requis'
            ]);
        }

        $user = $request->user();

        try {
            $coach = coach::find($request->id);
            if (!$coach || $coach->salle_id != $user->salle->id) {
                return response()->json(
                    [
                        'message' => 'une erreur est survenue veuillez ressayer plus tard'
                    ],
                    404
                );
            }


            $coach->update([

                'nom' => $request->nom ?? $coach->nom,
                'prenom' => $request->prenom ?? $coach->prenom,
                'telephone' => $request->telephone ?? $coach->telephone
            ]);


            if (is_array($request->competence)) {
                $skills = $request->competence;
                foreach ($skills as $skill) {
                    skills::create([
                        'coach_id' => $coach->id,
                        'comptence' => $skill
                    ]);
                }
            } else {
                skills::create([
                    'coach_id' => $coach->id,
                    'comptence' => $request->competence
                ]);
            }
            DB::commit();


            return response()->json([

                'message' => 'coach modifier avec succes',



            ], 200);

        } catch (Exception $e) {
        }
    }


    public function affecterCoachCours(Request $request)
    {
        $user = $request->user();
        // un cours est avec des adherant precis 
        // le gerant selectionne le nombre d'haderant pour programmer a un cours precis
        // le coach doit etre disponible 
        // notifier le coach par sms ou par mail pour prendre par de sa disponibilte

        $validator = Validator::make($request->all(), [
            'id_adherent' => 'required|array|integer',
            'date' => 'required',
            'heure' => 'required',
            'coach_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'remplir tous les champs'
            ], 400);

        }

        try {
            $coach = coach::findOrFail($request->coach_id);

            // on recupere tous les cours et on verifie les coachs non libre




        } catch (Exception $e) {

        }

    }




    public function Skills(Request $request)
    {
        $user = $request->user();

        try {
            $skills = skills::whereHas('coach', function ($q) use ($user) {
                $q->where('salle_id', $user->salle->id);
            })
                ->distinct()
                ->pluck('comptence');


            return response()->json([
                'success' => true,
                'data' => $skills
            ]);

        } catch (\Throwable $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function DeleteSkills(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'competence_id' => "required",
            'coach_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'le id est requis pour effectuer toute operation'
            ]);
        }

        DB::beginTransaction();
        try {
            Cache::forget('coach_' . $user->id);

            $skills = skills::findOrFail($request->competence_id);

            if (!$skills || $skills?->coach_id != (int) $request->coach_id) {
                return response()->json([
                    'message' => 'Oups ! aucun skills trouvers'
                ], 409);
            }

            // passser a la phase de suppression des competences du coach

            $skills->delete();
            DB::commit();

            return response()->json([
                'message' => 'competence supprimer'
            ], 200);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Oups! une erreur est survenue lors de la suppression..'
            ], 500);
        }
    }

    public function AddSkills(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'coach_id' => 'required',
            'competence' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'les champs ne sont pas correctement renseigne..'
            ], 400);
        }
        DB::beginTransaction();
        try {
            $id = trim($request->coach_id, ' ');

            $coach = coach::findOrFail((int) $id);

            if (!$coach || $coach->salle_id != $user->salle->id) {
                return response()->json([
                    'message' => 'une erreur est survenue lors de la recherche du coach.'
                ], 409);
            }

            if (is_array($request->competence)) {
                $skills = $request->competence;
                foreach ($skills as $skill) {
                    skills::create([
                        'coach_id' => $coach->id,
                        'comptence' => $skill
                    ]);
                }
            } else {
                skills::create([
                    'coach_id' => $coach->id,
                    'comptence' => $request->competence
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'vous avez ajouter ajouter des competences a ce coach..'
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Oups !! une erreur est survenue'
            ], 500);

        }
    }

}
