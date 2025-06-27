import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Pegawai } from '@/types';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import PegawaiFungsionalCard from './Partials/PegawaiFungsionalCard';
import { Fungsional } from '@/types';

interface ShowPageProps extends PageProps {
    pegawai: Pegawai;
    fungsionals: Fungsional[];
}

export default function Show({ auth, pegawai, fungsionals }: ShowPageProps) {
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
                {/* ... other cards ... */}

                <PegawaiFungsionalCard pegawai={pegawai} fungsionals={fungsionals} />

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
