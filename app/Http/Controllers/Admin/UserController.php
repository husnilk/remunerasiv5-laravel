<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function switchRole(Request $request)
    {
        $user = Auth::user();
        $validated = $request->validate([
            'role' => ['required', 'string', Rule::in($user->getRoleNames())],
        ]);

        $newRoleName = $validated['role'];
        $newRole = Role::findByName($newRoleName);

        if ($newRole) {
            $user->last_active_role_id = $newRole->id;
            $user->save();
        }

        // It's generally good practice to redirect back after a POST request.
        // Inertia will handle this by refreshing props.
        return Redirect::back()->with('success', 'Role switched successfully.');
    }
}
