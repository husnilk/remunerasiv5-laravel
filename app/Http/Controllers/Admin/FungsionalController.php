<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFungsionalRequest;
use App\Http\Requests\Admin\UpdateFungsionalRequest;
use App\Models\Fungsional;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FungsionalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Fungsional::orderBy('kode');

        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('nama', 'like', '%'.$request->search.'%')
                  ->orWhere('kode', 'like', '%'.$request->search.'%');
            });
        }

        $fungsionals = $query->paginate($request->get('per_page', 10));

        return Inertia::render('Admin/Fungsional/Index', [
            'fungsionals' => $fungsionals,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFungsionalRequest $request)
    {
        Fungsional::create($request->validated());

        return redirect()->route('data-master.fungsionals.index')->with('success', 'Fungsional created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFungsionalRequest $request, Fungsional $fungsional)
    {
        $fungsional->update($request->validated());

        return redirect()->route('data-master.fungsionals.index')->with('success', 'Fungsional updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fungsional $fungsional)
    {
        $fungsional->delete();

        return redirect()->route('data-master.fungsionals.index')->with('success', 'Fungsional deleted successfully.');
    }
}
