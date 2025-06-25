"use client"

import * as React from "react"
import { Check, ChevronsUpDown,UserCheck2Icon } from 'lucide-react';
import {SharedData} from '@/types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuRadioGroup,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { router, usePage } from '@inertiajs/react';

export function RoleSwitcher() {
    const { auth } = usePage<SharedData>().props;
    const { userRoles, currentRole, user } = auth;
    const [selectedRole, setSelectedRole] = React.useState<string| null>(currentRole)

    React.useEffect(()=> {
        setSelectedRole(currentRole);
    }, [currentRole])

    const handleRoleChange = (newRole: string) => {
        console.log(newRole);
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
    // if (userRoles.length <= 1 || !currentRole) {
    //     return (
    //         <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
    //             User Role: {currentRole || 'N/A'}
    //         </div>
    //     );
    // }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <UserCheck2Icon className="size-4" />
                            </div>
                            <div className="flex flex-col gap-0.5 leading-none">
                                <span className="font-medium">User Role</span>
                                <span className="">{selectedRole}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width)"
                        align="start"
                    >
                        <DropdownMenuRadioGroup value={selectedRole || ''} onValueChange={handleRoleChange}>
                        {userRoles.map((roleName) => (
                            <DropdownMenuItem
                                key={roleName}
                                onSelect={() => handleRoleChange(roleName)}
                            >
                                {roleName}{" "}
                                {roleName === selectedRole && <Check className="ml-auto" />}
                            </DropdownMenuItem>
                        ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
