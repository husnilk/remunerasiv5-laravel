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
import { PaginatedResponse, PegawaiIkatan, BreadcrumbItem } from '@/types'; // Added PegawaiIkatan
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Pencil, PlusCircle, Trash2, Users2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PegawaiIkatanIndexProps {
    pegawaiIkatans: PaginatedResponse<PegawaiIkatan>; // Changed from units
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


export default function PegawaiIkatanIndexPage({ pegawaiIkatans, filters }: PegawaiIkatanIndexProps) {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentPegawaiIkatan, setCurrentPegawaiIkatan] = useState<PegawaiIkatan | null>(null); // Changed from currentUnit

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        nama: '', // Changed from unit fields
    });

    const openCreateModal = () => {
        reset();
        setCreateModalOpen(true);
    };

    const openEditModal = (pegawaiIkatan: PegawaiIkatan) => { // Changed from unit
        setCurrentPegawaiIkatan(pegawaiIkatan); // Changed from setCurrentUnit
        setData({
            nama: pegawaiIkatan.nama, // Changed from unit fields
        });
        setEditModalOpen(true);
    };

    const openDeleteModal = (pegawaiIkatan: PegawaiIkatan) => { // Changed from unit
        setCurrentPegawaiIkatan(pegawaiIkatan); // Changed from setCurrentUnit
        setDeleteModalOpen(true);
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.pegawai-ikatan.store'), { // Changed route
            onSuccess: () => {
                setCreateModalOpen(false);
                toast.success('Pegawai Ikatan created successfully.'); // Changed message
            },
            onError: (pageErrors) => {
                if (pageErrors.nama) {
                    toast.error(pageErrors.nama);
                } else {
                    toast.error('Failed to create Pegawai Ikatan.'); // Changed message
                }
            },
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentPegawaiIkatan) {
            put(route('admin.pegawai-ikatan.update', currentPegawaiIkatan.id), { // Changed route
                onSuccess: () => {
                    setEditModalOpen(false);
                    toast.success('Pegawai Ikatan updated successfully.'); // Changed message
                },
                onError: (pageErrors) => {
                    if (pageErrors.nama) {
                        toast.error(pageErrors.nama);
                    } else {
                        toast.error('Failed to update Pegawai Ikatan.'); // Changed message
                    }
                },
            });
        }
    };

    const handleDelete = () => {
        if (currentPegawaiIkatan) {
            destroy(route('admin.pegawai-ikatan.destroy', currentPegawaiIkatan.id), { // Changed route
                onSuccess: () => {
                    setDeleteModalOpen(false);
                    toast.success('Pegawai Ikatan deleted successfully.'); // Changed message
                },
                onError: (pageErrors: any) => { // Added type for pageErrors
                    if (pageErrors && pageErrors.error) {
                        toast.error(pageErrors.error);
                    } else {
                        toast.error('Failed to delete Pegawai Ikatan.'); // Changed message
                    }
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Pegawai Ikatan" /> {/* Changed title */}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-semibold tracking-tight">Ikatan Kerja Pegawai</h2>
                    <p className="text-muted-foreground">Kelola jenis ikatan kerja pegawai.</p>

                            <div className="mb-4 flex gap-2 justify-end">
                                <Button onClick={openCreateModal} variant="outline">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Tambah Jenis Ikatan Kerja
                                </Button>
                                <Link href={route('admin.pegawai-jenis.index')}>
                                    <Button variant="default">
                                        <Users2 className="mr-2 h-4 w-4" /> Jenis Pegawai
                                    </Button>
                                </Link>
                            </div>

                            <Card>
                                <CardContent>

                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nama</TableHead> {/* Changed table header */}
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {pegawaiIkatans.data.map((pegawaiIkatan) => ( // Changed variable name
                                                <TableRow key={pegawaiIkatan.id}>
                                                    <TableCell>{pegawaiIkatan.nama}</TableCell> {/* Changed data field */}
                                                    <TableCell className="text-right">
                                                        <Button variant="outline" size="sm" onClick={() => openEditModal(pegawaiIkatan)} className="mr-2"> {/* Changed handler */}
                                                            <Pencil className="mr-1 h-4 w-4" />
                                                        </Button>
                                                        <Button variant="destructive" size="sm" onClick={() => openDeleteModal(pegawaiIkatan)}> {/* Changed handler */}
                                                            <Trash2 className="mr-1 h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <Pagination className="mt-6" links={pegawaiIkatans.links} /> {/* Changed variable name */}
                                </CardContent>
                            </Card>

                        </div>
            </div>

            {/* Create/Edit Dialog */}
            <Dialog open={isCreateModalOpen || isEditModalOpen} onOpenChange={isCreateModalOpen ? setCreateModalOpen : setEditModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{isCreateModalOpen ? 'Create Pegawai Ikatan' : 'Edit Pegawai Ikatan'}</DialogTitle> {/* Changed title */}
                        <DialogDescription>
                            {isCreateModalOpen ? 'Add a new pegawai ikatan to the system.' : 'Update the details of the pegawai ikatan.'} {/* Changed description */}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={isCreateModalOpen ? handleCreate : handleUpdate}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nama" className="text-right"> {/* Changed label */}
                                    Nama
                                </Label>
                                <Input id="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} className="col-span-3" /> {/* Changed field */}
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
                            This action cannot be undone. This will permanently delete the pegawai ikatan:{' '} {/* Changed description */}
                            <span className="font-semibold">{currentPegawaiIkatan?.nama}</span>. {/* Changed variable */}
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
