import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { columns } from '@/pages/Admin/Pegawai/columns';
import { DataTable } from '@/pages/Admin/Pegawai/data-table';
import { BreadcrumbItem, PaginatedResponse, Pegawai } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusCircle, ShieldCheck } from 'lucide-react';

interface IndexPageProps {
    pegawais: PaginatedResponse<Pegawai>;
    filters: { search?: string };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pegawai',
        href: route('admin.pegawai.index'),
    },
];

export default function Index({ pegawais }: IndexPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pegawai" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-semibold tracking-tight">Pegawai</h2>
                    <p className="text-muted-foreground">Manage data pegawai.</p>
                    <div className="mb-4 flex justify-end gap-2">
                        <Button variant="outline">
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Role
                        </Button>
                        <Link href={route('admin.permissions.index')}>
                            <Button variant="default">
                                <ShieldCheck className="mr-2 h-4 w-4" /> Permissions
                            </Button>
                        </Link>
                    </div>
                    <DataTable columns={columns} data={pegawais} />
                </div>
            </div>
        </AppLayout>
    );
}
