<?php

namespace App\Http\Controllers;

use App\Models\Kehadiran;
use App\Models\Pegawai;
use App\Models\Periode;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class KehadiranController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Kehadiran::with(['pegawai', 'periode', 'createdBy']);

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->whereHas('pegawai', function ($q) use ($searchTerm) {
                $q->where('nama', 'like', "%{$searchTerm}%");
            })->orWhereHas('periode', function ($q) use ($searchTerm) {
                $q->where('nama', 'like', "%{$searchTerm}%");
            });
        }

        $kehadirans = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Admin/Kehadiran/Index', [
            'kehadirans' => $kehadirans,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Kehadiran/Create', [
            'pegawais' => Pegawai::orderBy('nama')->get(['id', 'nama']),
            'periodes' => Periode::orderBy('nama')->get(['id', 'nama']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'pegawai_id' => 'required|exists:pegawais,id',
            'periode_id' => 'required|exists:periodes,id',
            'status_pegawai' => 'required|integer',
            'tahun' => 'required|integer|min:1900|max:' . (date('Y') + 5),
            'bulan' => 'required|integer|min:1|max:12',
            'hadir' => 'nullable|integer|min:0',
            'dinas_luar' => 'nullable|integer|min:0',
            'cuti_sakit' => 'nullable|integer|min:0',
            'cuti_izin' => 'nullable|integer|min:0',
            'cuti_besar' => 'nullable|integer|min:0',
            'cuti_tahunan' => 'nullable|integer|min:0',
            'cuti_melahirkan' => 'nullable|integer|min:0',
            'cuti_penting' => 'nullable|integer|min:0',
            'cuti_non_taggungan' => 'nullable|integer|min:0',
            'tanpa_keterangan' => 'nullable|integer|min:0',
            'tugas_belajar' => 'nullable|integer|min:0',
            'cuti_bersalin_01' => 'nullable|integer|min:0',
            'cuti_bersalin_02' => 'nullable|integer|min:0',
            'cuti_bersalin_03' => 'nullable|integer|min:0',
            'terlambat_01' => 'nullable|integer|min:0',
            'terlambat_02' => 'nullable|integer|min:0',
            'terlambat_03' => 'nullable|integer|min:0',
            'terlambat_04' => 'nullable|integer|min:0',
            'terlambat_05' => 'nullable|integer|min:0',
            'terlambat_06' => 'nullable|integer|min:0',
            'pulang_cepat_01' => 'nullable|integer|min:0',
            'pulang_cepat_02' => 'nullable|integer|min:0',
            'pulang_cepat_03' => 'nullable|integer|min:0',
            'pulang_cepat_04' => 'nullable|integer|min:0',
            'pulang_cepat_05' => 'nullable|integer|min:0',
            'pulang_cepat_06' => 'nullable|integer|min:0',
        ]);

        $kehadiranData = array_map(fn($value) => $value ?? 0, $validated);
        $kehadiranData['created_by'] = Auth::id();

        Kehadiran::create($kehadiranData);

        return redirect()->route('admin.kehadiran.index')->with('success', 'Data kehadiran berhasil ditambahkan.');
    }

    public function edit(Kehadiran $kehadiran): Response
    {
        return Inertia::render('Admin/Kehadiran/Edit', [
            'kehadiran' => $kehadiran->load(['pegawai', 'periode']),
            'pegawais' => Pegawai::orderBy('nama')->get(['id', 'nama']),
            'periodes' => Periode::orderBy('nama')->get(['id', 'nama']),
        ]);
    }

    public function update(Request $request, Kehadiran $kehadiran): RedirectResponse
    {
        $validated = $request->validate([
            'pegawai_id' => 'required|exists:pegawais,id',
            'periode_id' => 'required|exists:periodes,id',
            'status_pegawai' => 'required|integer',
            'tahun' => 'required|integer|min:1900|max:' . (date('Y') + 5),
            'bulan' => 'required|integer|min:1|max:12',
            'hadir' => 'nullable|integer|min:0',
            'dinas_luar' => 'nullable|integer|min:0',
            'cuti_sakit' => 'nullable|integer|min:0',
            'cuti_izin' => 'nullable|integer|min:0',
            'cuti_besar' => 'nullable|integer|min:0',
            'cuti_tahunan' => 'nullable|integer|min:0',
            'cuti_melahirkan' => 'nullable|integer|min:0',
            'cuti_penting' => 'nullable|integer|min:0',
            'cuti_non_taggungan' => 'nullable|integer|min:0',
            'tanpa_keterangan' => 'nullable|integer|min:0',
            'tugas_belajar' => 'nullable|integer|min:0',
            'cuti_bersalin_01' => 'nullable|integer|min:0',
            'cuti_bersalin_02' => 'nullable|integer|min:0',
            'cuti_bersalin_03' => 'nullable|integer|min:0',
            'terlambat_01' => 'nullable|integer|min:0',
            'terlambat_02' => 'nullable|integer|min:0',
            'terlambat_03' => 'nullable|integer|min:0',
            'terlambat_04' => 'nullable|integer|min:0',
            'terlambat_05' => 'nullable|integer|min:0',
            'terlambat_06' => 'nullable|integer|min:0',
            'pulang_cepat_01' => 'nullable|integer|min:0',
            'pulang_cepat_02' => 'nullable|integer|min:0',
            'pulang_cepat_03' => 'nullable|integer|min:0',
            'pulang_cepat_04' => 'nullable|integer|min:0',
            'pulang_cepat_05' => 'nullable|integer|min:0',
            'pulang_cepat_06' => 'nullable|integer|min:0',
        ]);

        $kehadiranData = array_map(fn($value) => $value ?? 0, $validated);

        $kehadiran->update($kehadiranData);

        return redirect()->route('admin.kehadiran.index')->with('success', 'Data kehadiran berhasil diperbarui.');
    }

    public function destroy(Kehadiran $kehadiran): RedirectResponse
    {
        $kehadiran->delete();
        return redirect()->route('admin.kehadiran.index')->with('success', 'Data kehadiran berhasil dihapus.');
    }
}
