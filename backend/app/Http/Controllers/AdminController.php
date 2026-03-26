<?php

namespace App\Http\Controllers;

use App\Models\paiement;
use Exception;
use App\Models\User;
use App\Models\salle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    //
    public function createUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|in:gestionnaire,admin,super_admin',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        DB::beginTransaction();

        try {
            $user = User::create([
                'name' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            $user->assignRole($request->role);

            DB::commit();

            return redirect()->back()->with('success', 'Utilisateur créé avec succès');
        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function LoginView()
    {
        return view('admin.auth.login');
    }

public function login(Request $request)
{
    $credentials = $request->validate([
        'email'    => 'required|email',
        'password' => 'required|min:7',
    ]);

    if (Auth::attempt($credentials, $request->boolean('remember'))) {
        $request->session()->regenerate();
        
        return redirect()->intended(route('dashboard'));
    }

    return back()->withErrors([
        'email' => 'Email ou mot de passe incorrect.',
    ])->onlyInput('email');
}

    public function AffecterNewRole(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|int',
            'role' => 'required|in:gestionnaire,admin,super_admin',
        ]);

        try {
            $user = User::findOrFail($request->id);
            $tab = [
                'gestionnaire',
                'admin',
                'super_admin',
            ];

            if (!in_array($user->id, $tab)) {
                return with(['error' => 'une erreur est survenue']);
            }
            $user->syncRoles([$request->role]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }
    }


    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }

public function dashboard()
{
    // Salles
    $salles = Salle::withCount('adherents')->get();
    $sallesActive   = $salles->where('active', 1)->count();
    $sallesInactive = $salles->where('active', 0)->count();

    // Membres adherants
    $totalAdherants = User::whereHas('roles', fn($q) =>
        $q->where('name', 'Adherant')
    )->count();

    // Adherants par salle (pour le chart)
    $adherantsParSalle = $salles->map(fn($salle) => [
        'name'  => $salle->name,
        'count' => $salle->adherents_count,
    ]);

    return Inertia::render('Dashboard', [
        'stats' => [
            'sallesActive'   => $sallesActive,
            'sallesInactive' => $sallesInactive,
            'totalSalles'    => $salles->count(),
            'totalAdherants' => $totalAdherants,
        ],
        'adherantsParSalle' => $adherantsParSalle,
    ]);
    }

    public function paiements(Request $request)
{
    $query = Paiement::with('gerant');

    // Filtre par statut
    if ($request->filled('status')) {
        $query->where('status', $request->status);
    }

    // Filtre par date début
    if ($request->filled('date_debut')) {
        $query->whereDate('debut', '>=', $request->date_debut);
    }

    // Filtre par date fin
    if ($request->filled('date_fin')) {
        $query->whereDate('fin', '<=', $request->date_fin);
    }

    // Filtre par plan
    if ($request->filled('plan')) {
        $query->where('plan', $request->plan);
    }

    $paiements = $query->latest()->paginate(10)->withQueryString();

    // Stats
    $tous     = paiement::all();
    $stats = [
        'total'    => $tous->sum('montant'),
        'paye'     => $tous->where('status', 'paye')->sum('montant'),
        'impaye'   => $tous->where('status', 'impaye')->sum('montant'),
        'count'    => $tous->count(),
    ];

    return Inertia::render('Paiements', [
        'paiements' => $paiements,
        'stats'     => $stats,
        'filters'   => $request->only(['status', 'date_debut', 'date_fin', 'plan']),
    ]);
}



public function salles(Request $request)
{
    $query = salle::with('gerant');

    // Filtre statut
    if ($request->filled('active')) {
        $query->where('active', $request->active);
    }

    // Recherche
    if ($request->filled('search')) {
        $query->where(function($q) use ($request) {
            $q->where('nom_salle', 'like', "%{$request->search}%")
              ->orWhere('email_salle', 'like', "%{$request->search}%")
              ->orWhere('pays_salle', 'like', "%{$request->search}%");
        });
    }

    $salles = $query->withCount('adherents')->latest()->paginate(10)->withQueryString();

    $stats = [
        'total'    => salle::count(),
        'active'   => salle::where('active', 1)->count(),
        'inactive' => salle::where('active', 0)->count(),
    ];

    return Inertia::render('Salles/Index', [
        'salles'  => $salles,
        'stats'   => $stats,
        'filters' => $request->only(['search', 'active']),
    ]);
}

// Afficher une salle
public function showSalle($id)
{
    $salle = salle::with(['gerant', 'adherents'])->findOrFail($id);

    return Inertia::render('Salles/Show', [
        'salle' => $salle,
    ]);
}

// Formulaire modification
public function editSalle($id)
{
    $salle = salle::findOrFail($id);

    return Inertia::render('Salles/Edit', [
        'salle' => $salle,
    ]);
}

// Sauvegarder modification
public function updateSalle(Request $request, $id)
{
    $salle = salle::findOrFail($id);

    $data = $request->validate([
        'nom_salle'          => 'required|string|max:255',
        'pays_salle'         => 'required|string',
        'region_salle'       => 'nullable|string',
        'adresse_salle'      => 'nullable|string',
        'descriptions_salle' => 'nullable|string',
        'numero_salle'       => 'nullable|string',
        'email_salle'        => 'nullable|email',
    ]);

    $salle->update($data);

    return redirect()->route('salles')->with('success', 'Salle mise à jour avec succès.');
}

// Suspendre / Activer une salle
public function toggleSalle($id)
{
    $salle = salle::findOrFail($id);
    $salle->update(['active' => !$salle->active]);

    $msg = $salle->active ? 'Salle activée.' : 'Salle suspendue.';
    return back()->with('success', $msg);
}



/// recuperer les gerans

public function Gerant(Request $request)
{
    $query = User::whereHas('roles', fn($q) => $q->where('name', 'Gerant'));

    // Filtre par nom/email
    if ($request->filled('search')) {
        $query->where(function($q) use ($request) {
            $q->where('name', 'like', '%' . $request->search . '%')
              ->orWhere('email', 'like', '%' . $request->search . '%');
        });
    }

    // Filtre par statut abonnement
    if ($request->filled('statut')) {
        $query->whereHas('paiements', function($q) use ($request) {
            $q->where('status', $request->statut);
        });
    }

    // Filtre par plan
    if ($request->filled('plan')) {
        $query->whereHas('paiements', function($q) use ($request) {
            $q->where('plan', $request->plan);
        });
    }

    $gerant = $query->with(['paiements' => function($q) {
        $q->latest()->limit(1); // dernier paiement
    }])->paginate(10)->withQueryString();

    return Inertia::render('Gerants', [
        'gerant'  => $gerant,
        'filters' => $request->only(['search', 'statut', 'plan']),
    ]);
}


}
