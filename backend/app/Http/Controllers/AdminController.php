<?php

namespace App\Http\Controllers;


use Exception;
use App\Models\User;
use App\Models\salle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
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
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return redirect()->back()->with('error', 'Identifiants incorrects');
        }


        $request->session()->regenerate();

        return redirect()->route('admin.dashboard')
            ->with('success', 'Connexion réussie');
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
        }
        catch (Exception $e) {
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

    public function Dashboard(){
        // gestion des salles
        $salle = salle::all();
        $active = $salle->where('active',1)->count();
        $inactive = $salle->where('active',0)->count();
        $salleAdherant = $salle->adherents();

        // membres 

        $user = User::query();
        $user = $user->whereHas('role',fn($q)=> $q->where('name','Adherant'));




    }


}
