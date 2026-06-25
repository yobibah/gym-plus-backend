<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\paiement;
use App\Models\salle;
use App\Models\user;
use App\Services\SenfenicoService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    public function __construct(protected SenfenicoService $senfenico) {}

    /**
     * @OA\Post(
     *     path="/api/admin/users",
     *     summary="Créer un nouvel utilisateur",
     *     tags={"Admin"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nom","prenom","email","role","password"},
     *             @OA\Property(property="nom", type="string", maxLength=100),
     *             @OA\Property(property="prenom", type="string", maxLength=100),
     *             @OA\Property(property="email", type="string", format="email"),
     *             @OA\Property(property="role", type="string", enum={"gestionnaire","admin","super_admin"}),
     *             @OA\Property(property="password", type="string", minLength=8)
     *         )
     *     ),
     *     @OA\Response(response=201, description="Utilisateur créé avec succès"),
     *     @OA\Response(response=422, description="Erreur de validation")
     * )
     */
    public function createuser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|in:gestionnaire,admin,super_admin',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();

        try {
            $user = user::create([
                'name' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            $user->assignRole($request->role);

            DB::commit();

            return response()->json([
                'message' => 'Utilisateur créé avec succès',
                'user' => $user
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erreur lors de la création',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/admin/login",
     *     summary="Connexion administrateur",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", format="email"),
     *             @OA\Property(property="password", type="string", minLength=7),
     *             @OA\Property(property="remember", type="boolean")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Connexion réussie"),
     *     @OA\Response(response=401, description="Identifiants incorrects"),
     *     @OA\Response(response=403, description="Accès refusé")
     * )
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:7',
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            $user = Auth::user();

            if (!$user->hasRole('Admin')) {
                return response()->json([
                    'message' => 'Accès refusé. Vous n\'êtes pas admin.'
                ], 403);
            }

            return response()->json([
                'message' => 'Connexion réussie !',
                'user' => $user,
                'roles' => $user->getRoleNames()
            ]);
        }

        return response()->json([
            'message' => 'Email ou mot de passe incorrect.'
        ], 401);
    }

    /**
     * @OA\Post(
     *     path="/api/admin/logout",
     *     summary="Déconnexion",
     *     tags={"Auth"},
     *     @OA\Response(response=200, description="Déconnexion réussie")
     * )
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/admin/dashboard",
     *     summary="Tableau de bord",
     *     tags={"Admin"},
     *     @OA\Response(response=200, description="Statistiques du tableau de bord")
     * )
     */
    public function dashboard()
    {
        $salles = salle::withCount('adherents')->get();
        $sallesActive = $salles->where('active', 1)->count();
        $sallesInactive = $salles->where('active', 0)->count();
        $money = paiement::sum('montant');

        $totalAdherants = user::whereHas('roles', fn($q) =>
            $q->where('name', 'Adherant')
        )->count();

        $adherantsParsalle = $salles->map(fn($salle) => [
            'name' => $salle->name,
            'count' => $salle->adherents_count,
        ]);

        return response()->json([
            'stats' => [
                'sallesActive' => $sallesActive,
                'sallesInactive' => $sallesInactive,
                'totalsalles' => $salles->count(),
                'totalAdherants' => $totalAdherants,
                'totalmontantRecu' => $money
            ],
            'adherantsParsalle' => $adherantsParsalle
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/admin/paiements",
     *     summary="Liste des paiements",
     *     tags={"paiements"},
     *     @OA\Parameter(name="status", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="date_debut", in="query", @OA\Schema(type="string", format="date")),
     *     @OA\Parameter(name="date_fin", in="query", @OA\Schema(type="string", format="date")),
     *     @OA\Parameter(name="plan", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="page", in="query", @OA\Schema(type="integer"))
     * )
     */
    public function paiements(Request $request)
    {
        $query = paiement::with('gerant');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('date_debut')) {
            $query->whereDate('debut', '>=', $request->date_debut);
        }

        if ($request->filled('date_fin')) {
            $query->whereDate('fin', '<=', $request->date_fin);
        }

        if ($request->filled('plan')) {
            $query->where('plan', $request->plan);
        }

        $paiements = $query->latest()->paginate(10)->withQueryString();

        $tous = paiement::all();
        $stats = [
            'total' => $tous->sum('montant'),
            'paye' => $tous->where('status', 'paye')->sum('montant'),
            'impaye' => $tous->where('status', 'impaye')->sum('montant'),
            'count' => $tous->count(),
        ];

        return response()->json([
            'paiements' => $paiements,
            'stats' => $stats,
            'filters' => $request->only(['status', 'date_debut', 'date_fin', 'plan'])
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/admin/salles",
     *     summary="Liste des salles",
     *     tags={"salles"},
     *     @OA\Parameter(name="active", in="query", @OA\Schema(type="integer", enum={0,1})),
     *     @OA\Parameter(name="search", in="query", @OA\Schema(type="string"))
     * )
     */
    public function salles(Request $request)
    {
        $query = salle::with('gerant');

        if ($request->filled('active')) {
            $query->where('active', $request->active);
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nom_salle', 'like', "%{$request->search}%")
                    ->orWhere('email_salle', 'like', "%{$request->search}%")
                    ->orWhere('pays_salle', 'like', "%{$request->search}%");
            });
        }

        $salles = $query->withCount('adherents')->latest()->paginate(10)->withQueryString();

        $stats = [
            'total' => salle::count(),
            'active' => salle::where('active', 1)->count(),
            'inactive' => salle::where('active', 0)->count(),
        ];

        return response()->json([
            'salles' => $salles,
            'stats' => $stats,
            'filters' => $request->only(['search', 'active'])
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/admin/salles/{id}",
     *     summary="Afficher une salle",
     *     tags={"Salles"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer"))
     * )
     */
    public function showSalle($id)
    {
        $salle = Salle::with(['gerant', 'adherents'])->findOrFail($id);

        return response()->json(['salle' => $salle]);
    }

    /**
     * @OA\Put(
     *     path="/api/admin/salles/{id}",
     *     summary="Mettre à jour une salle",
     *     tags={"Salles"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="nom_salle", type="string"),
     *             @OA\Property(property="pays_salle", type="string"),
     *             @OA\Property(property="region_salle", type="string"),
     *             @OA\Property(property="adresse_salle", type="string"),
     *             @OA\Property(property="descriptions_salle", type="string"),
     *             @OA\Property(property="numero_salle", type="string"),
     *             @OA\Property(property="email_salle", type="string", format="email")
     *         )
     *     )
     * )
     */
    public function updateSalle(Request $request, $id)
    {
        $salle = Salle::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nom_salle' => 'required|string|max:255',
            'pays_salle' => 'required|string',
            'region_salle' => 'nullable|string',
            'adresse_salle' => 'nullable|string',
            'descriptions_salle' => 'nullable|string',
            'numero_salle' => 'nullable|string',
            'email_salle' => 'nullable|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        $salle->update($validator->validated());

        return response()->json([
            'message' => 'Salle mise à jour avec succès',
            'salle' => $salle
        ]);
    }

    /**
     * @OA\Patch(
     *     path="/api/admin/salles/{id}/toggle",
     *     summary="Activer/Désactiver une salle",
     *     tags={"Salles"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer"))
     * )
     */
    public function toggleSalle($id)
    {
        $salle = Salle::findOrFail($id);
        $salle->update(['active' => !$salle->active]);

        return response()->json([
            'message' => $salle->active ? 'Salle activée.' : 'Salle suspendue.',
            'active' => $salle->active
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/admin/gerants",
     *     summary="Liste des gérants",
     *     tags={"Gérants"},
     *     @OA\Parameter(name="search", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="statut", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="plan", in="query", @OA\Schema(type="string"))
     * )
     */
    public function Gerant(Request $request)
    {
        $query = user::whereHas('roles', fn($q) => $q->where('name', 'Gerant'));

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('statut')) {
            $query->whereHas('paiements', function ($q) use ($request) {
                $q->where('status', $request->statut);
            });
        }

        if ($request->filled('plan')) {
            $query->whereHas('paiements', function ($q) use ($request) {
                $q->where('plan', $request->plan);
            });
        }

        $gerants = $query->with(['paiements' => function ($q) {
            $q->latest()->limit(1);
        }])->paginate(10)->withQueryString();

        return response()->json([
            'gerants' => $gerants,
            'filters' => $request->only(['search', 'statut', 'plan'])
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/admin/membres",
     *     summary="Liste des membres",
     *     tags={"Membres"},
     *     @OA\Parameter(name="search", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="salle", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="statut", in="query", @OA\Schema(type="string"))
     * )
     */
    public function Membre(Request $request)
    {
        $query = user::query()
            ->whereHas('roles', fn($q) =>
                $q->where('name', 'Adherant')
            )
            ->with([
                'salles:id,nom_salle',
                'dernierAbonnement'
            ]);

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('email', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('salle')) {
            $query->whereHas('salles', function ($q) use ($request) {
                $q->where('nom_salle', 'like', "%{$request->salle}%");
            });
        }

        if ($request->filled('statut')) {
            $query->whereHas('salles', function ($q) use ($request) {
                $q->where('adherent_salle.statut', $request->statut);
            });
        }

        $membres = $query->latest()->paginate(10)->withQueryString();

        return response()->json([
            'membres' => $membres,
            'filters' => $request->only(['search', 'salle', 'statut'])
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/admin/reglement",
     *     summary="Effectuer un règlement",
     *     tags={"Règlements"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"montant"},
     *             @OA\Property(property="montant", type="integer")
     *         )
     *     )
     * )
     */
    public function Reglement(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'montant' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $response = $this->senfenico->Decharger((int) $request->montant);

            if ($response->status == true) {
                return response()->json([
                    'message' => $response->data->message ?? 'Règlement effectué avec succès',
                    'status' => $response->data->status ?? 'processing',
                    'reference' => $response->data->reference ?? null,
                    'montant' => $request->montant
                ], 201);
            }

            return response()->json([
                'message' => 'Erreur lors du règlement',
                'error' => $response->message ?? 'Erreur inconnue'
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erreur serveur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/admin/annuler",
     *     summary="Annuler un règlement",
     *     tags={"Règlements"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"reference"},
     *             @OA\Property(property="reference", type="string")
     *         )
     *     )
     * )
     */
    public function Annuler(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'reference' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $response = $this->senfenico->AnnulerRegelement($request->reference);
            
            if ($response->status != true) {
                return response()->json([
                    'message' => 'Une erreur est survenue lors de l\'annulation'
                ], 400);
            }

            return response()->json([
                'message' => 'Règlement annulé avec succès'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erreur serveur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/admin/profile",
     *     summary="Mettre à jour le profil",
     *     tags={"Admin"},
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             required={"id","nom","prenom"},
     *             @OA\Property(property="id", type="integer"),
     *             @OA\Property(property="nom", type="string"),
     *             @OA\Property(property="prenom", type="string"),
     *             @OA\Property(property="password", type="string", minLength=8)
     *         )
     *     )
     * )
     */
    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:users,id',
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'password' => 'nullable|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();

        try {
            $user = user::find($request->id);
            $user->name = $request->nom;
            $user->prenom = $request->prenom;
            
            if ($request->filled('password')) {
                $user->password = bcrypt($request->password);
            }
            
            $user->save();

            DB::commit();

            return response()->json([
                'message' => 'Profil mis à jour avec succès',
                'user' => $user
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erreur lors de la mise à jour',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}