<?php

use App\Http\Controllers\GerantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login',[GerantController::class,'Login']);
Route::post('/register',[GerantController::class,'Register']);
Route::post('/add-salle',[GerantController::class,'AddSalle']);

Route::middleware('auth:sanctum')->group(function (){

});