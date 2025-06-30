import Heading from '@/components/heading';
import { Button } from '@/components/ui/button'; // Added Button
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types'; // Added Users icon for Roles button
import { Head, Link } from '@inertiajs/react'; // Added Link
import { Users } from 'lucide-react';

interface Permission {
    id: number;
    name: string;
    guard_name: string;
}

interface Props {
    permissions: Permission[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/admin/roles/',
    },
    {
        title: 'Permissions',
        href: '/admin/permissions',
    },
];

export default function PermissionsIndex({ permissions }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />
            <Heading title="Permissions" description="List of all permissions in the system" />

            <div className="mb-4 flex justify-end">
                <Link href={route('admin.roles.index')}>
                    <Button variant="default">
                        <Users className="mr-2 h-4 w-4" /> Roles
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
        </AppLayout>
    );
}
