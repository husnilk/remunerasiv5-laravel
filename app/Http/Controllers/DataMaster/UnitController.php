<?php

namespace App\Http\Controllers\DataMaster;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataMaster\StoreUnitRequest;
use App\Http\Requests\DataMaster\UpdateUnitRequest;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Unit::with('parent')->orderBy('code');

        if ($request->has('search')) {
            $query->where('name', 'like', '%'.$request->search.'%')
                ->orWhere('code', 'like', '%'.$request->search.'%');
        }

        $units = $query->paginate($request->get('per_page', 10));
        $allUnits = Unit::orderBy('name')->get()->map(fn ($unit) => ['value' => $unit->id, 'label' => $unit->name.' ('.$unit->code.')']);

        return Inertia::render('DataMaster/Units/Index', [
            'units' => $units,
            'filters' => $request->only(['search']),
            'allUnits' => $allUnits,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUnitRequest $request)
    {
        Unit::create($request->validated());

        return redirect()->route('data-master.units.index')->with('success', 'Unit created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUnitRequest $request, Unit $unit)
    {
        $unit->update($request->validated());

        return redirect()->route('data-master.units.index')->with('success', 'Unit updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Unit $unit)
    {
        // Check if unit has children
        if ($unit->children()->exists()) {
            return redirect()->route('data-master.units.index')->with('error', 'Unit cannot be deleted because it has child units.');
        }
        $unit->delete();

        return redirect()->route('data-master.units.index')->with('success', 'Unit deleted successfully.');
    }
}
