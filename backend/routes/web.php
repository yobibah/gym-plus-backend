<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\YengaPayController;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/basic-pdf',  function  ()  {
	$pdf =  App::make('dompdf.wrapper');
	$pdf->loadHTML('<h1>Hello, DomPDF in Laravel!</h1>');
	return  $pdf->stream();
});
// Route::get('/paiement/success', [YengaPayController::class, 'success'])->name('paiement.success');
Route::get('/paiement/success', [YengaPayController::class, 'success'])
    ->name('paiement.success');
    Route::get('/paiement/cancel', [YengaPayController::class, 'cancel'])->name('paiement.cancel');