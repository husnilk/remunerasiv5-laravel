import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, RubrikKategori, RubrikRemun } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FormEvent, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { IconArrowLeft } from '@tabler/icons-react';

type RubrikKategoriProps = RubrikKategori & {
    rubrik_remun: RubrikRemun;
}

type EditPageProps = PageProps<{
    rubrikKategori: RubrikKategoriProps;
    rubrikRemuns: RubrikRemun[];
}>;

export default function Edit({ auth, rubrikKategori, rubrikRemuns }: EditPageProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        nama: rubrikKategori.nama || '',
        kode: rubrikKategori.kode || '',
        rubrik_remun_id: rubrikKategori.rubrik_remun_id?.toString() || '',
    });

    useEffect(() => {
        reset({
            nama: rubrikKategori.nama,
            kode: rubrikKategori.kode,
            rubrik_remun_id: rubrikKategori.rubrik_remun_id.toString(),
        });
    }, [rubrikKategori, reset]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('admin.rubrik-kategori.update', rubrikKategori.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout user={auth.user} header={
            <div className='flex items-center'>
                <Link href={route('admin.rubrik-kategori.index')} className='mr-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700'>
                    <IconArrowLeft size={20} />
                </Link>
                <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
                    Edit Rubrik Kategori: {rubrikKategori.nama}
                </h2>
            </div>
        }>
            <Head title={`Edit Rubrik Kategori - ${rubrikKategori.nama}`} />

            <div className='py-12'>
                <div className='max-w-2xl mx-auto sm:px-6 lg:px-8'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Rubrik Kategori</CardTitle>
                            <CardDescription>Update the details for {rubrikKategori.nama}.</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSubmit}>
                            <CardContent className='space-y-4'>
                                <div>
                                    <Label htmlFor='nama'>Nama</Label>
                                    <Input
                                        id='nama'
                                        type='text'
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        autoFocus
                                    />
                                    <InputError message={errors.nama} className='mt-1' />
                                </div>
                                <div>
                                    <Label htmlFor='kode'>Kode</Label>
                                    <Input
                                        id='kode'
                                        type='text'
                                        value={data.kode}
                                        onChange={(e) => setData('kode', e.target.value)}
                                    />
                                    <InputError message={errors.kode} className='mt-1' />
                                </div>
                                <div>
                                    <Label htmlFor='rubrik_remun_id'>Rubrik Remun</Label>
                                    <Select
                                        value={data.rubrik_remun_id}
                                        onValueChange={(value) => setData('rubrik_remun_id', value)}
                                    >
                                        <SelectTrigger>
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
                            </CardContent>
                            <CardFooter className='flex justify-end'>
                                <Button type='submit' disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Rubrik Kategori'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
