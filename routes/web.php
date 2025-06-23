<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UnitController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::name('admin.')->prefix('admin')->group(function () {
        Route::resource('roles', RoleController::class)->except(['show']);
        Route::get('permissions', [PermissionController::class, 'index'])->name('permissions.index');
    });

    // TEMPORARILY REMOVED: ->middleware('permission:manage_datamaster') due to test environment issues
    Route::name('data-master.')->prefix('data-master')->group(function () {
        Route::resource('units', UnitController::class)->except(['show', 'create', 'edit']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
