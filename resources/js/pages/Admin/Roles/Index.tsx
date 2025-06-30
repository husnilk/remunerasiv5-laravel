import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types'; // Import the edit modal
import { Head, Link, router } from '@inertiajs/react';
import { BadgeCheckIcon, Pencil, PlusCircle, ShieldCheck, Trash2 } from 'lucide-react'; // Added ShieldCheck
import { useState } from 'react'; // Added useState
import CreateRoleModal from './CreateRoleModal'; // Import the create modal
import EditRoleModal from './EditRoleModal';
import Heading from '@/components/heading';

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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/admin/roles/',
    },
];

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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <Heading title="Roles" description="Manage user roles and their associated permissions" />
                    <div className="mb-4 flex justify-end gap-2">
                        <Button onClick={openCreateModal} variant="outline">
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Role
                        </Button>
                        <Link href={route('admin.permissions.index')}>
                            <Button variant="default">
                                <ShieldCheck className="mr-2 h-4 w-4" /> Permissions
                            </Button>
                        </Link>
                    </div>
                    <Card>
                        <CardContent>
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
                                                        <Badge key={permission.id} variant="outline">
                                                            {permission.name}
                                                        </Badge>
                                                    ))}
                                                    {role.permissions.length === 0 && <span className="text-xs text-gray-500">No permissions</span>}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="icon" onClick={() => openEditModal(role)} className="mr-2">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="destructive" size="icon" onClick={() => handleDelete(role.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {roles.length === 0 && <p className="mt-4 text-center">No roles found.</p>}
                        </CardContent>
                    </Card>

            {isCreateModalOpen && <CreateRoleModal isOpen={isCreateModalOpen} closeModal={closeCreateModal} allPermissions={permissions} />}
            {isEditModalOpen && editingRole && (
                <EditRoleModal isOpen={isEditModalOpen} closeModal={closeEditModal} role={editingRole} allPermissions={permissions} />
            )}
        </AppLayout>
    );
}
