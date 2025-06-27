<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Periode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PeriodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $periodes = Periode::query()
            ->orderBy('tahun', 'desc')
            ->orderBy('periode', 'desc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Periodes/Index', [
            'periodes' => $periodes,
            'filters' => $request->all(['search', 'trashed']), // Example, adjust if filters are added
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Periodes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'tahun' => 'required|integer|digits:4',
            'periode' => 'required|integer',
            'keterangan' => 'nullable|string',
            'pir' => 'nullable|numeric',
            'tgl_mulai' => 'nullable|date',
            'tgl_selesai' => 'nullable|date',
            'tgl_input_mulai' => 'nullable|date',
            'tgl_input_selesai' => 'nullable|date',
            'tgl_verifikasi_mulai' => 'nullable|date',
            'tgl_verifikasi_selesai' => 'nullable|date',
            'tgl_validasi_mulai' => 'nullable|date',
            'tgl_validasi_selesai' => 'nullable|date',
            'kehadiran' => 'nullable|integer',
            'skp' => 'nullable|integer',
            'format_skp' => 'nullable|integer',
            'calc_method' => 'nullable|integer',
            'bkd_tahun' => 'nullable|integer|digits:4',
            'bkd_semester' => 'nullable|string|max:255',
            'bkd_source_p1' => 'nullable|integer',
            'bkd_tahun_p1' => 'nullable|integer|digits:4',
            'bkd_semester_p1' => 'nullable|string|max:255',
            'bkd_source_p2' => 'nullable|integer',
            'bkd_tahun_p2' => 'nullable|integer|digits:4',
            'bkd_semester_p2' => 'nullable|string|max:255',
            'aktif' => 'sometimes|boolean', // usually handled by activate/deactivate
            'show_insentif' => 'sometimes|boolean',
            'user_confirmation' => 'sometimes|boolean',
        ]);

        // If 'aktif' is being set directly, ensure it's a boolean 0 or 1
        if ($request->has('aktif')) {
            $validatedData['aktif'] = filter_var($request->aktif, FILTER_VALIDATE_BOOLEAN);
        }

        // Default 'aktif' to 0 if not provided, as activation is a separate step
        $validatedData['aktif'] = $validatedData['aktif'] ?? 0;

        Periode::create($validatedData);

        return redirect()->route('admin.periodes.index')->with('success', 'Periode berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Periode $periode)
    {
        return Inertia::render('Admin/Periodes/Edit', [
            'periode' => $periode,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Periode $periode)
    {
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'tahun' => 'required|integer|digits:4',
            'periode' => 'required|integer',
            'keterangan' => 'nullable|string',
            'pir' => 'nullable|numeric',
            'tgl_mulai' => 'nullable|date',
            'tgl_selesai' => 'nullable|date',
            'tgl_input_mulai' => 'nullable|date',
            'tgl_input_selesai' => 'nullable|date',
            'tgl_verifikasi_mulai' => 'nullable|date',
            'tgl_verifikasi_selesai' => 'nullable|date',
            'tgl_validasi_mulai' => 'nullable|date',
            'tgl_validasi_selesai' => 'nullable|date',
            'kehadiran' => 'nullable|integer',
            'skp' => 'nullable|integer',
            'format_skp' => 'nullable|integer',
            'calc_method' => 'nullable|integer',
            'bkd_tahun' => 'nullable|integer|digits:4',
            'bkd_semester' => 'nullable|string|max:255',
            'bkd_source_p1' => 'nullable|integer',
            'bkd_tahun_p1' => 'nullable|integer|digits:4',
            'bkd_semester_p1' => 'nullable|string|max:255',
            'bkd_source_p2' => 'nullable|integer',
            'bkd_tahun_p2' => 'nullable|integer|digits:4',
            'bkd_semester_p2' => 'nullable|string|max:255',
            // 'aktif' is generally not updated directly here, but via activate/deactivate
            'show_insentif' => 'sometimes|boolean',
            'user_confirmation' => 'sometimes|boolean',
        ]);

        if ($request->has('show_insentif')) {
            $validatedData['show_insentif'] = filter_var($request->show_insentif, FILTER_VALIDATE_BOOLEAN);
        }
        if ($request->has('user_confirmation')) {
            $validatedData['user_confirmation'] = filter_var($request->user_confirmation, FILTER_VALIDATE_BOOLEAN);
        }

        $periode->update($validatedData);

        return redirect()->route('admin.periodes.index')->with('success', 'Periode berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Periode $periode)
    {
        if ($periode->aktif) {
            return redirect()->route('admin.periodes.index')->with('error', 'Periode aktif tidak dapat dihapus.');
        }
        $periode->delete();

        return redirect()->route('admin.periodes.index')->with('success', 'Periode berhasil dihapus.');
    }

    /**
     * Activate the specified periode.
     */
    public function activate(Request $request, Periode $periode)
    {
        DB::transaction(function () use ($periode) {
            Periode::where('id', '!=', $periode->id)->update(['aktif' => 0]);
            $periode->update(['aktif' => 1]);
        });

        return redirect()->route('admin.periodes.index')->with('success', "Periode {$periode->nama} berhasil diaktifkan.");
    }

    /**
     * Deactivate the specified periode.
     */
    public function deactivate(Request $request, Periode $periode)
    {
        $periode->update(['aktif' => 0]);

        return redirect()->route('admin.periodes.index')->with('success', "Periode {$periode->nama} berhasil dinonaktifkan.");
    }
}
