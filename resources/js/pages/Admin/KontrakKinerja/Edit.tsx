import AppLayout from '@/layouts/app-layout';
import { PageProps, Pegawai, Periode, KontrakKinerja as KontrakKinerjaType } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import KontrakKinerjaForm from './partials/KontrakKinerjaForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface EditPageProps extends PageProps {
    kontrakKinerja: KontrakKinerjaType; // The KontrakKinerja instance to edit
    allPegawai: Pick<Pegawai, 'id' | 'nama'>[];
    allPeriode: Pick<Periode, 'id' | 'nama'>[];
    // Add any other props needed for the form
}

export default function Edit({ auth, kontrakKinerja, allPegawai, allPeriode, errors: pageErrors }: EditPageProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        // Initialize form with existing KontrakKinerja data
        // Ensure all fields from KontrakKinerjaForm are here
        pegawai_id: kontrakKinerja.pegawai_id?.toString() || '',
        periode_id: kontrakKinerja.periode_id?.toString() || '',
        tahun: kontrakKinerja.tahun?.toString() || new Date().getFullYear().toString(),
        bulan_mulai: kontrakKinerja.bulan_mulai?.toString() || '',
        bulan_selesai: kontrakKinerja.bulan_selesai?.toString() || '',
        tanggal_mulai: kontrakKinerja.tanggal_mulai || '',
        tanggal_selesai: kontrakKinerja.tanggal_selesai || '',
        penilai_id: kontrakKinerja.penilai_id?.toString() || '',
        atasan_penilai_id: kontrakKinerja.atasan_penilai_id?.toString() || '',
        orientasi: kontrakKinerja.orientasi?.toString() || '',
        integritas: kontrakKinerja.integritas?.toString() || '',
        komitmen: kontrakKinerja.komitmen?.toString() || '',
        disiplin: kontrakKinerja.disiplin?.toString() || '',
        kerjasama: kontrakKinerja.kerjasama?.toString() || '',
        kepemimpinan: kontrakKinerja.kepemimpinan?.toString() || '',
        status: kontrakKinerja.status?.toString() || '0',
        keberatan: kontrakKinerja.keberatan || '',
        tanggal_keberatan: kontrakKinerja.tanggal_keberatan || '',
        tanggapan: kontrakKinerja.tanggapan || '',
        tanggal_tanggapan: kontrakKinerja.tanggal_tanggapan || '',
        keputusan: kontrakKinerja.keputusan || '',
        tanggal_keputusan: kontrakKinerja.tanggal_keputusan || '',
        rekomendasi: kontrakKinerja.rekomendasi || '',
        tanggal_buat: kontrakKinerja.tanggal_buat || '',
        tanggal_terima: kontrakKinerja.tanggal_terima || '',
        tanggal_terima_atasan: kontrakKinerja.tanggal_terima_atasan || '',
        verified_at: kontrakKinerja.verified_at || '', // Handle date formatting if needed
        verified_by: kontrakKinerja.verified_by?.toString() || '',
        capaian_skp: kontrakKinerja.capaian_skp?.toString() || '',
        predikat_kinerja: kontrakKinerja.predikat_kinerja?.toString() || '',
        rating_perilaku: kontrakKinerja.rating_perilaku?.toString() || '',
        rating_kinerja: kontrakKinerja.rating_kinerja?.toString() || '',
        file_bukti: kontrakKinerja.file_bukti?.toString() || '', // May need special handling for files
        poin: kontrakKinerja.poin?.toString() || '0',
        poin_verifikasi: kontrakKinerja.poin_verifikasi?.toString() || '0',
        file_kontrak: kontrakKinerja.file_kontrak || '', // May need special handling
        file_kinerja: kontrakKinerja.file_kinerja || '', // May need special handling
        tingkat_pelanggaran: kontrakKinerja.tingkat_pelanggaran?.toString() || '',
        _method: 'PUT', // Important for PUT requests with Inertia
    });

    // If kontrakKinerja prop changes, reset the form with new data
    useEffect(() => {
        if (kontrakKinerja) {
            reset({
                ...kontrakKinerja,
                pegawai_id: kontrakKinerja.pegawai_id?.toString() || '',
                periode_id: kontrakKinerja.periode_id?.toString() || '',
                tahun: kontrakKinerja.tahun?.toString() || '',
                bulan_mulai: kontrakKinerja.bulan_mulai?.toString() || '',
                bulan_selesai: kontrakKinerja.bulan_selesai?.toString() || '',
                penilai_id: kontrakKinerja.penilai_id?.toString() || '',
                atasan_penilai_id: kontrakKinerja.atasan_penilai_id?.toString() || '',
                orientasi: kontrakKinerja.orientasi?.toString() || '',
                integritas: kontrakKinerja.integritas?.toString() || '',
                komitmen: kontrakKinerja.komitmen?.toString() || '',
                disiplin: kontrakKinerja.disiplin?.toString() || '',
                kerjasama: kontrakKinerja.kerjasama?.toString() || '',
                kepemimpinan: kontrakKinerja.kepemimpinan?.toString() || '',
                status: kontrakKinerja.status?.toString() || '',
                verified_by: kontrakKinerja.verified_by?.toString() || '',
                capaian_skp: kontrakKinerja.capaian_skp?.toString() || '',
                predikat_kinerja: kontrakKinerja.predikat_kinerja?.toString() || '',
                rating_perilaku: kontrakKinerja.rating_perilaku?.toString() || '',
                rating_kinerja: kontrakKinerja.rating_kinerja?.toString() || '',
                file_bukti: kontrakKinerja.file_bukti?.toString() || '',
                poin: kontrakKinerja.poin?.toString() || '',
                poin_verifikasi: kontrakKinerja.poin_verifikasi?.toString() || '',
                tingkat_pelanggaran: kontrakKinerja.tingkat_pelanggaran?.toString() || '',
                _method: 'PUT',
            });
        }
    }, [kontrakKinerja, reset]);


    const handleSubmit = (formDataFromChild: any) => { // Replace 'any'
        // formDataFromChild contains the latest data from the KontrakKinerjaForm
        // We use 'put' for updates. The route model binding will find the correct KontrakKinerja.
        put(route('admin.kontrak-kinerja.update', kontrakKinerja.id), {
            data: formDataFromChild, // Send all fields from the form
            onSuccess: () => {
                toast.success('Kontrak Kinerja berhasil diperbarui.');
                // Redirect handled by controller
            },
            onError: (err) => {
                console.error(err);
                toast.error('Gagal memperbarui Kontrak Kinerja. Periksa kembali isian Anda.');
            },
        });
    };

    const handleCancel = () => {
        router.get(route('admin.kontrak-kinerja.index'));
    };

    return (
        <AppLayout user={auth.user} currentRole={auth.currentRole}>
            <Head title={`Ubah Kontrak Kinerja - ${kontrakKinerja.pegawai?.nama || kontrakKinerja.id}`} />
            <div className='space-y-4 p-4 md:p-6'>
                <Card>
                    <CardHeader>
                        <CardTitle>Ubah Kontrak Kinerja</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <KontrakKinerjaForm
                            kontrakKinerja={kontrakKinerja} // Pass the existing data to the form
                            allPegawai={allPegawai}
                            allPeriode={allPeriode}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                            processing={processing}
                            errors={errors || pageErrors} // Pass errors from useForm or page props
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
