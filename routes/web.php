<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UnitController;
use App\Http\Controllers\Admin\FungsionalController; // Added
use App\Http\Controllers\Admin\PegawaiIkatanController; // Added
use App\Http\Controllers\Admin\PegawaiJenisController; // Added
use App\Http\Controllers\Admin\PegawaiController; // Added
use App\Http\Controllers\Admin\JabatanController;
use App\Http\Controllers\RubrikController; // Added
use App\Http\Controllers\RubrikKategoriController; // Added
use App\Http\Controllers\RubrikRemunController; // Added
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
        Route::resource('pegawai', PegawaiController::class); // Added
        Route::resource('units', UnitController::class)->except(['show', 'create', 'edit']);
        Route::resource('fungsionals', FungsionalController::class)->except(['show', 'create', 'edit']); // Added
        Route::resource('pegawai-ikatan', PegawaiIkatanController::class)->except(['show', 'create', 'edit']); // Added
        Route::resource('pegawai-jenis', PegawaiJenisController::class)->except(['show', 'create', 'edit']); // Added
        Route::resource('jabatan', JabatanController::class)->except(['show']); // Allowing create and edit for Jabatan
        Route::resource('rubrik-remun', RubrikRemunController::class)->except(['show', 'create', 'edit']); // Added RubrikRemun
        Route::resource('rubrik-kategori', RubrikKategoriController::class)->except(['show']); // Added RubrikKategori
        Route::resource('rubrik', RubrikController::class); // Added Rubrik
    });

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
