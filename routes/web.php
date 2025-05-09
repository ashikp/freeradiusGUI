<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RadiusClientController;
use App\Http\Controllers\UserGroupController;
use App\Http\Controllers\AuthenticationLogController;
use App\Http\Controllers\AuthenticationMethodController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DatabaseSettingController;
use App\Http\Controllers\FreeRadiusConfigController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Database Settings
    Route::resource('database-settings', DatabaseSettingController::class);
    Route::post('database-settings/{setting}/activate', [DatabaseSettingController::class, 'activate'])->name('database-settings.activate');

    // RADIUS Clients
    Route::resource('radius-clients', RadiusClientController::class);

    // User Groups
    Route::resource('user-groups', UserGroupController::class);

    // Authentication Logs
    Route::get('authentication-logs/export', [AuthenticationLogController::class, 'export'])
        ->name('authentication-logs.export');
    Route::resource('authentication-logs', AuthenticationLogController::class)
        ->only(['index', 'show']);

    // Authentication Methods
    Route::post('authentication-methods/update-priority', [AuthenticationMethodController::class, 'updatePriority'])
        ->name('authentication-methods.update-priority');
    Route::resource('authentication-methods', AuthenticationMethodController::class);

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // FreeRADIUS Configuration
    Route::get('free-radius-config', [FreeRadiusConfigController::class, 'index'])->name('free-radius-config.index');
    Route::put('free-radius-config', [FreeRadiusConfigController::class, 'update'])->name('free-radius-config.update');
});

require __DIR__.'/auth.php';
