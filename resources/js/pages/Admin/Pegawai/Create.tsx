import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem, PageProps, Pegawai, PegawaiJenis } from '@/types';
import PegawaiForm from './PegawaiForm';
import Heading from '@/components/heading';
import { Card, CardContent } from '@/components/ui/card';

interface CreatePageProps extends PageProps {
    pegawaiJenis: PegawaiJenis[];
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pegawai',
        href: '/admin/pegawai/',
    },
    {
        title: 'Create',
        href: '/admin/pegawai/create',
    },
];

export default function Create({ pegawaiJenis }: CreatePageProps) {
    const { data, setData, post, processing, errors } = useForm<Partial<Pegawai>>({
        nama: '',
        nik: '',
        nip: '',
        email: '',
        nohp: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: 1,
        npwp: '',
        pegawai_jenis_id: undefined,
        aktif: 1,
    });

    const handleSubmit = (formData: Partial<Pegawai>) => {
        post(route('admin.pegawai.store'), {
            data: formData, // Ensure data is passed correctly under a 'data' key if controller expects it or send directly
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Add Pegawai' />
            <Heading title="New Pegawai" description="Create a new pegawai record" />

            <Card>
                <CardContent>
                    <PegawaiForm
                        pegawaiJenis={pegawaiJenis}
                        onSubmit={handleSubmit}
                        processing={processing}
                        errors={errors}
                    />
                </CardContent>
            </Card>
        </AppLayout>
    );
}
