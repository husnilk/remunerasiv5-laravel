<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRubrikKategoriRequest;
use App\Http\Requests\UpdateRubrikKategoriRequest;
use App\Models\RubrikKategori;
use App\Models\RubrikRemun;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RubrikKategoriController extends Controller
{
    public function index(Request $request): Response
    {
        $query = RubrikKategori::query()->with('rubrikRemun');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('kode', 'like', "%{$search}%")
                  ->orWhereHas('rubrikRemun', function ($qr) use ($search) {
                      $qr->where('nama', 'like', "%{$search}%");
                  });
            });
        }

        $rubrikKategoris = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();
        $rubrikRemuns = RubrikRemun::orderBy('nama')->get();


        return Inertia::render('Admin/RubrikKategori/Index', [
            'rubrikKategoris' => $rubrikKategoris,
            'rubrikRemuns' => $rubrikRemuns,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        $rubrikRemuns = RubrikRemun::orderBy('nama')->get();
        return Inertia::render('Admin/RubrikKategori/Create', [
            'rubrikRemuns' => $rubrikRemuns,
        ]);
    }

    public function store(StoreRubrikKategoriRequest $request): RedirectResponse
    {
        RubrikKategori::create($request->validated());

        return redirect()->route('admin.rubrik-kategori.index')->with('success', 'Rubrik Kategori created successfully.');
    }

    public function edit(RubrikKategori $rubrikKategori): Response
    {
        $rubrikRemuns = RubrikRemun::orderBy('nama')->get();
        $rubrikKategori->load('rubrikRemun'); // Optional: if needed in edit form directly
        return Inertia::render('Admin/RubrikKategori/Edit', [
            'rubrikKategori' => $rubrikKategori,
            'rubrikRemuns' => $rubrikRemuns,
        ]);
    }

    public function update(UpdateRubrikKategoriRequest $request, RubrikKategori $rubrikKategori): RedirectResponse
    {
        $rubrikKategori->update($request->validated());

        return redirect()->route('admin.rubrik-kategori.index')->with('success', 'Rubrik Kategori updated successfully.');
    }

    public function destroy(RubrikKategori $rubrikKategori): RedirectResponse
    {
        $rubrikKategori->delete();

        return redirect()->route('admin.rubrik-kategori.index')->with('success', 'Rubrik Kategori deleted successfully.');
    }
}
