<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Page login (GET)
Route::get('/login', fn() => Inertia::render('Login'))
    ->name('login')
    ->middleware('guest');

// Traitement login (POST)
Route::post('/login', [AdminController::class, 'login'])
    ->middleware('guest');

// Déconnexion
Route::post('/logout', [AdminController::class, 'logout'])
    ->name('logout')
    ->middleware('auth');

// Dashboard protégé
Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
    ->middleware('auth')
    ->name('dashboard');

Route::get('/dashboard', [AdminController::class, 'dashboard'])
    ->middleware('auth')
    ->name('dashboard');

    Route::get('/paiements', [AdminController::class, 'paiements'])
    ->middleware('auth')
    ->name('paiements');


    Route::get('/gerants', [AdminController::class, 'Gerant'])
    ->middleware('auth')
    ->name('gerants');

    Route::middleware(['auth'])->group(function () {

  
        Route::get('/gerants', [AdminController::class, 'Gerant'])->name('gerants.index');
        Route::get('/gerants/{id}', [AdminController::class, 'show'])->name('gerants.show');
        Route::delete('/gerants/{id}', [AdminController::class, 'destroy'])->name('gerants.destroy');
  

});
    Route::middleware('auth')->group(function () {
    Route::get('/salles',              [AdminController::class, 'salles'])->name('salles');
    Route::get('/salles/{id}',         [AdminController::class, 'showSalle'])->name('salles.show');
    Route::get('/salles/{id}/edit',    [AdminController::class, 'editSalle'])->name('salles.edit');
    Route::put('/salles/{id}',         [AdminController::class, 'updateSalle'])->name('salles.update');
    Route::post('/salles/{id}/toggle', [AdminController::class, 'toggleSalle'])->name('salles.toggle');
    Route::delete('/salles/{id}',      [AdminController::class, 'deleteSalle'])->name('salles.delete');

});
// Rediriger / vers login
Route::get('/', fn() => redirect()->route('login'));