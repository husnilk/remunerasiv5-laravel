import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import JabatanForm from './JabatanForm';
import { Jabatan } from '@/types';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EditJabatanProps {
    jabatan: Jabatan;
}

export default function EditJabatan({ jabatan }: EditJabatanProps) {
    const { data, setData, put, processing, errors } = useForm<Partial<Jabatan>>({
        nama: jabatan.nama,
        grade: jabatan.grade,
        job_value: jabatan.job_value,
        cg: jabatan.cg,
        poin_skp: jabatan.poin_skp,
        active: jabatan.active,
    });

    const handleSubmit = (formData: Partial<Jabatan>) => {
        // The `data` from useForm is already up-to-date due to JabatanForm's setData calls.
        // We pass it explicitly here to match JabatanForm's onSubmit signature,
        // but useForm's `put` will use its internal `data` state.
        put(route('data-master.jabatan.update', jabatan.id));
    };

    return (
        <AppLayout title={`Edit Jabatan: ${jabatan.nama}`}>
            <Head title={`Edit Jabatan - ${jabatan.nama}`} />
            <div className='space-y-4'>
                <Heading
                    title='Edit Jabatan'
                    description={`Update the details for jabatan: ${jabatan.nama}.`}
                />
                <Card>
                    <CardHeader>
                        <CardTitle>Jabatan Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <JabatanForm jabatan={jabatan} onSubmit={handleSubmit} processing={processing} errors={errors} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
