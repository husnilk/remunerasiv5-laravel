<?php

namespace App\Http\Controllers;

use App\Models\RubrikRemun;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class RubrikRemunController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $rubrikRemuns = RubrikRemun::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where('nama', 'like', "%{$search}%");
            })
            ->orderBy('nama')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/RubrikRemun/Index', [
            'rubrikRemuns' => $rubrikRemuns,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:rubrik_remuns,nama',
            'active' => 'required|boolean',
        ]);

        RubrikRemun::create($validated);

        return Redirect::route('admin.rubrik-remun.index')->with('success', 'Rubrik Remun berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RubrikRemun $rubrikRemun)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:rubrik_remuns,nama,' . $rubrikRemun->id,
            'active' => 'required|boolean',
        ]);

        $rubrikRemun->update($validated);

        return Redirect::route('admin.rubrik-remun.index')->with('success', 'Rubrik Remun berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RubrikRemun $rubrikRemun)
    {
        $rubrikRemun->delete();

        return Redirect::route('admin.rubrik-remun.index')->with('success', 'Rubrik Remun berhasil dihapus.');
    }
}
