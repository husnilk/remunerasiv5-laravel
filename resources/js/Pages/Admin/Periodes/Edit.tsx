import AppLayout from '@/layouts/app-layout'; // Assuming AppLayout exists
import PeriodeForm from './Partials/PeriodeForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Periode } from '@/types/periode'; // Assuming Periode type

interface EditPeriodePageProps extends PageProps {
    periode: Periode;
}

export default function EditPeriodePage({ auth, periode }: EditPeriodePageProps) {
    return (
        <AppLayout user={auth.user} header="Periode Management">
            <Head title={`Edit Periode - ${periode.nama}`} />

            <div className="py-6 md:py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <PeriodeForm mode="edit" periode={periode} />
                </div>
            </div>
        </AppLayout>
    );
}
