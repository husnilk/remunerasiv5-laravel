<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\KontrakKinerjaRequest;
use App\Models\KontrakKinerja;
use App\Models\Pegawai;
use App\Models\Periode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KontrakKinerjaController extends Controller
{
    public function index(Request $request)
    {
        $query = KontrakKinerja::query()
            ->with(['pegawai', 'periode', 'penilai', 'atasanPenilai'])
            ->orderBy('tahun', 'desc')
            ->orderBy('bulan_mulai', 'desc');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->whereHas('pegawai', function ($q) use ($search) {
                    $q->where('nama', 'like', "%{$search}%");
                })
                ->orWhereHas('periode', function ($q) use ($search) {
                    $q->where('nama', 'like', "%{$search}%");
                })
                ->orWhere('tahun', 'like', "%{$search}%");
            });
        }

        $kontrakKinerjas = $query->paginate($request->input('per_page', 10));

        return Inertia::render('Admin/KontrakKinerja/Index', [
            'kontrakKinerjas' => $kontrakKinerjas,
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    public function create()
    {
        $allPegawai = Pegawai::where('aktif', true)->orderBy('nama')->get(['id', 'nama']);
        $allPeriode = Periode::orderBy('tahun', 'desc')->orderBy('nama')->get(['id', 'nama']); // Assuming 'nama' exists and is relevant for Periode selection

        return Inertia::render('Admin/KontrakKinerja/Create', [
            'allPegawai' => $allPegawai,
            'allPeriode' => $allPeriode,
        ]);
    }

    public function store(KontrakKinerjaRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['created_by'] = auth()->id();
        $validatedData['updated_by'] = auth()->id();

        KontrakKinerja::create($validatedData);

        return redirect()->route('admin.kontrak-kinerja.index')
            ->with('success', 'Kontrak Kinerja berhasil ditambahkan.');
    }

    public function edit(KontrakKinerja $kontrakKinerja)
    {
        $kontrakKinerja->load(['pegawai', 'periode', 'penilai', 'atasanPenilai', 'verifiedBy']);
        $allPegawai = Pegawai::where('aktif', true)->orderBy('nama')->get(['id', 'nama']);
        $allPeriode = Periode::orderBy('tahun', 'desc')->orderBy('nama')->get(['id', 'nama']);

        return Inertia::render('Admin/KontrakKinerja/Edit', [
            'kontrakKinerja' => $kontrakKinerja,
            'allPegawai' => $allPegawai,
            'allPeriode' => $allPeriode,
        ]);
    }

    public function update(KontrakKinerjaRequest $request, KontrakKinerja $kontrakKinerja)
    {
        $validatedData = $request->validated();
        $validatedData['updated_by'] = auth()->id();

        $kontrakKinerja->update($validatedData);

        return redirect()->route('admin.kontrak-kinerja.index')
            ->with('success', 'Kontrak Kinerja berhasil diperbarui.');
    }

    public function destroy(KontrakKinerja $kontrakKinerja)
    {
        $kontrakKinerja->delete();

        return redirect()->route('admin.kontrak-kinerja.index')
            ->with('success', 'Kontrak Kinerja berhasil dihapus.');
    }
}
