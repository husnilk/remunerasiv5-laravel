<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();
        $userRoles = $user ? $user->getRoleNames() : collect();
        $currentRole = null;

        if ($user) {
            if ($user->last_active_role_id) {
                // Ensure lastActiveRole relationship is loaded or use it directly
                $lastActiveRole = $user->lastActiveRole()->first(); // Or Role::findById($user->last_active_role_id)
                if ($lastActiveRole) {
                    $currentRole = $lastActiveRole->name;
                }
                $permissions = $lastActiveRole->permissions->pluck('name')->toArray();
            }
            // If currentRole is still null and user has roles, default to the first one
            if (!$currentRole && $userRoles->isNotEmpty()) {
                $currentRole = $userRoles->first();
            }
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $user,
                'userRoles' => $userRoles,
                'currentRole' => $currentRole,
                'permissions' => $permissions
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
