<?php

use App\Http\Controllers\Admin\FungsionalController;
use App\Http\Controllers\Admin\JabatanController;
use App\Http\Controllers\Admin\PegawaiController;
use App\Http\Controllers\Admin\PegawaiIkatanController;
use App\Http\Controllers\Admin\PegawaiJenisController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\RubrikController;
use App\Http\Controllers\Admin\RubrikKategoriController;
use App\Http\Controllers\Admin\RubrikRemunController;
use App\Http\Controllers\Admin\UnitController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\PeriodeController; // Added for Periode
use App\Http\Controllers\Admin\PegawaiJabatanController; // Added for PegawaiJabatan
use App\Http\Controllers\KontrakKinerjaController; // Added for KontrakKinerja
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Added
// Added
// Added
// Added
// Added
// Added
// Added
// Added for role switching

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

use App\Http\Controllers\Pegawai\PegawaiFungsionalController;

Route::middleware(['auth'])->group(function () {
    Route::apiResource('pegawai.fungsional', PegawaiFungsionalController::class);
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::post('/user/switch-role', [UserController::class, 'switchRole'])->name('user.switch-role');

    Route::name('admin.')->prefix('admin')->group(function () {
        Route::resource('roles', RoleController::class)->except(['show']);
        Route::get('permissions', [PermissionController::class, 'index'])->name('permissions.index');
        Route::resource('pegawai', PegawaiController::class);
        Route::resource('pegawai.pegawai-jabatan', PegawaiJabatanController::class)
            ->except(['index', 'show', 'edit', 'create'])
            ->shallow()
            ->names([
                'store' => 'pegawai.pegawai-jabatan.store',
                'update' => 'pegawai.pegawai-jabatan.update', // Explicitly naming to avoid conflict if any
                'destroy' => 'pegawai.pegawai-jabatan.destroy',
            ]);
        Route::resource('units', UnitController::class)->except(['show', 'create', 'edit']);
        Route::resource('fungsionals', FungsionalController::class)->except(['show', 'create', 'edit']); // Added
        Route::resource('pegawai-ikatan', PegawaiIkatanController::class)->except(['show', 'create', 'edit']); // Added
        Route::resource('pegawai-jenis', PegawaiJenisController::class)->except(['show', 'create', 'edit']); // Added
        Route::resource('jabatan', JabatanController::class)->except(['show']); // Allowing create and edit for Jabatan
        Route::resource('rubrik-remun', RubrikRemunController::class)->except(['show', 'create', 'edit']); // Added RubrikRemun
        Route::resource('rubrik-kategori', RubrikKategoriController::class)->except(['show']); // Added RubrikKategori
        Route::resource('rubrik', RubrikController::class); // Added Rubrik

        // Periode Management Routes
        Route::resource('periodes', PeriodeController::class)->except(['show']);
        Route::post('periodes/{periode}/activate', [PeriodeController::class, 'activate'])->name('periodes.activate');
        Route::post('periodes/{periode}/deactivate', [PeriodeController::class, 'deactivate'])->name('periodes.deactivate');

        // Kontrak Kinerja Management Routes
        Route::resource('kontrak-kinerja', KontrakKinerjaController::class)->except(['show']);
    });

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
