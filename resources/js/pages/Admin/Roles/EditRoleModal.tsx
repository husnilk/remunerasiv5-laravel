import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    // Add other role properties if needed by the form, e.g., guard_name
    permissions: Permission[]; // For initial population
}

interface Props {
    role: Role;
    allPermissions: Permission[];
    closeModal: () => void;
    isOpen: boolean;
}

export default function EditRoleModal({ role, allPermissions, closeModal, isOpen }: Props) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: '',
        permissions: [] as string[],
    });

    // Effect to update form data when 'role' prop changes or modal opens
    useEffect(() => {
        if (isOpen && role) {
            setData({
                name: role.name || '',
                permissions: role.permissions.map(p => p.name) || [],
            });
        } else if (!isOpen) {
            // Optionally reset form when modal is closed if desired,
            // or rely on re-population when it opens next.
            // reset(); // Could be placed here if reset on close is preferred.
        }
    }, [role, isOpen, setData]);


    const handlePermissionChange = (permissionName: string, checked: boolean | 'indeterminate') => {
        if (checked === true) {
            setData('permissions', [...data.permissions, permissionName]);
        } else {
            setData(
                'permissions',
                data.permissions.filter((pName) => pName !== permissionName),
            );
        }
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('admin.roles.update', role.id), {
            onSuccess: () => {
                // reset(); // Resetting here might clear the form before user sees success if modal closes immediately
                closeModal();
            },
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Role: {role.name}</DialogTitle>
                    <DialogDescription>Update the role name and its permissions.</DialogDescription>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="space-y-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor={`name-edit-${role.id}`}>Name</Label>
                            <Input
                                id={`name-edit-${role.id}`} // Unique ID
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoFocus
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label>Permissions</Label>
                            {allPermissions.length > 0 ? (
                                <div className="grid max-h-60 grid-cols-1 gap-2 overflow-y-auto rounded-md border p-4 sm:grid-cols-2 md:grid-cols-3">
                                    {allPermissions.map((permission) => (
                                        <div key={permission.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`permission-edit-${role.id}-${permission.id}`} // Unique ID
                                                checked={data.permissions.includes(permission.name)}
                                                onCheckedChange={(checked) =>
                                                    handlePermissionChange(permission.name, checked)
                                                }
                                            />
                                            <Label
                                                htmlFor={`permission-edit-${role.id}-${permission.id}`} // Unique ID
                                                className="font-normal"
                                            >
                                                {permission.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No permissions available.</p>
                            )}
                            <InputError message={errors.permissions} className="mt-2" />
                        </div>
                    </div>
                    <DialogFooter className="gap-2 sm:justify-end">
                        <Button type="button" variant="outline" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
