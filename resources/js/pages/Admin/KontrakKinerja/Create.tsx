import AppLayout from '@/layouts/app-layout';
import { PageProps, Pegawai, Periode } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import KontrakKinerjaForm from './partials/KontrakKinerjaForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface CreatePageProps extends PageProps {
    allPegawai: Pick<Pegawai, 'id' | 'nama'>[];
    allPeriode: Pick<Periode, 'id' | 'nama'>[];
    // Add any other props needed for the form, e.g., default values or specific options
}

export default function Create({ auth, allPegawai, allPeriode, errors: pageErrors }: CreatePageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        // Initialize all form fields as in KontrakKinerjaForm's useForm
        pegawai_id: '',
        periode_id: '',
        tahun: new Date().getFullYear().toString(),
        bulan_mulai: '',
        bulan_selesai: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        penilai_id: '',
        atasan_penilai_id: '',
        orientasi: '',
        integritas: '',
        komitmen: '',
        disiplin: '',
        kerjasama: '',
        kepemimpinan: '',
        status: '0', // Default to 'Draft'
        // ... other fields from migration, initialized appropriately
        keberatan: '',
        tanggal_keberatan: '',
        tanggapan: '',
        tanggal_tanggapan: '',
        keputusan: '',
        tanggal_keputusan: '',
        rekomendasi: '',
        tanggal_buat: '',
        tanggal_terima: '',
        tanggal_terima_atasan: '',
        verified_at: '',
        verified_by: '',
        capaian_skp: '',
        predikat_kinerja: '',
        rating_perilaku: '',
        rating_kinerja: '',
        file_bukti: '', // Handle file input appropriately if it's a file upload
        poin: '0',
        poin_verifikasi: '0',
        file_kontrak: '', // Handle file input
        file_kinerja: '', // Handle file input
        tingkat_pelanggaran: '',
    });

    const handleSubmit = (formData: any) // Replace 'any' with a more specific type for form data
    => {
        // The 'data' from useForm is already up-to-date due to two-way binding in KontrakKinerjaForm
        // We can directly use it or use the formData passed from the child if preferred.
        post(route('admin.kontrak-kinerja.store'), {
            data: formData, // Send all fields from the form
            onSuccess: () => {
                toast.success('Kontrak Kinerja berhasil ditambahkan.');
                // router.visit(route('admin.kontrak-kinerja.index')); // Redirect handled by controller
            },
            onError: (err) => {
                console.error(err);
                toast.error('Gagal menambahkan Kontrak Kinerja. Periksa kembali isian Anda.');
            },
            onFinish: () => {
                // Any cleanup or state reset after submission attempt
            },
        });
    };

    const handleCancel = () => {
        router.get(route('admin.kontrak-kinerja.index'));
    };

    return (
        <AppLayout user={auth.user} currentRole={auth.currentRole}>
            <Head title='Tambah Kontrak Kinerja' />
            <div className='space-y-4 p-4 md:p-6'>
                <Card>
                    <CardHeader>
                        <CardTitle>Tambah Kontrak Kinerja Baru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <KontrakKinerjaForm
                            allPegawai={allPegawai}
                            allPeriode={allPeriode}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                            processing={processing}
                            errors={errors || pageErrors} // Pass errors from useForm or page props
                            // data={data} // Pass data from useForm to the form component
                            // setData={setData} // Pass setData from useForm
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
