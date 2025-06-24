import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { PageProps, Paginated, RubrikKategori, RubrikRemun } from '@/types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button, buttonVariants } from '@/components/ui/button';
import { Pagination } from '@/components/pagination';
import { Input } from '@/components/ui/input';
import { FormEvent, useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { PencilIcon, PlusCircle, Search, TrashIcon } from 'lucide-react';

type RubrikKategoriProps = RubrikKategori & {
    rubrik_remun: RubrikRemun;
};

type IndexPageProps = PageProps<{
    rubrikKategoris: Paginated<RubrikKategoriProps>;
    rubrikRemuns: RubrikRemun[];
    filters: { search?: string };
}>;

export default function Index({ auth, rubrikKategoris, rubrikRemuns, filters }: IndexPageProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentRubrikKategori, setCurrentRubrikKategori] = useState<RubrikKategoriProps | null>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        nama: '',
        kode: '',
        rubrik_remun_id: '',
    });

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(route('admin.rubrik-kategori.index'), { search }, { preserveState: true });
    };

    const openCreateModal = () => {
        reset();
        clearErrors();
        setShowCreateModal(true);
    };

    const openEditModal = (rk: RubrikKategoriProps) => {
        setData({
            nama: rk.nama,
            kode: rk.kode,
            rubrik_remun_id: rk.rubrik_remun_id.toString(),
        });
        setCurrentRubrikKategori(rk);
        clearErrors();
        setShowEditModal(true);
    };

    const openDeleteModal = (rk: RubrikKategoriProps) => {
        setCurrentRubrikKategori(rk);
        setShowDeleteModal(true);
    };

    const handleCreate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('admin.rubrik-kategori.store'), {
            onSuccess: () => {
                setShowCreateModal(false);
                reset();
            },
            preserveScroll: true,
        });
    };

    const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentRubrikKategori) {
            put(route('admin.rubrik-kategori.update', currentRubrikKategori.id), {
                onSuccess: () => {
                    setShowEditModal(false);
                    reset();
                    setCurrentRubrikKategori(null);
                },
                preserveScroll: true,
            });
        }
    };

    const handleDelete = () => {
        if (currentRubrikKategori) {
            destroy(route('admin.rubrik-kategori.destroy', currentRubrikKategori.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setCurrentRubrikKategori(null);
                },
                preserveScroll: true,
            });
        }
    };

    useEffect(() => {
        // Prefill form when editing, but only if not processing to avoid race conditions
        if (showEditModal && currentRubrikKategori && !processing) {
            setData({
                nama: currentRubrikKategori.nama,
                kode: currentRubrikKategori.kode,
                rubrik_remun_id: currentRubrikKategori.rubrik_remun_id.toString(),
            });
        }
    }, [showEditModal, currentRubrikKategori]);


    return (
        <AppLayout >
            <Head title='Rubrik Kategori' />

            <div className='py-12'>
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
                        <div className='p-6 text-gray-900 dark:text-gray-100'>
                            <div className='flex justify-between items-center mb-6'>
                                <form onSubmit={handleSearch} className='flex items-center gap-2'>
                                    <Input
                                        type='text'
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder='Search by name, code, or remun...'
                                        className='w-80'
                                    />
                                    <Button type='submit' size='icon' variant='outline'>
                                        <Search size={18} />
                                    </Button>
                                </form>
                                <Button onClick={openCreateModal}>
                                    <PlusCircle size={18} className='mr-2' /> Add Rubrik Kategori
                                </Button>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Kode</TableHead>
                                        <TableHead>Rubrik Remun</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rubrikKategoris.data.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className='text-center'>
                                                No data available.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {rubrikKategoris.data.map((rk) => (
                                        <TableRow key={rk.id}>
                                            <TableCell>{rk.id}</TableCell>
                                            <TableCell>{rk.nama}</TableCell>
                                            <TableCell>{rk.kode}</TableCell>
                                            <TableCell>{rk.rubrik_remun.nama}</TableCell>
                                            <TableCell className='space-x-2'>
                                                <Button variant='outline' size='icon' onClick={() => openEditModal(rk)}>
                                                    <PencilIcon size={16} />
                                                </Button>
                                                <Button variant='destructive' size='icon' onClick={() => openDeleteModal(rk)}>
                                                    <TrashIcon size={16} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination className='mt-6' links={rubrikKategoris.links} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Modal */}
            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Rubrik Kategori</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreate} className='space-y-4'>
                        <div>
                            <Label htmlFor='nama_create'>Nama</Label>
                            <Input
                                id='nama_create'
                                type='text'
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                className={cn(errors.nama && 'border-red-500')}
                            />
                            <InputError message={errors.nama} className='mt-1' />
                        </div>
                        <div>
                            <Label htmlFor='kode_create'>Kode</Label>
                            <Input
                                id='kode_create'
                                type='text'
                                value={data.kode}
                                onChange={(e) => setData('kode', e.target.value)}
                                className={cn(errors.kode && 'border-red-500')}
                            />
                            <InputError message={errors.kode} className='mt-1' />
                        </div>
                        <div>
                            <Label htmlFor='rubrik_remun_id_create'>Rubrik Remun</Label>
                            <Select
                                value={data.rubrik_remun_id}
                                onValueChange={(value) => setData('rubrik_remun_id', value)}
                            >
                                <SelectTrigger className={cn(errors.rubrik_remun_id && 'border-red-500')}>
                                    <SelectValue placeholder='Select Rubrik Remun' />
                                </SelectTrigger>
                                <SelectContent>
                                    {rubrikRemuns.map((rr) => (
                                        <SelectItem key={rr.id} value={rr.id.toString()}>
                                            {rr.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.rubrik_remun_id} className='mt-1' />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type='button' variant='outline'>Cancel</Button>
                            </DialogClose>
                            <Button type='submit' disabled={processing}>
                                {processing ? 'Saving...' : 'Save'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Rubrik Kategori</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate} className='space-y-4'>
                        <div>
                            <Label htmlFor='nama_edit'>Nama</Label>
                            <Input
                                id='nama_edit'
                                type='text'
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                className={cn(errors.nama && 'border-red-500')}
                            />
                            <InputError message={errors.nama} className='mt-1' />
                        </div>
                        <div>
                            <Label htmlFor='kode_edit'>Kode</Label>
                            <Input
                                id='kode_edit'
                                type='text'
                                value={data.kode}
                                onChange={(e) => setData('kode', e.target.value)}
                                className={cn(errors.kode && 'border-red-500')}
                            />
                            <InputError message={errors.kode} className='mt-1' />
                        </div>
                        <div>
                            <Label htmlFor='rubrik_remun_id_edit'>Rubrik Remun</Label>
                            <Select
                                value={data.rubrik_remun_id}
                                onValueChange={(value) => setData('rubrik_remun_id', value)}
                            >
                                <SelectTrigger className={cn(errors.rubrik_remun_id && 'border-red-500')}>
                                    <SelectValue placeholder='Select Rubrik Remun' />
                                </SelectTrigger>
                                <SelectContent>
                                    {rubrikRemuns.map((rr) => (
                                        <SelectItem key={rr.id} value={rr.id.toString()}>
                                            {rr.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.rubrik_remun_id} className='mt-1' />
                        </div>
                        <DialogFooter>
                             <DialogClose asChild>
                                <Button type='button' variant='outline'>Cancel</Button>
                            </DialogClose>
                            <Button type='submit' disabled={processing}>
                                {processing ? 'Updating...' : 'Update'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Rubrik Kategori</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the rubrik kategori{' '}
                            <strong>{currentRubrikKategori?.nama}</strong>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant='outline'>Cancel</Button>
                        </DialogClose>
                        <Button variant='destructive' onClick={handleDelete} disabled={processing}>
                            {processing ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
