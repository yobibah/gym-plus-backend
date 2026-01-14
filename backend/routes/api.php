<?php

use App\Http\Controllers\AbonnementController;
use App\Http\Controllers\CoachController;
use App\Http\Controllers\DepensesController;
use Aws\Middleware;
use Illuminate\Http\Request;
use App\Http\Middleware\paiementMid;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\GerantController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\ActivitesController;

Route::post('/login', [AuthController::class, 'Login']);
Route::post('/infos-perso', [AuthController::class, 'Register']);
Route::post('/forgot-password', [AuthController::class, 'sendLink']);
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');
Route::post('/accueil-form', [AuthController::class, 'demo']);

Route::middleware(['auth:sanctum'])->group(function () {
  Route::middleware('isGerant')->group(function () {
    Route::post('/validation-email', [AuthController::class, 'VerifieEmail']);

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
    Route::post('/ajouter-logo', [UserController::class, 'Addlogo']);
    Route::post('/delete-logo', [UserController::class, 'deleteLogo']);
    Route::post('/update-logo', [UserController::class, 'EditLogo']);
    Route::post('/ajouter-cachet', [UserController::class, 'CachetSigner']);
     Route::post('/delete-cachet', [UserController::class, 'deleteCachet']);
    Route::delete('/delete-adherant', [UserController::class, 'DeleteAdherent']);
      Route::post('/update-cachet', [UserController::class, 'EditCachet']);
    
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
    Route::post('/payment', [PaiementController::class, 'simulation']);

    /// les depenses et recettes 
    Route::get('/recette', [DepensesController::class, 'Recette']);
    Route::get('/mes-depenses', [DepensesController::class, 'MesDepenses']);
    Route::get('/mes-coach', [CoachController::class, 'mesCoach']);
    Route::middleware(['premium'])->group(function () {
      Route::post('/suspendre-abonnement', [AbonnementController::class, 'SusprendreAbonnement']);
      Route::post('reactiver-abonnement', [AbonnementController::class, 'reactiverAbonnemnt']);

      Route::post('/ajouter-depense', [DepensesController::class, 'ajouterDepense']);
      Route::post('/ajouter-coach', [CoachController::class, 'AjouterCoach']);

    });

    Route::get('/mon-historique',[HomeController::class,'ConnexionHistorique']);

    //  creer un middleware pour chaque les actions specifiques a chaque plan
  });
});





//pour gerant








