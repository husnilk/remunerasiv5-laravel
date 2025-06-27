import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Pegawai } from '@/types';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface ShowPageProps extends PageProps {
    pegawai: Pegawai;
}

export default function Show({ auth, pegawai }: ShowPageProps) {
    return (
        <AppLayout
            user={auth.user}
            header={
                <div className='flex items-center justify-between'>
                    <Heading>Detail Pegawai: {pegawai.nama}</Heading>
                    <Button variant='outline' asChild>
                        <Link href={route('admin.pegawai.index')}>
                            <ArrowLeft className='mr-2 h-4 w-4' />
                            Back to List
                        </Link>
                    </Button>
                </div>
            }
        >
            <Head title={`Detail Pegawai - ${pegawai.nama}`} />

            <div className='space-y-6'>
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Umum</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Nama Lengkap</p>
                                <p>{pegawai.nama}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>NIK</p>
                                <p>{pegawai.nik}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>NIP</p>
                                <p>{pegawai.nip}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Email</p>
                                <p>{pegawai.email}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>No. HP</p>
                                <p>{pegawai.nohp || '-'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Pribadi</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Tempat Lahir</p>
                                <p>{pegawai.tempat_lahir || '-'}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Tanggal Lahir</p>
                                <p>{pegawai.tanggal_lahir || '-'}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Jenis Kelamin</p>
                                <p>{pegawai.jenis_kelamin === 1 ? 'Laki-laki' : 'Perempuan'}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>NPWP</p>
                                <p>{pegawai.npwp || '-'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Status Kepegawaian</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Jenis Pegawai</p>
                                <p>{pegawai.pegawai_jenis?.nama || '-'}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Status Aktif</p>
                                <p>{pegawai.aktif ? 'Aktif' : 'Tidak Aktif'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* TODO: Add sections for Jabatan, Fungsional, etc. if relationships are implemented */}

                <div className='text-right'>
                    <Button asChild>
                        <Link href={route('admin.pegawai.edit', pegawai.id)}>
                            Edit Pegawai
                        </Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
