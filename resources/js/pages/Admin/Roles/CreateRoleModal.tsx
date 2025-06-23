import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'; // Modal components

interface Permission {
    id: number;
    name: string;
}

interface Props {
    allPermissions: Permission[];
    closeModal: () => void;
    isOpen: boolean;
}

export default function CreateRoleModal({ allPermissions, closeModal, isOpen }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        permissions: [] as string[],
    });

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
        post(route('admin.roles.store'), {
            onSuccess: () => {
                reset();
                closeModal();
            },
            preserveScroll: true, // Preserve scroll to keep the main page position
        });
    };

    // Reset form when modal is closed/reopened
    React.useEffect(() => {
        if (isOpen) {
            reset(); // Reset form fields when modal opens
        }
    }, [isOpen, reset]);


    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create New Role</DialogTitle>
                    <DialogDescription>Enter the name for the new role and select permissions.</DialogDescription>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="space-y-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name-create">Name</Label>
                            <Input
                                id="name-create" // Ensure unique ID if multiple forms are in DOM
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
                                                id={`permission-create-${permission.id}`} // Ensure unique ID
                                                checked={data.permissions.includes(permission.name)}
                                                onCheckedChange={(checked) =>
                                                    handlePermissionChange(permission.name, checked)
                                                }
                                            />
                                            <Label
                                                htmlFor={`permission-create-${permission.id}`} // Ensure unique ID
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
                            {processing ? 'Creating...' : 'Create Role'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
