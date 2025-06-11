import AppLayout from '@/layouts/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

interface Permission {
    id: number;
    name: string;
    guard_name: string;
}

interface Props {
    permissions: Permission[];
}

export default function PermissionsIndex({ permissions }: Props) {
    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Available Permissions
                </h2>
            }
        >
            <Head title="Permissions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Permissions List</CardTitle>
                            <CardDescription>
                                These are the permissions available in the system. They are typically managed via database seeders.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Guard</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {permissions.map((permission) => (
                                        <TableRow key={permission.id}>
                                            <TableCell>{permission.name}</TableCell>
                                            <TableCell>{permission.guard_name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {permissions.length === 0 && <p className="mt-4 text-center">No permissions found. Consider running seeders.</p>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
