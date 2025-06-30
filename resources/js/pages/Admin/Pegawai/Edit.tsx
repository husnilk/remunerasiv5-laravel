import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem, PageProps, Pegawai, PegawaiJenis } from '@/types';
import PegawaiForm from './PegawaiForm';
import Heading from '@/components/heading';
import { Card, CardContent } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pegawai',
        href: '/admin/pegawai/',
    },
    {
        title: 'Edit',
        href: '/admin/pegawai/edit',
    },
];

interface EditPageProps extends PageProps {
    pegawai: Pegawai;
    pegawaiJenis: PegawaiJenis[];
}

export default function Edit({ auth, pegawai, pegawaiJenis }: EditPageProps) {
    const { data, setData, put, processing, errors } = useForm<Partial<Pegawai>>({
        nama: pegawai.nama,
        nik: pegawai.nik,
        nip: pegawai.nip,
        email: pegawai.email,
        nohp: pegawai.nohp,
        tempat_lahir: pegawai.tempat_lahir,
        tanggal_lahir: pegawai.tanggal_lahir,
        jenis_kelamin: pegawai.jenis_kelamin,
        npwp: pegawai.npwp,
        pegawai_jenis_id: pegawai.pegawai_jenis_id,
        aktif: pegawai.aktif,
    });

    const handleSubmit = (formData: Partial<Pegawai>) => {
        put(route('admin.pegawai.update', pegawai.id), {
            data: formData, // Ensure data is passed correctly
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Pegawai - ${pegawai.nama}`} />
            <Heading title="Edit Pegawai" description={`Editing details for ${pegawai.nama}`} />

            <Card>
                <CardContent>
                    <PegawaiForm
                        pegawai={pegawai}
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
