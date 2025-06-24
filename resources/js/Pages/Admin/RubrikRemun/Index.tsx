import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { User, PaginatedResponse, RubrikRemun } from '@/types'; // Adjusted imports
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import React, { FormEventHandler, useEffect, useState } from 'react';
import { InputError } from '@/components/input-error';
import { Pagination } from '@/components/pagination';
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
import { toast } from 'sonner'; // Assuming sonner is installed for notifications

// Define props structure based on what Laravel Inertia typically sends
interface RubrikRemunIndexPageProps {
    auth: { user: User }; // Assuming User type is globally available from @/types
    rubrikRemuns: PaginatedResponse<RubrikRemun>; // Using global PaginatedResponse
    filters: { search?: string };
    flash?: { // Optional flash messages
        success?: string;
        error?: string;
    };
    [key: string]: any; // For other props Inertia might pass
}

type RubrikRemunForm = {
    id?: number;
    nama: string;
    active: boolean;
};

export default function RubrikRemunIndex({ auth, rubrikRemuns, filters, flash }: RubrikRemunIndexPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<RubrikRemun | null>(null);

    const { data, setData, post, put, errors, reset, processing, recentlySuccessful } =
        useForm<RubrikRemunForm>({
            nama: '',
            active: true,
        });

    const openModal = (item: RubrikRemun | null = null) => {
        reset();
        if (item) {
            setCurrentItem(item);
            setData({ id: item.id, nama: item.nama, active: !!item.active });
        } else {
            setCurrentItem(null);
            setData({ nama: '', active: true });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
        reset();
    };

    const openDeleteConfirm = (item: RubrikRemun) => {
        setCurrentItem(item);
        setIsDeleteConfirmOpen(true);
    };

    const closeDeleteConfirm = () => {
        setIsDeleteConfirmOpen(false);
        setCurrentItem(null);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                closeModal();
                toast.success(currentItem ? 'Rubrik Remun berhasil diperbarui.' : 'Rubrik Remun berhasil ditambahkan.');
            },
            onError: () => {
                toast.error('Terjadi kesalahan. Silahkan coba lagi.');
            }
        };

        if (currentItem && currentItem.id) {
            put(route('admin.rubrik-remun.update', currentItem.id), options);
        } else {
            post(route('admin.rubrik-remun.store'), options);
        }
    };

    const handleDelete = () => {
        if (currentItem && currentItem.id) {
            router.delete(route('admin.rubrik-remun.destroy', currentItem.id), {
                onSuccess: () => {
                    toast.success('Rubrik Remun berhasil dihapus.');
                    closeDeleteConfirm();
                },
                onError: () => {
                    toast.error('Gagal menghapus Rubrik Remun.');
                    closeDeleteConfirm();
                }
            });
        }
    };

    useEffect(() => {
        if (flash?.success) {
            // This is an alternative way to show messages if not using sonner on post/put/delete directly
            // toast.success(flash.success);
        }
        if (flash?.error) {
            // toast.error(flash.error);
        }
    }, [flash]);


    return (
        <AppLayout user={auth.user} header={ <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'> Manajemen Rubrik Remun </h2>}>
            <Head title='Manajemen Rubrik Remun' />

            <div className='py-12'>
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
                        <div className='p-6 text-gray-900 dark:text-gray-100'>
                            <div className='flex justify-between items-center mb-6'>
                                <h3 className='text-lg font-medium'>Daftar Rubrik Remun</h3>
                                <Button onClick={() => openModal()} size='sm'>
                                    <IconPlus className='mr-2 h-4 w-4' />
                                    Tambah Rubrik Remun
                                </Button>
                            </div>

                            {/* TODO: Add search filter input here if needed, using filters.search */}

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='w-[100px]'>ID</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className='text-right w-[150px]'>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rubrikRemuns.data.length > 0 ? (
                                        rubrikRemuns.data.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell className='font-medium'>{item.nama}</TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                            item.active
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                        }`}
                                                    >
                                                        {item.active ? 'Aktif' : 'Tidak Aktif'}
                                                    </span>
                                                </TableCell>
                                                <TableCell className='text-right space-x-2'>
                                                    <Button
                                                        variant='outline'
                                                        size='icon'
                                                        onClick={() => openModal(item)}
                                                    >
                                                        <IconEdit className='h-4 w-4' />
                                                    </Button>
                                                    <Button
                                                        variant='destructive'
                                                        size='icon'
                                                        onClick={() => openDeleteConfirm(item)}
                                                    >
                                                        <IconTrash className='h-4 w-4' />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className='text-center'>
                                                Tidak ada data.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            {rubrikRemuns.data.length > 0 && <Pagination links={rubrikRemuns.links} className='mt-6' />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className='sm:max-w-md' onInteractOutside={(e) => { if (processing) e.preventDefault(); }}>
                    <DialogHeader>
                        <DialogTitle>
                            {currentItem ? 'Edit Rubrik Remun' : 'Tambah Rubrik Remun'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <Label htmlFor='nama'>Nama Rubrik</Label>
                            <Input
                                id='nama'
                                name='nama'
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                className='mt-1 block w-full'
                                disabled={processing}
                            />
                            <InputError message={errors.nama} className='mt-2' />
                        </div>
                        <div className='flex items-center space-x-2 mt-4'>
                            <Checkbox
                                id='active'
                                name='active'
                                checked={data.active}
                                onCheckedChange={(checked) => setData('active', !!checked)}
                                disabled={processing}
                            />
                            <Label htmlFor='active' className='font-normal'>
                                Aktif
                            </Label>
                        </div>
                        <InputError message={errors.active} className='mt-2' />

                        <DialogFooter className='mt-8'>
                            <DialogClose asChild>
                                <Button type='button' variant='outline' disabled={processing}>
                                    Batal
                                </Button>
                            </DialogClose>
                            <Button type='submit' disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Anda yakin ingin menghapus?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Ini akan menghapus Rubrik Remun secara permanen.
                            Data yang akan dihapus: <span className='font-semibold'>{currentItem?.nama}</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={closeDeleteConfirm}>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className='bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
                            disabled={processing}
                        >
                            {processing ? 'Menghapus...' : 'Ya, Hapus'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
