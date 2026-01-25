<?php

use App\Console\Commands\Expirer;
use App\Http\Middleware\estGerant;
use App\Http\Middleware\paiementMid;
use App\Http\Middleware\premium;
use App\Http\Middleware\pro;
use App\Http\Middleware\proprem;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {

        $middleware->alias([
            'paiement' => paiementMid::class,
            'isGerant' => estGerant::class,
            'pro' => pro::class,
            'premium' => premium::class,
            'proprem'=>proprem::class
        ]);
    })
    ->withCommands([
        Expirer::class
    ])
    ->withExceptions(function (Exceptions $exceptions): void {

    })->create();
