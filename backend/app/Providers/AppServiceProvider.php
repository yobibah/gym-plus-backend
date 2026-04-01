<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::before(function ($user, $ability) {
            return $user->hasRole('super_admin') ? true : null;
        });

        Carbon::setLocale('fr');

        // DB::listen(function ($query) {
        //     dump($query->sql);
        //     dump($query->bindings);
        //     dump($query->time);
        // });

    //      RateLimiter::for('api', function (Request $request) {
    //     return $request->user()
    //         ? Limit::perMinute(100)->by($request->user()->id) // Auth users
    //         : Limit::perMinute(10)->by($request->ip());      // Guests
    // });
    }
}
