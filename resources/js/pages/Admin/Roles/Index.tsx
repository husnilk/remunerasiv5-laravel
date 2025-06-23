import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2, ShieldCheck } from 'lucide-react'; // Added ShieldCheck
import React, { useState } from 'react'; // Added useState
import { Badge } from '@/components/ui/badge';
import CreateRoleModal from './CreateRoleModal'; // Import the create modal
import EditRoleModal from './EditRoleModal'; // Import the edit modal

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
    permissions: Permission[]; // Assuming permissions are passed for the create/edit modals
}

export default function RolesIndex({ roles, permissions }: Props) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);

    const handleDelete = (roleId: number) => {
        if (confirm('Are you sure you want to delete this role?')) {
            router.delete(route('admin.roles.destroy', roleId), {
                preserveScroll: true,
                onSuccess: () => {
                    // Optionally close any open edit modal for the deleted role
                    if (editingRole && editingRole.id === roleId) {
                        setIsEditModalOpen(false);
                        setEditingRole(null);
                    }
                },
            });
        }
    };

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const openEditModal = (role: Role) => {
        setEditingRole(role);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingRole(null);
    };

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Manage Roles
                </h2>
            }
        >
            <Head title="Roles" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-4 flex justify-end gap-2">
                        <Link href={route('admin.permissions.index')}>
                            <Button variant="outline">
                                <ShieldCheck className="mr-2 h-4 w-4" /> Permissions
                            </Button>
                        </Link>
                        <Button onClick={openCreateModal}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Role
                        </Button>
                    </div>
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
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => openEditModal(role)}
                                                    className="mr-2"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleDelete(role.id)}
                                                >
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

            {isCreateModalOpen && (
                <CreateRoleModal
                    isOpen={isCreateModalOpen}
                    closeModal={closeCreateModal}
                    allPermissions={permissions}
                />
            )}
            {isEditModalOpen && editingRole && (
                <EditRoleModal
                    isOpen={isEditModalOpen}
                    closeModal={closeEditModal}
                    role={editingRole}
                    allPermissions={permissions}
                />
            )}
        </AppLayout>
    );
}
