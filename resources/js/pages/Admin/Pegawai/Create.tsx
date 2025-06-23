import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps, Pegawai, PegawaiJenis } from '@/types';
import PegawaiForm from './PegawaiForm';
import Heading from '@/components/heading';

interface CreatePageProps extends PageProps {
    pegawaiJenis: PegawaiJenis[];
}

export default function Create({ auth, pegawaiJenis }: CreatePageProps) {
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
        <AppLayout
            user={auth.user}
            header={<Heading>Add New Pegawai</Heading>}
        >
            <Head title='Add Pegawai' />

            <div className='mx-auto max-w-2xl rounded-md border bg-card p-6 shadow'>
                <PegawaiForm
                    pegawaiJenis={pegawaiJenis}
                    onSubmit={handleSubmit}
                    processing={processing}
                    errors={errors}
                />
            </div>
        </AppLayout>
    );
}
