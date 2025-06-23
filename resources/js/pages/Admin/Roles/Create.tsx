import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox'; // Added Checkbox import

interface Permission {
    id: number;
    name: string;
}

interface Props {
    allPermissions: Permission[];
}

export default function RoleCreate({ allPermissions }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        permissions: [] as string[], // Initialize permissions as an empty array of strings
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
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create New Role
                </h2>
            }
        >
            <Head title="Create Role" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <Card>
                        <form onSubmit={submit}>
                            <CardHeader>
                                <CardTitle>Role Information</CardTitle>
                                <CardDescription>Enter the name for the new role and select permissions.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
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
                                        <div className="grid grid-cols-1 gap-2 rounded-md border p-4 sm:grid-cols-2 md:grid-cols-3">
                                            {allPermissions.map((permission) => (
                                                <div key={permission.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`permission-${permission.id}`}
                                                        checked={data.permissions.includes(permission.name)}
                                                        onCheckedChange={(checked) =>
                                                            handlePermissionChange(permission.name, checked)
                                                        }
                                                    />
                                                    <Label
                                                        htmlFor={`permission-${permission.id}`}
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
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Link
                                    href={route('admin.roles.index')}
                                    className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Cancel
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Role'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
