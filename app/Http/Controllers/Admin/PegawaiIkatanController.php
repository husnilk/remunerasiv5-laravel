<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PegawaiIkatan; // Correct model name
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\DataMaster\StorePegawaiIkatanRequest;
use App\Http\Requests\DataMaster\UpdatePegawaiIkatanRequest;

class PegawaiIkatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PegawaiIkatan::orderBy('nama');

        if ($request->has('search')) {
            $query->where('nama', 'like', '%' . $request->search . '%');
        }

        $pegawaiIkatans = $query->paginate($request->get('per_page', 10));

        return Inertia::render('Admin/PegawaiIkatan/Index', [
            'pegawaiIkatans' => $pegawaiIkatans,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePegawaiIkatanRequest $request)
    {
        PegawaiIkatan::create($request->validated());

        return redirect()->route('data-master.pegawai-ikatan.index')->with('success', 'Pegawai Ikatan created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePegawaiIkatanRequest $request, PegawaiIkatan $pegawaiIkatan)
    {
        $pegawaiIkatan->update($request->validated());

        return redirect()->route('data-master.pegawai-ikatan.index')->with('success', 'Pegawai Ikatan updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PegawaiIkatan $pegawaiIkatan)
    {
        // Add any checks if necessary, e.g., if it's linked to other models
        // For example:
        // if ($pegawaiIkatan->pegawai()->exists()) {
        //     return redirect()->route('data-master.pegawai-ikatan.index')->with('error', 'Pegawai Ikatan cannot be deleted because it is in use.');
        // }
        $pegawaiIkatan->delete();

        return redirect()->route('data-master.pegawai-ikatan.index')->with('success', 'Pegawai Ikatan deleted successfully.');
    }
}
