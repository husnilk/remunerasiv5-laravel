import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginatedResponse, PegawaiIkatanKerja, PegawaiJenis } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2, Users2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface PegawaiJenisIndexProps {
    pegawaiJenis: PaginatedResponse<PegawaiJenis>;
    pegawaiIkatanKerjas: PegawaiIkatanKerja[];
    filters: { search?: string };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jenis Pegawai',
        href: route('admin.pegawai-jenis.index')
    },
    {
        title: 'Ikatan Kerja',
        href: route('admin.pegawai-ikatan.index')
    }
];

export default function PegawaiJenisIndexPage({ pegawaiJenis, pegawaiIkatanKerjas, filters }: PegawaiJenisIndexProps) {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentPegawaiJenis, setCurrentPegawaiJenis] = useState<PegawaiJenis | null>(null);

    const initialFormValues = {
        nama: '',
        kode: '',
        pegawai_ikatan_id: '',
        jenis: '',
        has_remun: true,
    };

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm(initialFormValues);

    useEffect(() => {
        // Clear errors when modal closes
        if (!isCreateModalOpen && !isEditModalOpen) {
            clearErrors();
        }
    }, [isCreateModalOpen, isEditModalOpen]);


    const openCreateModal = () => {
        reset();
        setCreateModalOpen(true);
    };

    const openEditModal = (item: PegawaiJenis) => {
        setCurrentPegawaiJenis(item);
        setData({
            nama: item.nama,
            kode: item.kode,
            pegawai_ikatan_id: item.pegawai_ikatan_id ? String(item.pegawai_ikatan_id) : '',
            jenis: item.jenis,
            has_remun: item.has_remun,
        });
        setEditModalOpen(true);
    };

    const openDeleteModal = (item: PegawaiJenis) => {
        setCurrentPegawaiJenis(item);
        setDeleteModalOpen(true);
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.pegawai-jenis.store'), {
            onSuccess: () => {
                setCreateModalOpen(false);
                toast.success('Jenis Pegawai created successfully.');
            },
            onError: (pageErrors: any) => {
                // Display all errors from the server
                Object.values(pageErrors).forEach((error: any) => {
                    toast.error(error);
                });
                if (Object.keys(pageErrors).length === 0) {
                    toast.error('Failed to create Jenis Pegawai. Please check the form for errors.');
                }
            },
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentPegawaiJenis) {
            put(route('admin.pegawai-jenis.update', currentPegawaiJenis.id), {
                onSuccess: () => {
                    setEditModalOpen(false);
                    toast.success('Jenis Pegawai updated successfully.');
                },
                onError: (pageErrors: any) => {
                    // Display all errors from the server
                    Object.values(pageErrors).forEach((error: any) => {
                        toast.error(error);
                    });
                    if (Object.keys(pageErrors).length === 0) {
                        toast.error('Failed to update Jenis Pegawai. Please check the form for errors.');
                    }
                },
            });
        }
    };

    const handleDelete = () => {
        if (currentPegawaiJenis) {
            destroy(route('admin.pegawai-jenis.destroy', currentPegawaiJenis.id), {
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
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Jenis Pegawai" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-semibold tracking-tight">Employee Type</h2>
                    <p className="text-muted-foreground">Manage employee types in the system.</p>
                    <div className="mb-4 flex gap-2 justify-end">
                        <Button onClick={openCreateModal} variant="outline">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Jenis Pegawai
                        </Button>
                        <Link href={route('admin.pegawai-ikatan.index')}>
                            <Button variant="default">
                                <Users2 className="mr-2 h-4 w-4" /> Ikatan Kerja
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Kode</TableHead>
                                        <TableHead>Ikatan Pegawai</TableHead>
                                        <TableHead>Jenis</TableHead>
                                        <TableHead>Remunerasi</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pegawaiJenis.data.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.nama}</TableCell>
                                            <TableCell>{item.kode}</TableCell>
                                            <TableCell>{item.pegawai_ikatan?.nama ?? '-'}</TableCell>
                                            <TableCell>{item.jenis}</TableCell>
                                            <TableCell>{item.has_remun ? 'Ya' : 'Tidak'}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" onClick={() => openEditModal(item)} className="mr-2">
                                                    <Pencil className="mr-1 h-4 w-4" />
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => openDeleteModal(item)}>
                                                    <Trash2 className="mr-1 h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination className="mt-6" links={pegawaiJenis.links} />
                        </CardContent>
                    </Card>
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
                        <div className="grid gap-6 py-4">
                            {' '}
                            {/* Increased gap */}
                            {/* Nama Field */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nama" className="text-right">
                                    Nama
                                </Label>
                                <Input id="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} className="col-span-3" />
                                {errors.nama && <p className="col-span-4 text-right text-sm text-red-600">{errors.nama}</p>}
                            </div>
                            {/* Kode Field */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="kode" className="text-right">
                                    Kode
                                </Label>
                                <Input id="kode" value={data.kode} onChange={(e) => setData('kode', e.target.value)} className="col-span-3" />
                                {errors.kode && <p className="col-span-4 text-right text-sm text-red-600">{errors.kode}</p>}
                            </div>
                            {/* Pegawai Ikatan Field */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="pegawai_ikatan_id" className="text-right">
                                    Ikatan Pegawai
                                </Label>
                                <Select value={data.pegawai_ikatan_id} onValueChange={(value) => setData('pegawai_ikatan_id', value)}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Pilih Ikatan Pegawai" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {pegawaiIkatanKerjas.map((ikatan) => (
                                            <SelectItem key={ikatan.id} value={String(ikatan.id)}>
                                                {ikatan.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.pegawai_ikatan_id && <p className="col-span-4 text-right text-sm text-red-600">{errors.pegawai_ikatan_id}</p>}
                            </div>
                            {/* Jenis Pegawai Field */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="jenis" className="text-right">
                                    Jenis Pegawai
                                </Label>
                                <Select value={data.jenis} onValueChange={(value) => setData('jenis', value)}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Pilih Jenis" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Dosen">Dosen</SelectItem>
                                        <SelectItem value="Tendik">Tendik</SelectItem>
                                        <SelectItem value="Pegawai Lainnya">Pegawai Lainnya</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.jenis && <p className="col-span-4 text-right text-sm text-red-600">{errors.jenis}</p>}
                            </div>
                            {/* Has Remun Field */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="has_remun" className="text-right">
                                    Remunerasi
                                </Label>
                                <div className="col-span-3 flex items-center">
                                    <Checkbox
                                        id="has_remun"
                                        checked={data.has_remun}
                                        onCheckedChange={(checked) => setData('has_remun', !!checked)}
                                    />
                                    <label htmlFor="has_remun" className="ml-2 text-sm">
                                        Ada Remunerasi
                                    </label>
                                </div>
                                {errors.has_remun && <p className="col-span-4 text-right text-sm text-red-600">{errors.has_remun}</p>}
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
