import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Rubrik, RubrikKategori } from '@/types';
import Heading from '@/components/heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RubrikWithKategori extends Rubrik {
    rubrik_kategori: RubrikKategori;
}

interface ShowPageProps extends PageProps {
    rubrik: RubrikWithKategori;
}

export default function Show({ auth, rubrik }: ShowPageProps) {
    const DetailItem = ({ label, value }: { label: string; value: string | number | undefined | null }) => (
        <div className='flex flex-col sm:flex-row sm:items-center'>
            <dt className='sm:w-1/3 text-muted-foreground font-medium'>{label}</dt>
            <dd className='mt-1 sm:mt-0 sm:w-2/3'>{value ?? '-'}</dd>
        </div>
    );

    return (
        <AppLayout user={auth.user}>
            <Head title={`Rubrik - ${rubrik.aktifitas}`} />
            <div className='space-y-6'>
                <Heading
                    title='Rubrik Details'
                    description={`Viewing details for rubrik: ${rubrik.aktifitas}`}
                >
                    <Button variant='outline' asChild>
                        <Link href={route('admin.rubrik.index')}>
                            <IconArrowLeft className='mr-2 h-4 w-4' />
                            Back to List
                        </Link>
                    </Button>
                </Heading>

                <Card>
                    <CardHeader>
                        <CardTitle>{rubrik.aktifitas}</CardTitle>
                        <CardDescription>Kode: {rubrik.kode || '-'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <dl className='grid grid-cols-1 gap-y-4 sm:gap-y-6'>
                            <DetailItem label='Kategori' value={rubrik.rubrik_kategori?.nama} />
                            <DetailItem label='Uraian' value={rubrik.uraian} />
                            <DetailItem label='Uraian Bukti' value={rubrik.uraian_bukti} />
                            <DetailItem label='Satuan' value={rubrik.satuan} />
                            <DetailItem label='Jumlah' value={rubrik.jumlah} />
                            <DetailItem label='Tipe Form' value={`Tipe ${rubrik.tipe_form}`} />
                            <DetailItem label='Personal' value={rubrik.personal ? 'Yes' : 'No'} />
                            <DetailItem label='Bukti Penugasan' value={rubrik.bukti_penugasan} />
                            <DetailItem label='Bukti Kinerja' value={rubrik.bukti_kinerja} />
                            <DetailItem label='Min Pegawai' value={rubrik.min_pegawai} />
                            <DetailItem label='Max Pegawai' value={rubrik.max_pegawai} />
                            <DetailItem label='Min Poin' value={rubrik.min_poin} />
                            <DetailItem label='Max Poin' value={rubrik.max_poin} />
                            <DetailItem label='Fixed Poin' value={rubrik.fixed_poin} />
                            <DetailItem label='Rate' value={rubrik.rate} />
                            <DetailItem label='Umum' value={rubrik.umum ? 'Yes' : 'No'} />
                            <DetailItem label='Aktif' value={rubrik.aktif ? 'Yes' : 'No'} />
                            <DetailItem label='Flat Rate' value={rubrik.flat_rate ? 'Yes' : 'No'} />
                            <DetailItem label='Created At' value={new Date(rubrik.created_at).toLocaleDateString()} />
                            <DetailItem label='Last Updated' value={new Date(rubrik.updated_at).toLocaleDateString()} />
                        </dl>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
