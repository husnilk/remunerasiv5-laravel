import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps, Pegawai, PegawaiJenis } from '@/types';
import PegawaiForm from './PegawaiForm';
import Heading from '@/components/heading';

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
        <AppLayout
            user={auth.user}
            header={<Heading>Edit Pegawai</Heading>}
        >
            <Head title={`Edit Pegawai - ${pegawai.nama}`} />

            <div className='mx-auto max-w-2xl rounded-md border bg-card p-6 shadow'>
                <PegawaiForm
                    pegawai={pegawai}
                    pegawaiJenis={pegawaiJenis}
                    onSubmit={handleSubmit}
                    processing={processing}
                    errors={errors}
                />
            </div>
        </AppLayout>
    );
}
