<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GerantController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'Login']);
Route::post('/infos-perso', [AuthController::class, 'Register']);
Route::post('/forgot-password', [AuthController::class, 'sendLink']);
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');
Route::post('/accueil-form', [AuthController::class, 'demo']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/validation-email', [AuthController::class, 'VerifieEmail']);

    Route::post('/adherant', [UserController::class, 'AjouterAdherant']);
    Route::get('/plan-choisit', [UserController::class, 'PlanChoisit']);
     Route::get('/mes-adherant', [HomeController::class, 'MesAdherants']);
    
    Route::post('/info-salle', action: [SalleController::class, 'AjouterSalle']);
    Route::post('/payment', [PaiementController::class,'simulation']);

});





//pour gerant





;


