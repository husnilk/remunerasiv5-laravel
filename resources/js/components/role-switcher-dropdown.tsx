import * as React from 'react';
import { usePage, router } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button'; // Using Button for the trigger
import { SharedData } from '@/types';
import { ChevronsUpDown } from 'lucide-react'; // Icon for the dropdown trigger

export function RoleSwitcherDropdown() {
    const { auth } = usePage<SharedData>().props;
    const { userRoles, currentRole, user } = auth;

    const [selectedRole, setSelectedRole] = React.useState<string | null>(currentRole);

    React.useEffect(() => {
        setSelectedRole(currentRole);
    }, [currentRole]);

    const handleRoleChange = (newRole: string) => {
        if (newRole !== selectedRole) {
            router.post(
                route('user.switch-role'),
                { role: newRole },
                {
                    onSuccess: () => {
                        setSelectedRole(newRole);
                        // Potentially show a toast notification if desired
                    },
                    onError: (errors) => {
                        console.error('Error switching role:', errors);
                        // Handle error, maybe show a notification
                    },
                },
            );
        }
    };

    if (!user || !userRoles || userRoles.length === 0) {
        return null; // Don't render if no user, no roles, or roles array is empty
    }

    // If user has only one role, or no roles, don't show the dropdown.
    // Or, if currentRole is not set (e.g. new user), don't show.
    if (userRoles.length <= 1 || !currentRole) {
        return (
            <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                Role: {currentRole || 'N/A'}
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full flex items-center justify-between px-3 py-2 text-sm"
                >
                    <span className="truncate">
                        Role: {selectedRole || 'Select Role'}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedRole || ''} onValueChange={handleRoleChange}>
                    {userRoles.map((roleName) => (
                        <DropdownMenuRadioItem key={roleName} value={roleName}>
                            {roleName}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
