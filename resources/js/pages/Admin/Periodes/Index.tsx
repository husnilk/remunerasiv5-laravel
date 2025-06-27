import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Periode, PeriodesIndexProps } from '@/types/periode';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IconEdit, IconPlus, IconTrash, IconCheck, IconX } from '@tabler/icons-react'; // Assuming Tabler icons are used
import Pagination from '@/components/pagination'; // Assuming Pagination component exists
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner'; // Assuming sonner for toast notifications

export default function IndexPeriodePage({ auth, periodes: periodesPaginator, flash }: PageProps<PeriodesIndexProps>) {
    const { props } = usePage<PageProps<PeriodesIndexProps>>();
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [periodeToDelete, setPeriodeToDelete] = useState<Periode | null>(null);

    useEffect(() => {
        if (props.flash?.success) {
            toast.success(props.flash.success);
        }
        if (props.flash?.error) {
            toast.error(props.flash.error);
        }
    }, [props.flash]);


    const handleDeletePeriode = () => {
        if (periodeToDelete) {
            router.delete(route('admin.periodes.destroy', periodeToDelete.id), {
                onSuccess: () => {
                    toast.success(`Periode "${periodeToDelete.nama}" berhasil dihapus.`);
                    setShowDeleteAlert(false);
                    setPeriodeToDelete(null);
                },
                onError: (errors) => {
                    const errorMessages = Object.values(errors).join(', ');
                    toast.error(errorMessages || `Gagal menghapus periode "${periodeToDelete.nama}".`);
                    setShowDeleteAlert(false);
                }
            });
        }
    };

    const openDeleteAlert = (periode: Periode) => {
        if (periode.aktif) {
            toast.error("Periode yang sedang aktif tidak dapat dihapus.");
            return;
        }
        setPeriodeToDelete(periode);
        setShowDeleteAlert(true);
    };

    const handleActivate = (periode: Periode) => {
        router.post(route('admin.periodes.activate', periode.id), {}, {
            onSuccess: () => toast.success(`Periode "${periode.nama}" berhasil diaktifkan.`),
            onError: (errors) => toast.error(Object.values(errors).join(', ') || `Gagal mengaktifkan periode.`),
        });
    };

    const handleDeactivate = (periode: Periode) => {
        router.post(route('admin.periodes.deactivate', periode.id), {}, {
            onSuccess: () => toast.success(`Periode "${periode.nama}" berhasil dinonaktifkan.`),
            onError: (errors) => toast.error(Object.values(errors).join(', ') || `Gagal menonaktifkan periode.`),
        });
    };

    const { data: periodes, links } = periodesPaginator;

    return (
        <AppLayout user={auth.user} header="Manajemen Periode">
            <Head title="Daftar Periode" />

            <div className="py-6 md:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Daftar Periode</h2>
                        <Button asChild>
                            <Link href={route('admin.periodes.create')}>
                                <IconPlus className="mr-2 h-4 w-4" /> Tambah Periode Baru
                            </Link>
                        </Button>
                    </div>

                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Periode</TableHead>
                                    <TableHead className="text-center">Tahun</TableHead>
                                    <TableHead className="text-center">Periode</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tgl Mulai</TableHead>
                                    <TableHead>Tgl Selesai</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {periodes.length > 0 ? (
                                    periodes.map((periode) => (
                                        <TableRow key={periode.id}>
                                            <TableCell className="font-medium">{periode.nama}</TableCell>
                                            <TableCell className="text-center">{periode.tahun}</TableCell>
                                            <TableCell className="text-center">{periode.periode}</TableCell>
                                            <TableCell>
                                                {periode.aktif ? (
                                                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">Aktif</Badge>
                                                ) : (
                                                    <Badge variant="outline">Tidak Aktif</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>{periode.tgl_mulai ? new Date(periode.tgl_mulai).toLocaleDateString('id-ID') : '-'}</TableCell>
                                            <TableCell>{periode.tgl_selesai ? new Date(periode.tgl_selesai).toLocaleDateString('id-ID') : '-'}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                {periode.aktif ? (
                                                    <Button variant="outline" size="sm" onClick={() => handleDeactivate(periode)}>
                                                        <IconX className="mr-1 h-4 w-4" /> Nonaktifkan
                                                    </Button>
                                                ) : (
                                                    <Button variant="default" size="sm" onClick={() => handleActivate(periode)} className="bg-blue-500 hover:bg-blue-600">
                                                        <IconCheck className="mr-1 h-4 w-4" /> Aktifkan
                                                    </Button>
                                                )}
                                                <Button variant="outline" size="icon" asChild>
                                                    <Link href={route('admin.periodes.edit', periode.id)}>
                                                        <IconEdit className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => openDeleteAlert(periode)}
                                                    disabled={!!periode.aktif} // Disable if active
                                                >
                                                    <IconTrash className="h-4 w-4" />
                                                    <span className="sr-only">Hapus</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Tidak ada data periode.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {links && <Pagination links={links} className="mt-6" />}
                </div>
            </div>

            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Ini akan menghapus periode
                            <span className="font-semibold"> {periodeToDelete?.nama} </span> secara permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setPeriodeToDelete(null)}>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeletePeriode} className="bg-red-600 hover:bg-red-700">
                            Ya, Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </AppLayout>
    );
}
