import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import JabatanForm from './JabatanForm';
import { Jabatan } from '@/types';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateJabatan() {
    const { data, setData, post, processing, errors } = useForm<Partial<Jabatan>>({
        nama: '',
        grade: undefined,
        job_value: undefined,
        cg: false,
        poin_skp: undefined,
        active: true,
    });

    const handleSubmit = (formData: Partial<Jabatan>) => {
        post(route('data-master.jabatan.store'), {
            data: formData, // Not needed, useForm handles data directly
        });
    };

    return (
        <AppLayout title='Create Jabatan'>
            <Head title='Create New Jabatan' />
            <div className='space-y-4'>
                <Heading title='Create New Jabatan' description='Fill in the form below to create a new jabatan.' />

                <Card>
                    <CardHeader>
                        <CardTitle>Jabatan Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <JabatanForm onSubmit={handleSubmit} processing={processing} errors={errors} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
