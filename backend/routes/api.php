<?php

use App\Http\Controllers\CoursController;
use App\Http\Controllers\ProgramerCoursController;
use Aws\Middleware;
use App\Exports\UserExport;
use Illuminate\Http\Request;
use App\Http\Middleware\paiementMid;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CoachController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\GerantController;
use App\Http\Controllers\DepensesController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\YengaPayController;
use App\Http\Controllers\ActivitesController;
use App\Http\Controllers\AbonnementController;

Route::post('/login', [AuthController::class, 'Login']);
Route::post('/infos-perso', [AuthController::class, 'Register']);
Route::post('/forgot-password', [AuthController::class, 'sendLink']);
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');
Route::post('/accueil-form', [AuthController::class, 'demo']);
Route::get('/pays', [AuthController::class, 'PaysList']);
Route::post('/ville-pays', [AuthController::class, 'RegionVille']);


Route::middleware(['auth:sanctum'])->group(function () {
  Route::middleware('isGerant')->group(function () {
    Route::post('/validation-email', [AuthController::class, 'VerifieEmail']);
    Route::post('/payment-process', [YengaPayController::class, 'charge']);
    Route::post('/payment-otp', [YengaPayController::class, 'chargeOtp']);

    Route::get('/mes-infos', [UserController::class, 'mesInfo']);
    Route::put('/update-password', [UserController::class, 'UpdateMdp']);
    Route::put('/update-prix', [UserController::class, 'UpdatePrix']);
    Route::put('/update-infos-perso', [UserController::class, 'UpdateUser']);
    Route::delete('/delete-info', [UserController::class, 'deleteprix']);
    Route::post('/ajouter-mes-prix', [UserController::class, 'AddSallePrix']);
    Route::get('/mes-prix', [UserController::class, 'SallePrix'])->middleware('paiement');
    Route::post('/ajouter-adherant', [UserController::class, 'AjouterAdherant']);
    Route::post('/update-adherant', [UserController::class, 'UpdateAdherent']);
    Route::get('/plan-choisit', [UserController::class, 'PlanChoisit']);
    Route::post('/mis-niveau', [UserController::class, 'Mettre_a_Niveau']);
    Route::post('/ajouter-logo', [UserController::class, 'AddLogo']);
    Route::post('/delete-logo', [UserController::class, 'DeleteLogo']);
    Route::post('/update-logo', [UserController::class, 'EditLogo']);

    Route::delete('/delete-adherant', [UserController::class, 'DeleteAdherent']);


    //acitive 
    Route::post('/info-activite', [ActivitesController::class, 'createActivity']);
    Route::delete('/delete-activite', [ActivitesController::class, 'DeletedActivity']);
    // definitions des prix


    //gestion des gerants


    Route::get('/mes-adherant', [HomeController::class, 'MesAdherants']);
    Route::get('/nbr-adherant', [HomeController::class, 'NbreAdherant']);
    Route::get('/nbr-adherant-actif', [HomeController::class, 'AdherantActif']);
    Route::get('/bientot-expirer', [HomeController::class, 'BientotExpirer']);
    Route::get('/expirer', [HomeController::class, 'AdherantExpirer']);


    // gestion des abonnements
    Route::post('/reabonner-adherant', [AbonnementController::class, 'reabonemment']);

    Route::post('/info-salle', [SalleController::class, 'AjouterSalle']);
    Route::put('/update-infos', [SalleController::class, 'updateSalle']);
    // Route::post('/payment', [PaiementController::class, 'simulation']);
    Route::post('/payment', [YengaPayController::class, 'payer']);


    /// les depenses et recettes 
    Route::get('/recette', [DepensesController::class, 'Recette']);
    Route::get('/mes-depenses', [DepensesController::class, 'MesDepenses']);
    Route::get('/mes-coach', [CoachController::class, 'mesCoach']);
    Route::get('/mes-cours', [CoursController::class, 'Mescours']);
    Route::middleware(['proprem'])->group(function () {

      Route::get('/export/users/{gerantId}', function ($gerantId) {

        return Excel::download(new UserExport($gerantId), 'users_gerant_' . $gerantId . '.xlsx');
      });
      Route::post('/test-sms', [HomeController::class, 'testSms']);

      Route::post('/programmer-cours', [ProgramerCoursController::class, 'ProgrammerCours']);
      Route::delete('/delete-cours', [CoursController::class, 'DeleteCours']);
      Route::put('/update-cours', [CoursController::class, 'UpdateCours']);
      Route::post('/ajouter-cours', [CoursController::class, 'AjouterCours']);
      Route::post('/suspendre-abonnement', [AbonnementController::class, 'SusprendreAbonnement']);
      Route::post('reactiver-abonnement', [AbonnementController::class, 'reactiverAbonnemnt']);
      Route::post('/ajouter-cachet', [UserController::class, 'CachetSigner']);
      Route::delete('/delete-cachet', [UserController::class, 'DeleteCachet']);
      Route::post('/update-cachet', [UserController::class, 'EditCachet']);
      Route::post('/ajouter-depense', [DepensesController::class, 'ajouterDepense']);
      Route::post('/ajouter-coach', [CoachController::class, 'AjouterCoach']);
      Route::delete('/delete-coach', [CoachController::class, 'DeleteCoach']);
      Route::put('/update-coach', [CoachController::class, 'UpdateCoach']);

    });

    Route::get('/mon-historique', [HomeController::class, 'ConnexionHistorique']);

    //  creer un middleware pour chaque les actions specifiques a chaque plan
  });
});




//pour gerant








