import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { PageProps, Rubrik, RubrikKategori } from '@/types';
import RubrikForm from './Form';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CreatePageProps extends PageProps {
    rubrikKategoris: RubrikKategori[];
}

export default function Create({ auth, rubrikKategoris }: CreatePageProps) {
    const { processing } = useForm();

    const handleSubmit = (formData: Omit<Rubrik, 'id' | 'created_at' | 'updated_at'>) => {
        router.post(route('admin.rubrik.store'), formData);
    };

    return (
        <AppLayout user={auth.user}>
            <Head title='Create Rubrik' />
            <div className='space-y-4'>
                <Heading title='Create New Rubrik' description='Fill in the form below to add a new rubrik.' />
                <Card>
                    <CardHeader>
                        <CardTitle>Rubrik Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RubrikForm
                            rubrikKategoris={rubrikKategoris}
                            onSubmit={handleSubmit}
                            isSubmitting={processing}
                            formType='create'
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
