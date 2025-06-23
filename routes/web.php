<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UnitController;
use App\Http\Controllers\Admin\FungsionalController; // Added
use App\Http\Controllers\Admin\PegawaiIkatanController; // Added
use App\Http\Controllers\Admin\PegawaiJenisController; // Added
use App\Http\Controllers\Admin\PegawaiController; // Added
use App\Http\Controllers\Admin\JabatanController;
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
        Route::resource('fungsionals', FungsionalController::class)->except(['show', 'create', 'edit']); // Added
        Route::resource('pegawai-ikatan', PegawaiIkatanController::class)->except(['show', 'create', 'edit']); // Added
        Route::resource('pegawai-jenis', PegawaiJenisController::class)->except(['show', 'create', 'edit']); // Added
        Route::resource('jabatan', JabatanController::class)->except(['show']); // Allowing create and edit for Jabatan
        Route::resource('pegawai', PegawaiController::class); // Added
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
