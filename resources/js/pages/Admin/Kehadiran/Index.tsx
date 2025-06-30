import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Kehadiran, PageProps, PaginatedResponse, Pegawai, Periode } from '@/types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icon';
import Pagination from '@/components/pagination';
import { Input } from '@/components/ui/input';
import { FormEventHandler, useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Heading from '@/components/heading';

interface KehadiranIndexProps extends PageProps {
    kehadirans: PaginatedResponse<Kehadiran>;
    filters: { search: string | null };
}

interface KehadiranWithRelations extends Kehadiran {
    pegawai: Pegawai;
    periode: Periode;
    createdBy: { name: string };
}

export default function KehadiranIndexPage({ auth, kehadirans, filters }: KehadiranIndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        router.get(route('admin.kehadiran.index'), { search }, { preserveState: true });
    };

    const { delete: destroy, processing } = useForm();

    const handleDelete = (kehadiranId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data kehadiran ini?')) {
            destroy(route('admin.kehadiran.destroy', kehadiranId), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title='Data Kehadiran' />
            <div className='space-y-4'>
                <Heading title='Data Kehadiran' description='Manajemen data kehadiran pegawai.' />

                <div className='flex items-center justify-between'>
                    <form onSubmit={handleSearch} className='flex items-center gap-2'>
                        <Input
                            type='search'
                            placeholder='Cari pegawai/periode...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-80'
                        />
                        <Button type='submit' variant='outline'>
                            Cari
                        </Button>
                    </form>
                    <Link href={route('admin.kehadiran.create')}>
                        <Button>
                            <Icon name='IconPlus' className='mr-2' />
                            Tambah Kehadiran
                        </Button>
                    </Link>
                </div>

                <div className='overflow-hidden border rounded-lg'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Pegawai</TableHead>
                                <TableHead>Periode</TableHead>
                                <TableHead>Tahun</TableHead>
                                <TableHead>Bulan</TableHead>
                                <TableHead>Hadir</TableHead>
                                <TableHead>Dibuat Oleh</TableHead>
                                <TableHead className='w-[100px] text-right'>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kehadirans.data.length > 0 ? (
                                (kehadirans.data as KehadiranWithRelations[]).map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{kehadirans.from + index}</TableCell>
                                        <TableCell>{item.pegawai.nama}</TableCell>
                                        <TableCell>{item.periode.nama}</TableCell>
                                        <TableCell>{item.tahun}</TableCell>
                                        <TableCell>{item.bulan}</TableCell>
                                        <TableCell>{item.hadir}</TableCell>
                                        <TableCell>{item.createdBy?.name || '-'}</TableCell>
                                        <TableCell className='text-right'>
                                            <div className='flex items-center justify-end gap-2'>
                                                <Link href={route('admin.kehadiran.edit', item.id)}>
                                                    <Button variant='outline' size='icon' title='Edit'>
                                                        <Icon name='IconPencil' />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant='destructive'
                                                    size='icon'
                                                    onClick={() => handleDelete(item.id)}
                                                    disabled={processing}
                                                    title='Hapus'>
                                                    <Icon name='IconTrash' />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} className='text-center'>
                                        Tidak ada data kehadiran.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {kehadirans.total > 0 && <Pagination links={kehadirans.links} />}
            </div>
        </AppLayout>
    );
}
