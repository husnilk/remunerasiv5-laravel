import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { PageProps, Rubrik, RubrikKategori } from '@/types';
import RubrikForm from './Form';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EditPageProps extends PageProps {
    rubrik: Rubrik;
    rubrikKategoris: RubrikKategori[];
}

export default function Edit({ auth, rubrik, rubrikKategoris }: EditPageProps) {
    const { processing } = useForm();

    const handleSubmit = (formData: Omit<Rubrik, 'id' | 'created_at' | 'updated_at'>) => {
        router.put(route('admin.rubrik.update', rubrik.id), formData);
    };

    return (
        <AppLayout user={auth.user}>
            <Head title={`Edit Rubrik - ${rubrik.aktifitas}`} />
            <div className='space-y-4'>
                <Heading
                    title='Edit Rubrik'
                    description={`Update the details for rubrik: ${rubrik.aktifitas}`}
                />
                <Card>
                    <CardHeader>
                        <CardTitle>Rubrik Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RubrikForm
                            rubrik={rubrik}
                            rubrikKategoris={rubrikKategoris}
                            onSubmit={handleSubmit}
                            isSubmitting={processing}
                            formType='edit'
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
