import AppLayout from '@/layouts/app-layout'; // Assuming AppLayout exists
import PeriodeForm from './Partials/PeriodeForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types'; // Assuming PageProps for auth, etc.

export default function CreatePeriodePage({ auth }: PageProps) {
    return (
        <AppLayout user={auth.user} header="Periode Management">
            <Head title="Tambah Periode Baru" />

            <div className="py-6 md:py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <PeriodeForm mode="create" />
                </div>
            </div>
        </AppLayout>
    );
}
