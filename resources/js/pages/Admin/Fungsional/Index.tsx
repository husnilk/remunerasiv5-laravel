import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { PaginatedResponse, Fungsional, BreadcrumbItem } from '@/types'; // Ensure Fungsional type is defined in @/types
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Pencil, PlusCircle, ShieldCheck, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FungsionalsIndexProps {
    fungsionals: PaginatedResponse<Fungsional>;
    filters: { search?: string };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jabatan Fungsional',
        href: route('admin.fungsionals.index'),
    },
];

// Make sure Fungsional type is defined in '@/types/index.d.ts'
// type Fungsional = {
//     id: string | number; // Adjust based on your ID type
//     nama: string;
//     kode: string;
//     grade: number | null;
//     job_value: number | null;
//     active: boolean;
//     // Add other fields if necessary
// };

export default function FungsionalsIndexPage({ fungsionals, filters }: FungsionalsIndexProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentFungsional, setCurrentFungsional] = useState<Fungsional | null>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        nama: '',
        kode: '',
        grade: null as number | null, // Initialize with null and correct type
        job_value: null as number | null, // Initialize with null and correct type
        active: true,
    });

    const handleSearch = () => {
        router.get(route('data-master.fungsionals.index'), { search: searchTerm }, { preserveState: true });
    };

    const openCreateModal = () => {
        reset();
        setData('active', true); // Default for new entries
        setCreateModalOpen(true);
    };

    const openEditModal = (fungsional: Fungsional) => {
        setCurrentFungsional(fungsional);
        setData({
            nama: fungsional.nama,
            kode: fungsional.kode,
            grade: fungsional.grade,
            job_value: fungsional.job_value,
            active: fungsional.active,
        });
        setEditModalOpen(true);
    };

    const openDeleteModal = (fungsional: Fungsional) => {
        setCurrentFungsional(fungsional);
        setDeleteModalOpen(true);
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('data-master.fungsionals.store'), {
            onSuccess: () => {
                setCreateModalOpen(false);
                toast.success('Fungsional created successfully.');
            },
            onError: (pageErrors) => {
                console.error(pageErrors);
                toast.error('Failed to create fungsional.');
            },
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentFungsional) {
            put(route('data-master.fungsionals.update', currentFungsional.id), {
                onSuccess: () => {
                    setEditModalOpen(false);
                    toast.success('Fungsional updated successfully.');
                },
                onError: (pageErrors) => {
                    console.error(pageErrors);
                    toast.error('Failed to update fungsional.');
                },
            });
        }
    };

    const handleDelete = () => {
        if (currentFungsional) {
            destroy(route('data-master.fungsionals.destroy', currentFungsional.id), {
                onSuccess: () => {
                    setDeleteModalOpen(false);
                    toast.success('Fungsional deleted successfully.');
                },
                onError: (pageErrors) => {
                    if (pageErrors && (pageErrors as any).error) { // Type assertion for error checking
                        toast.error((pageErrors as any).error);
                    } else {
                        toast.error('Failed to delete fungsional.');
                    }
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fungsional" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-semibold tracking-tight">Jabatan Fungsional</h2>
                    <p className="text-muted-foreground">Manage jabatan fungsional lecturers</p>
                            <div className="mb-4 flex justify-end">
                                <Button onClick={openCreateModal}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    New Fungsional
                                </Button>

                            </div>

                            <Card>
                                <CardContent>

                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Kode</TableHead>
                                                <TableHead>Nama</TableHead>
                                                <TableHead>Grade</TableHead>
                                                <TableHead>Job Value</TableHead>
                                                <TableHead>Status Aktif</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {fungsionals.data.map((fungsional) => (
                                                <TableRow key={fungsional.id}>
                                                    <TableCell>{fungsional.kode}</TableCell>
                                                    <TableCell>{fungsional.nama}</TableCell>
                                                    <TableCell>{fungsional.grade ?? '-'}</TableCell>
                                                    <TableCell>{fungsional.job_value ?? '-'}</TableCell>
                                                    <TableCell>{fungsional.active ? 'Aktif' : 'Non-Aktif'}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="outline" size="sm" onClick={() => openEditModal(fungsional)} className="mr-2">
                                                            <Pencil className="mr-1 h-4 w-4" />
                                                            Edit
                                                        </Button>
                                                        <Button variant="destructive" size="sm" onClick={() => openDeleteModal(fungsional)}>
                                                            <Trash2 className="mr-1 h-4 w-4" />
                                                            Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <Pagination className="mt-6" links={fungsionals.links} />
                                </CardContent>
                            </Card>
                        </div>
            </div>

            {/* Create/Edit Dialog */}
            <Dialog open={isCreateModalOpen || isEditModalOpen} onOpenChange={isCreateModalOpen ? setCreateModalOpen : setEditModalOpen}>
                <DialogContent className="sm:max-w-lg"> {/* Adjusted width */}
                    <DialogHeader>
                        <DialogTitle>{isCreateModalOpen ? 'Create Fungsional' : 'Edit Fungsional'}</DialogTitle>
                        <DialogDescription>
                            {isCreateModalOpen ? 'Add a new fungsional to the system.' : 'Update the details of the fungsional.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={isCreateModalOpen ? handleCreate : handleUpdate}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="kode" className="text-right">Kode</Label>
                                <Input id="kode" value={data.kode} onChange={(e) => setData('kode', e.target.value)} className="col-span-3" />
                                {errors.kode && <p className="col-span-4 text-sm text-red-600 text-right">{errors.kode}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nama" className="text-right">Nama</Label>
                                <Input id="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} className="col-span-3" />
                                {errors.nama && <p className="col-span-4 text-sm text-red-600 text-right">{errors.nama}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="grade" className="text-right">Grade</Label>
                                <Input id="grade" type="number" value={data.grade ?? ''} onChange={(e) => setData('grade', e.target.value ? parseInt(e.target.value) : null)} className="col-span-3" />
                                {errors.grade && <p className="col-span-4 text-sm text-red-600 text-right">{errors.grade}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="job_value" className="text-right">Job Value</Label>
                                <Input id="job_value" type="number" value={data.job_value ?? ''} onChange={(e) => setData('job_value', e.target.value ? parseInt(e.target.value) : null)} className="col-span-3" />
                                {errors.job_value && <p className="col-span-4 text-sm text-red-600 text-right">{errors.job_value}</p>}
                            </div>
                            <div className="col-span-4 flex items-center space-x-2 justify-end">
                                <Checkbox id="active" checked={data.active} onCheckedChange={(checked) => setData('active', !!checked)} />
                                <Label htmlFor="active" className="font-normal">Aktif</Label>
                                {errors.active && <p className="text-sm text-red-600">{errors.active}</p>}
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
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
                            This action cannot be undone. This will permanently delete the fungsional:{' '}
                            <span className="font-semibold">{currentFungsional?.nama}</span>.
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
