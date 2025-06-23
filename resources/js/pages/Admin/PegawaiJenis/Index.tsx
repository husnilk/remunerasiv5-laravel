import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, PegawaiJenis } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';

interface PegawaiJenisIndexProps {
    pegawaiJenis: PaginatedResponse<PegawaiJenis>;
    filters: { search?: string };
}

export default function PegawaiJenisIndexPage({ pegawaiJenis, filters }: PegawaiJenisIndexProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentPegawaiJenis, setCurrentPegawaiJenis] = useState<PegawaiJenis | null>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        nama: '',
    });

    const handleSearch = () => {
        router.get(route('data-master.pegawai-jenis.index'), { search: searchTerm }, { preserveState: true });
    };

    const openCreateModal = () => {
        reset();
        setCreateModalOpen(true);
    };

    const openEditModal = (item: PegawaiJenis) => {
        setCurrentPegawaiJenis(item);
        setData({
            nama: item.nama,
        });
        setEditModalOpen(true);
    };

    const openDeleteModal = (item: PegawaiJenis) => {
        setCurrentPegawaiJenis(item);
        setDeleteModalOpen(true);
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('data-master.pegawai-jenis.store'), {
            onSuccess: () => {
                setCreateModalOpen(false);
                toast.success('Jenis Pegawai created successfully.');
            },
            onError: (pageErrors) => {
                if (pageErrors.nama) {
                    toast.error(pageErrors.nama);
                } else {
                    toast.error('Failed to create Jenis Pegawai.');
                }
            },
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentPegawaiJenis) {
            put(route('data-master.pegawai-jenis.update', currentPegawaiJenis.id), {
                onSuccess: () => {
                    setEditModalOpen(false);
                    toast.success('Jenis Pegawai updated successfully.');
                },
                onError: (pageErrors) => {
                     if (pageErrors.nama) {
                        toast.error(pageErrors.nama);
                    } else {
                        toast.error('Failed to update Jenis Pegawai.');
                    }
                },
            });
        }
    };

    const handleDelete = () => {
        if (currentPegawaiJenis) {
            destroy(route('data-master.pegawai-jenis.destroy', currentPegawaiJenis.id), {
                onSuccess: () => {
                    setDeleteModalOpen(false);
                    toast.success('Jenis Pegawai deleted successfully.');
                },
                onError: (pageErrors) => {
                    if (pageErrors && pageErrors.error) {
                        toast.error(pageErrors.error);
                    } else {
                        toast.error('Failed to delete Jenis Pegawai.');
                    }
                },
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Jenis Pegawai" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-4 flex items-center">
                                <Input
                                    type="text"
                                    placeholder="Search jenis pegawai..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="mr-2 max-w-sm"
                                />
                                <Button onClick={handleSearch}>Search</Button>
                            </div>

                            <div className="mb-4 flex justify-end">
                                <Button onClick={openCreateModal}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    New Jenis Pegawai
                                </Button>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pegawaiJenis.data.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.nama}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" onClick={() => openEditModal(item)} className="mr-2">
                                                    <Pencil className="mr-1 h-4 w-4" />
                                                    Edit
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => openDeleteModal(item)}>
                                                    <Trash2 className="mr-1 h-4 w-4" />
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination className="mt-6" links={pegawaiJenis.links} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Dialog */}
            <Dialog open={isCreateModalOpen || isEditModalOpen} onOpenChange={isCreateModalOpen ? setCreateModalOpen : setEditModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{isCreateModalOpen ? 'Create Jenis Pegawai' : 'Edit Jenis Pegawai'}</DialogTitle>
                        <DialogDescription>
                            {isCreateModalOpen ? 'Add a new jenis pegawai to the system.' : 'Update the details of the jenis pegawai.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={isCreateModalOpen ? handleCreate : handleUpdate}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nama" className="text-right">
                                    Nama
                                </Label>
                                <Input id="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} className="col-span-3" />
                                {errors.nama && <p className="col-span-4 text-sm text-red-600">{errors.nama}</p>}
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the jenis pegawai:{' '}
                            <span className="font-semibold">{currentPegawaiJenis?.nama}</span>.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={handleDelete} disabled={processing}>
                            {processing ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
