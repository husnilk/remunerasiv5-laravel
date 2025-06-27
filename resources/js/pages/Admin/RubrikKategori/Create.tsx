import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, RubrikRemun } from '@/types';
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
import { FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftCircle } from 'lucide-react';

type CreatePageProps = PageProps<{
    rubrikRemuns: RubrikRemun[];
}>;

export default function Create({ auth, rubrikRemuns }: CreatePageProps) {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        kode: '',
        rubrik_remun_id: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('admin.rubrik-kategori.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout user={auth.user} header={
            <div className='flex items-center'>
                 <Link href={route('admin.rubrik-kategori.index')} className='mr-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700'>
                    <ArrowLeftCircle size={20} />
                </Link>
                <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
                    Add Rubrik Kategori
                </h2>
            </div>
        }>
            <Head title='Add Rubrik Kategori' />

            <div className='py-12'>
                <div className='max-w-2xl mx-auto sm:px-6 lg:px-8'>
                    <Card>
                        <CardHeader>
                            <CardTitle>New Rubrik Kategori</CardTitle>
                            <CardDescription>Fill in the details for the new rubrik kategori.</CardDescription>
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
                                    {processing ? 'Saving...' : 'Save Rubrik Kategori'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
