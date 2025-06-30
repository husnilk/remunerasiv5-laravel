import AppLayout from '@/layouts/app-layout';
import { PageProps, PaginatedResponse, KontrakKinerja as KontrakKinerjaType } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, ColumnDef } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/pagination';
import { PlusCircle, Search, Edit, Trash2, Eye } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce'; // Assuming you have a debounce hook
import React, { useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner'; // Assuming you use sonner for toasts

interface IndexPageProps extends PageProps {
    kontrakKinerjas: PaginatedResponse<KontrakKinerjaType>;
    filters: {
        search?: string;
        per_page?: number;
    };
}

export default function Index({ auth, kontrakKinerjas, filters }: IndexPageProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [kontrakToDelete, setKontrakToDelete] = useState<KontrakKinerjaType | null>(null);

    const { delete: destroy, processing: deleting } = useForm();

    useEffect(() => {
        const params: any = { search: debouncedSearchTerm || undefined };
        if (filters.per_page) {
            params.per_page = filters.per_page;
        }
        router.get(route('admin.kontrak-kinerja.index'), params, {
            preserveState: true,
            replace: true,
        });
    }, [debouncedSearchTerm, filters.per_page]);

    const columns: ColumnDef<KontrakKinerjaType>[] = [
        {
            accessorKey: 'pegawai.nama',
            header: 'Pegawai',
            cell: ({ row }) => row.original.pegawai?.nama || 'N/A',
        },
        {
            accessorKey: 'periode.nama',
            header: 'Periode',
            cell: ({ row }) => row.original.periode?.nama || 'N/A',
        },
        {
            accessorKey: 'tahun',
            header: 'Tahun',
        },
        {
            accessorKey: 'bulan_mulai',
            header: 'Bulan Mulai',
        },
        {
            accessorKey: 'bulan_selesai',
            header: 'Bulan Selesai',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                // You might want to map status numbers to human-readable strings
                const statusMap: { [key: number]: string } = {
                    0: 'Draft',
                    1: 'Submitted',
                    2: 'Approved',
                    3: 'Rejected',
                };
                return statusMap[row.original.status] || 'Unknown';
            },
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className='space-x-2'>
                    {/* Implement View page later */}
                    {/* <Link href={route('admin.kontrak-kinerja.show', row.original.id)}>
                        <Button variant='outline' size='sm'>
                            <Eye className='mr-1 h-4 w-4' /> Lihat
                        </Button>
                    </Link> */}
                    <Link href={route('admin.kontrak-kinerja.edit', row.original.id)}>
                        <Button variant='outline' size='sm'>
                            <Edit className='mr-1 h-4 w-4' /> Ubah
                        </Button>
                    </Link>
                    <Button
                        variant='destructive'
                        size='sm'
                        onClick={() => {
                            setKontrakToDelete(row.original);
                            setShowDeleteDialog(true);
                        }}
                    >
                        <Trash2 className='mr-1 h-4 w-4' /> Hapus
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: kontrakKinerjas.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true, // Server-side pagination
        pageCount: kontrakKinerjas.last_page,
        state: {
            pagination: {
                pageIndex: kontrakKinerjas.current_page - 1,
                pageSize: kontrakKinerjas.per_page,
            },
        },
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                const newPaginationState = updater({
                    pageIndex: kontrakKinerjas.current_page - 1,
                    pageSize: kontrakKinerjas.per_page,
                });
                router.get(
                    route('admin.kontrak-kinerja.index'),
                    {
                        ...filters,
                        page: newPaginationState.pageIndex + 1,
                        per_page: newPaginationState.pageSize,
                    },
                    { preserveState: true, replace: true },
                );
            }
        },
    });

    const handleDelete = () => {
        if (kontrakToDelete) {
            destroy(route('admin.kontrak-kinerja.destroy', kontrakToDelete.id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Kontrak Kinerja berhasil dihapus.');
                    setShowDeleteDialog(false);
                    setKontrakToDelete(null);
                    router.reload({ only: ['kontrakKinerjas'] });
                },
                onError: () => {
                    toast.error('Gagal menghapus Kontrak Kinerja.');
                    setShowDeleteDialog(false);
                },
            });
        }
    };

    return (
        <AppLayout user={auth.user} currentRole={auth.currentRole}>
            <Head title='Manajemen Kontrak Kinerja' />
            <div className='space-y-4 p-4 md:p-6'>
                <div className='flex flex-col items-start justify-between gap-2 md:flex-row md:items-center'>
                    <h1 className='text-2xl font-bold'>Manajemen Kontrak Kinerja</h1>
                    <Link href={route('admin.kontrak-kinerja.create')}>
                        <Button>
                            <PlusCircle className='mr-2 h-4 w-4' /> Tambah Kontrak Kinerja
                        </Button>
                    </Link>
                </div>

                <div className='flex items-center'>
                    <div className='relative w-full max-w-sm'>
                        <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                        <Input
                            type='search'
                            placeholder='Cari berdasarkan pegawai, periode, tahun...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='pl-8'
                        />
                    </div>
                </div>

                <div className='rounded-md border'>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                                        Tidak ada data.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {kontrakKinerjas.total > 0 && <Pagination meta={kontrakKinerjas} links={kontrakKinerjas.links} />}
            </div>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Ini akan menghapus Kontrak Kinerja secara permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setKontrakToDelete(null)}>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={deleting} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>
                            {deleting ? 'Menghapus...' : 'Hapus'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
