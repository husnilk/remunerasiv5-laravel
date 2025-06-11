<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('admin/roles', RoleController::class)->except(['show']);
    Route::get('admin/permissions', [PermissionController::class, 'index'])->name('admin.permissions.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
