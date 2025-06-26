import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, Pegawai, BreadcrumbItem } from '@/types'; // Assuming Pegawai type exists
import { Head, Link, router } from '@inertiajs/react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Pagination as ShadcnPagination } from '@/components/pagination'; // Assuming this is your pagination component

interface PegawaiIndexProps {
    pegawais: PaginatedResponse<Pegawai>;
    filters: { search?: string };
    // Add other props if needed, e.g., from controller
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pegawai',
        href: route('admin.pegawai.index'),
    },
];

export default function PegawaiIndexPage({ pegawais, filters }: PegawaiIndexProps) {
    const [searchTerm, setSearchTerm] = React.useState(filters.search || '');

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(route('admin.pegawai.index'), { search: searchTerm }, { preserveState: true, replace: true });
    };

    const columns: ColumnDef<Pegawai>[] = [
        {
            accessorKey: "nama",
            header: "Nama",
        },
        {
            accessorKey: "nip",
            header: "NIP",
        },
        {
            accessorKey: "pegawai_jenis.nama", // Assuming relation is loaded and has 'nama'
            header: "Jenis Pegawai",
            cell: ({ row }) => row.original.pegawai_jenis?.nama || '-', // Handle potential null
        },
        {
            accessorKey: "aktif",
            header: "Status",
            cell: ({ row }) => (row.original.aktif ? "Aktif" : "Tidak Aktif"),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const pegawai = row.original;
                return (
                    <div className="flex space-x-2">
                        <Link href={route('admin.pegawai.edit', pegawai.id)}>
                            <Button variant="outline" size="sm">
                                <Pencil className="mr-1 h-4 w-4" />
                            </Button>
                        </Link>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this pegawai?')) {
                                    router.delete(route('admin.pegawai.destroy', pegawai.id), {
                                       onSuccess: () => {
                                           // Optionally, add a toast notification here
                                       }
                                    });
                                }
                            }}
                        >
                            <Trash2 className="mr-1 h-4 w-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: pegawais.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // For client-side pagination, if needed
        manualPagination: true, // Let Laravel handle pagination
        pageCount: pegawais.last_page,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pegawai" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-semibold tracking-tight">Pegawai</h2>
                    <p className="text-muted-foreground">
                        List pegawai yang terdaftar dalam sistem.
                    </p>

                            <div className="flex justify-between items-center">
                                <form onSubmit={handleSearch} className="mt-4 mb-2 flex items-center space-x-2">
                                    <Input
                                        type="text"
                                        placeholder="Input keyword..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="max-w-md"
                                    />
                                    <Button type="submit">Search</Button>
                                </form>
                                <Link href={route('admin.pegawai.create')}>
                                    <Button>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Tambah Pegawai
                                    </Button>
                                </Link>
                            </div>
                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <div className="mt-4">
                                <ShadcnPagination links={pegawais.links} />
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
