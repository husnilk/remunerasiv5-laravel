<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRubrikRequest;
use App\Http\Requests\UpdateRubrikRequest;
use App\Models\Rubrik;
use App\Models\RubrikKategori;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RubrikController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Rubrik::with('rubrikKategori');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('aktifitas', 'like', "%{$searchTerm}%")
                  ->orWhere('kode', 'like', "%{$searchTerm}%")
                  ->orWhereHas('rubrikKategori', function ($q_kategori) use ($searchTerm) {
                      $q_kategori->where('nama', 'like', "%{$searchTerm}%");
                  });
            });
        }

        $rubriks = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Rubrik/Index', [
            'rubriks' => $rubriks,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $rubrikKategoris = RubrikKategori::orderBy('nama')->get();
        return Inertia::render('Admin/Rubrik/Create', [
            'rubrikKategoris' => $rubrikKategoris,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRubrikRequest $request)
    {
        Rubrik::create($request->validated()); // Ensure $fillable is set in Model

        return redirect()->route('admin.rubrik.index')->with('success', 'Rubrik created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Rubrik $rubrik)
    {
        $rubrik->load('rubrikKategori');
        return Inertia::render('Admin/Rubrik/Show', [
            'rubrik' => $rubrik,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rubrik $rubrik)
    {
        $rubrikKategoris = RubrikKategori::orderBy('nama')->get();
        return Inertia::render('Admin/Rubrik/Edit', [
            'rubrik' => $rubrik,
            'rubrikKategoris' => $rubrikKategoris,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRubrikRequest $request, Rubrik $rubrik)
    {
        $rubrik->update($request->validated()); // Ensure $fillable is set in Model

        return redirect()->route('admin.rubrik.index')->with('success', 'Rubrik updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rubrik $rubrik)
    {
        $rubrik->delete();

        return redirect()->route('admin.rubrik.index')->with('success', 'Rubrik deleted successfully.');
    }
}
