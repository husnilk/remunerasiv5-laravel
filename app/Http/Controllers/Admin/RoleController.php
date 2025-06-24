<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            'permission:admin.manage',
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Roles/Index', [
            'roles' => Role::with('permissions')->get(),
            // Pass all permissions to the Index page for Create/Edit Modals
            'permissions' => Permission::orderBy('name')->get()->map(fn ($p) => ['id' => $p->id, 'name' => $p->name]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * This method is no longer used to render a page directly as creation is done via modal.
     * It can be removed or kept if it serves other API-like purposes (though unlikely for Inertia).
     */
    // public function create()
    // {
    //     // return Inertia::render('Admin/Roles/Create', [
    //     //     'allPermissions' => Permission::orderBy('name')->get()->map(fn($p) => ['id' => $p->id, 'name' => $p->name]),
    //     // ]);
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'nullable|array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        $role = Role::create(['name' => $validated['name']]);

        if (! empty($validated['permissions'])) {
            $role->syncPermissions($validated['permissions']);
        }

        return redirect()->route('admin.roles.index');
    }

    /**
     * Show the form for editing the specified resource.
     * This method is no longer used to render a page directly as editing is done via modal.
     * The necessary data for editing (role details, all permissions) is loaded on the index page
     * or could be fetched via a separate API endpoint if preferred for very large datasets.
     * For now, the data is passed via the `index` method.
     */
    // public function edit(Role $role)
    // {
    //     // return Inertia::render('Admin/Roles/Edit', [
    //     //     'role' => $role->only('id', 'name'),
    //     //     'allPermissions' => Permission::orderBy('name')->get()->map(fn($p) => ['id' => $p->id, 'name' => $p->name]),
    //     //     'rolePermissions' => $role->permissions->pluck('name')->toArray(),
    //     // ]);
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,'.$role->id,
            'permissions' => 'nullable|array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        $role->name = $validated['name'];
        $role->save();

        // If 'permissions' key is explicitly provided (even as an empty array), sync them.
        // This allows clearing all permissions by sending an empty array.
        if ($request->has('permissions')) {
            $role->syncPermissions($validated['permissions']);
        }
        // If 'permissions' key is not in the request, permissions are not changed.

        return redirect()->route('admin.roles.index')->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return redirect()->route('admin.roles.index');
    }

}
