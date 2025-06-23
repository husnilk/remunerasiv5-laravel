<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataMaster\StoreJabatanRequest;
use App\Http\Requests\DataMaster\UpdateJabatanRequest;
use App\Models\Jabatan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class JabatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): InertiaResponse
    {
        $query = Jabatan::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('nama', 'like', "%{$search}%");
        }

        if ($request->filled('active_status')) {
            $activeStatus = $request->input('active_status');
            if (in_array($activeStatus, ['true', 'false'])) {
                $query->where('active', filter_var($activeStatus, FILTER_VALIDATE_BOOLEAN));
            }
        }

        $sort = $request->input('sort', 'nama');
        $direction = $request->input('direction', 'asc');

        if (! in_array($direction, ['asc', 'desc'])) {
            $direction = 'asc';
        }
        // Basic validation for sortable columns
        if (! in_array($sort, ['nama', 'grade', 'job_value', 'active'])) {
            $sort = 'nama';
        }

        $query->orderBy($sort, $direction);

        $jabatans = $query->paginate($request->input('per_page', 10))->withQueryString();

        return Inertia::render('Admin/Jabatan/Index', [
            'jabatans' => $jabatans,
            'filters' => $request->only(['search', 'active_status', 'sort', 'direction', 'per_page']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): InertiaResponse
    {
        return Inertia::render('Admin/Jabatan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJabatanRequest $request): RedirectResponse
    {
        Jabatan::create($request->validated());

        return redirect()->route('admin.jabatan.index')->with('success', 'Jabatan created successfully.');
    }

    /**
     * Display the specified resource.
     * Note: Usually not needed for admin CRUDs that use Edit page directly.
     * If a show page is desired, it can be implemented similarly to edit.
     */
    public function show(Jabatan $jabatan): InertiaResponse
    {
        // return Inertia::render('Admin/Jabatan/Show', ['jabatan' => $jabatan]);
        // For now, redirect to edit or remove if not used.
        return redirect()->route('admin.jabatan.edit', $jabatan);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jabatan $jabatan): InertiaResponse
    {
        return Inertia::render('Admin/Jabatan/Edit', [
            'jabatan' => $jabatan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJabatanRequest $request, Jabatan $jabatan): RedirectResponse
    {
        $jabatan->update($request->validated());

        return redirect()->route('admin.jabatan.index')->with('success', 'Jabatan updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jabatan $jabatan): RedirectResponse
    {
        $jabatan->delete();

        return redirect()->route('admin.jabatan.index')->with('success', 'Jabatan deleted successfully.');
    }
}
