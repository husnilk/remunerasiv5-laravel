import { usePage } from '@inertiajs/react';

export function can(permission: string | undefined): boolean {
    const { auth } = usePage().props as never as {
        auth: {
            permissions: string[];
        };
    };

    return auth.permissions.includes(<string>permission);
}
