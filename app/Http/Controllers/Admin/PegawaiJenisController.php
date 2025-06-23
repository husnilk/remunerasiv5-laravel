<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataMaster\StorePegawaiJenisRequest;
use App\Http\Requests\DataMaster\UpdatePegawaiJenisRequest;
use App\Models\PegawaiJenis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PegawaiJenisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PegawaiJenis::orderBy('nama');

        if ($request->has('search')) {
            $query->where('nama', 'like', '%'.$request->search.'%');
        }

        $pegawaiJenis = $query->paginate($request->get('per_page', 10));

        return Inertia::render('Admin/PegawaiJenis/Index', [
            'pegawaiJenis' => $pegawaiJenis,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePegawaiJenisRequest $request)
    {
        PegawaiJenis::create($request->validated());

        return redirect()->route('data-master.pegawai-jenis.index')->with('success', 'Jenis Pegawai created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePegawaiJenisRequest $request, PegawaiJenis $pegawaiJeni)
    {
        $pegawaiJeni->update($request->validated());

        return redirect()->route('data-master.pegawai-jenis.index')->with('success', 'Jenis Pegawai updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PegawaiJenis $pegawaiJeni)
    {
        // Optional: Add check if PegawaiJenis is in use before deleting
        // if ($pegawaiJeni->pegawai()->exists()) {
        //     return redirect()->route('data-master.pegawai-jenis.index')->with('error', 'Jenis Pegawai cannot be deleted because it is in use.');
        // }
        $pegawaiJeni->delete();

        return redirect()->route('data-master.pegawai-jenis.index')->with('success', 'Jenis Pegawai deleted successfully.');
    }
}
