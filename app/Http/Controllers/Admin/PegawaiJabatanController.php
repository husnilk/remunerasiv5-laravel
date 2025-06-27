<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pegawai;
use App\Models\PegawaiJabatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class PegawaiJabatanController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Pegawai $pegawai)
    {
        $validated = $request->validate([
            'jabatan_unit_id' => 'required|exists:jabatan_units,id',
            'tmt' => 'required|date',
            'selesai' => 'nullable|date|after_or_equal:tmt',
        ]);

        // Ensure pegawai_id is set from the route model binding
        $validated['pegawai_id'] = $pegawai->id;

        PegawaiJabatan::create($validated);

        return Redirect::route('admin.pegawai.show', $pegawai->id)
            ->with('success', 'Riwayat jabatan berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PegawaiJabatan $pegawaiJabatan)
    {
        $validated = $request->validate([
            'jabatan_unit_id' => 'required|exists:jabatan_units,id',
            'tmt' => 'required|date',
            'selesai' => 'nullable|date|after_or_equal:tmt',
        ]);

        $pegawaiJabatan->update($validated);

        return Redirect::route('admin.pegawai.show', $pegawaiJabatan->pegawai_id)
            ->with('success', 'Riwayat jabatan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PegawaiJabatan $pegawaiJabatan)
    {
        $pegawaiId = $pegawaiJabatan->pegawai_id;
        $pegawaiJabatan->delete();

        return Redirect::route('admin.pegawai.show', $pegawaiId)
            ->with('success', 'Riwayat jabatan berhasil dihapus.');
    }
}
