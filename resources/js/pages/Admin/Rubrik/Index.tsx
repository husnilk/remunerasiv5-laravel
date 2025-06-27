import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Paginated, Rubrik, RubrikKategori } from '@/types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/pagination';
import { FormEvent, useState } from 'react';
import Heading from '@/components/heading';
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
import { EyeIcon, PencilIcon, PlusCircle, TrashIcon } from 'lucide-react';

interface RubrikWithKategori extends Rubrik {
    rubrik_kategori: RubrikKategori;
}

interface IndexPageProps extends PageProps {
    rubriks: Paginated<RubrikWithKategori>;
    filters: { search?: string };
}

export default function Index({ auth, rubriks, filters }: IndexPageProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(route('admin.rubrik.index'), { search }, { preserveState: true, replace: true });
    };

    const handleDelete = (id: number) => {
        router.delete(route('admin.rubrik.destroy', id), {
            onSuccess: () => setConfirmDeleteId(null),
        });
    };

    return (
        <AppLayout user={auth.user}>
            <Head title='Rubriks' />
            <div className='space-y-4'>
                <Heading title='Rubriks Management' description='Manage all rubriks in the system.'>
                    <Button asChild>
                        <Link href={route('admin.rubrik.create')}>
                            <PlusCircle className='mr-2' /> Add Rubrik
                        </Link>
                    </Button>
                </Heading>

                <form onSubmit={handleSearch} className='flex gap-2'>
                    <Input
                        type='search'
                        placeholder='Search by aktifitas, kode, or kategori...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='max-w-sm'
                    />
                    <Button type='submit'>Search</Button>
                </form>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Aktifitas</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Kode</TableHead>
                            <TableHead>Satuan</TableHead>
                            <TableHead>Poin</TableHead>
                            <TableHead>Aktif</TableHead>
                            <TableHead className='text-right'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rubriks.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} className='text-center'>
                                    No rubriks found.
                                </TableCell>
                            </TableRow>
                        )}
                        {rubriks.data.map((rubrik) => (
                            <TableRow key={rubrik.id}>
                                <TableCell>{rubrik.id}</TableCell>
                                <TableCell className='font-medium'>{rubrik.aktifitas}</TableCell>
                                <TableCell>{rubrik.rubrik_kategori?.nama || '-'}</TableCell>
                                <TableCell>{rubrik.kode || '-'}</TableCell>
                                <TableCell>{rubrik.satuan}</TableCell>
                                <TableCell>
                                    {rubrik.fixed_poin > 0
                                        ? rubrik.fixed_poin
                                        : `${rubrik.min_poin} - ${rubrik.max_poin}`}
                                </TableCell>
                                <TableCell>{rubrik.aktif ? 'Yes' : 'No'}</TableCell>
                                <TableCell className='text-right space-x-2'>
                                    <Button variant='outline' size='icon' asChild>
                                        <Link href={route('admin.rubrik.show', rubrik.id)}>
                                            <EyeIcon size={18} />
                                        </Link>
                                    </Button>
                                    <Button variant='outline' size='icon' asChild>
                                        <Link href={route('admin.rubrik.edit', rubrik.id)}>
                                            <PencilIcon size={18} />
                                        </Link>
                                    </Button>
                                    <Dialog
                                        open={confirmDeleteId === rubrik.id}
                                        onOpenChange={(isOpen) => !isOpen && setConfirmDeleteId(null)}
                                    >
                                        <DialogTrigger asChild>
                                            <Button
                                                variant='destructive'
                                                size='icon'
                                                onClick={() => setConfirmDeleteId(rubrik.id)}
                                            >
                                                <TrashIcon size={18} />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will permanently delete the
                                                    rubrik.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant='outline'>Cancel</Button>
                                                </DialogClose>
                                                <Button
                                                    variant='destructive'
                                                    onClick={() => handleDelete(rubrik.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination links={rubriks.links} />
            </div>
        </AppLayout>
    );
}
