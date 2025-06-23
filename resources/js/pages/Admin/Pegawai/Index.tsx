import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, PaginatedResponse, Pegawai, PegawaiJenis } from '@/types';
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
import { PenSquare, PlusCircle, Trash2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import Heading from '@/components/heading';

interface IndexPageProps extends PageProps {
    pegawais: PaginatedResponse<Pegawai>;
    filters: { search?: string };
}

export default function Index({ auth, pegawais, filters }: IndexPageProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(route('admin.pegawai.index'), { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            router.delete(route('admin.pegawai.destroy', id));
        }
    };

    return (
        <AppLayout
            user={auth.user}
            header={
                <div className='flex items-center justify-between'>
                    <Heading>Pegawai</Heading>
                    <Button asChild>
                        <Link href={route('admin.pegawai.create')}>
                            <PlusCircle className='mr-2 h-4 w-4' />
                            Add Pegawai
                        </Link>
                    </Button>
                </div>
            }
        >
            <Head title='Pegawai' />

            <div className='mb-4'>
                <form onSubmit={handleSearch}>
                    <div className='flex gap-2'>
                        <Input
                            type='search'
                            placeholder='Search by name, NIK, NIP, or email...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='max-w-sm'
                        />
                        <Button type='submit'>Search</Button>
                    </div>
                </form>
            </div>

            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>NIK</TableHead>
                            <TableHead>NIP</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Jenis Pegawai</TableHead>
                            <TableHead>Aktif</TableHead>
                            <TableHead className='w-[100px]'></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pegawais.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className='text-center'>
                                    No data found.
                                </TableCell>
                            </TableRow>
                        )}
                        {pegawais.data.map((pegawai) => (
                            <TableRow key={pegawai.id}>
                                <TableCell>{pegawai.nama}</TableCell>
                                <TableCell>{pegawai.nik}</TableCell>
                                <TableCell>{pegawai.nip}</TableCell>
                                <TableCell>{pegawai.email}</TableCell>
                                <TableCell>{pegawai.pegawai_jenis?.nama}</TableCell>
                                <TableCell>{pegawai.aktif ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <div className='flex items-center justify-end gap-2'>
                                        <Button variant='outline' size='icon' asChild>
                                            <Link href={route('admin.pegawai.edit', pegawai.id)}>
                                                <PenSquare className='h-4 w-4' />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant='destructive'
                                            size='icon'
                                            onClick={() => handleDelete(pegawai.id)}
                                        >
                                            <Trash2 className='h-4 w-4' />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Pagination links={pegawais.links} />
        </AppLayout>
    );
}
