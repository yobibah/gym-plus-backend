<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GerantController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'Login']);
Route::post('/infos-perso', [AuthController::class, 'Register']);
Route::post('/forgot-password', [AuthController::class, 'sendLink']);
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');;


Route::middleware('auth:sanctum')->group(function () {
Route::post('/validation-email', [AuthController::class, 'VerifieEmail']);

    Route::post('/adherant', [UserController::class, 'AjouterAdherant']);
    Route::post('/info-salle', [SalleController::class, 'AjouterSalle']);

});





//pour gerant





;


