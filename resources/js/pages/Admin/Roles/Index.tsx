import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    guard_name: string;
    permissions: Permission[];
}

interface Props {
    roles: Role[];
}

export default function RolesIndex({ roles }: Props) {
    const handleDelete = (roleId: number) => {
        if (confirm('Are you sure you want to delete this role?')) {
            router.delete(route('admin.roles.destroy', roleId), { preserveScroll: true });
        }
    };

    return (
        <AppLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Manage Roles
                    </h2>
                    <Link href={route('admin.roles.create')}>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Role
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Roles" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Guard</TableHead>
                                        <TableHead>Permissions</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {roles.map((role) => (
                                        <TableRow key={role.id}>
                                            <TableCell>{role.name}</TableCell>
                                            <TableCell>{role.guard_name}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {role.permissions.map((permission) => (
                                                        <Badge key={permission.id} variant="secondary">
                                                            {permission.name}
                                                        </Badge>
                                                    ))}
                                                    {role.permissions.length === 0 && (
                                                        <span className="text-xs text-gray-500">No permissions</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Link href={route('admin.roles.edit', role.id)} className="mr-2">
                                                    <Button variant="outline" size="icon">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="icon" onClick={() => handleDelete(role.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {roles.length === 0 && <p className="mt-4 text-center">No roles found.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
