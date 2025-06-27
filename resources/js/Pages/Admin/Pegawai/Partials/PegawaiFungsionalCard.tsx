import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Fungsional, Pegawai, PegawaiFungsional } from '@/types';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import PegawaiFungsionalForm from './PegawaiFungsionalForm';
import { router } from '@inertiajs/react';

interface PegawaiFungsionalCardProps {
    pegawai: Pegawai;
    fungsionals: Fungsional[];
}

export default function PegawaiFungsionalCard({ pegawai, fungsionals }: PegawaiFungsionalCardProps) {
    const [showForm, setShowForm] = useState(false);
    const [selectedFungsional, setSelectedFungsional] = useState<PegawaiFungsional | undefined>();

    const handleAdd = () => {
        setSelectedFungsional(undefined);
        setShowForm(true);
    };

    const handleEdit = (fungsional: PegawaiFungsional) => {
        setSelectedFungsional(fungsional);
        setShowForm(true);
    };

    const handleDelete = (fungsional: PegawaiFungsional) => {
        if (confirm('Are you sure you want to delete this item?')) {
            router.delete(route('admin.pegawai.fungsional.destroy', { pegawai: pegawai.id, fungsional: fungsional.id }));
        }
    };

    return (
        <>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between'>
                    <CardTitle>Data Fungsional</CardTitle>
                    <Button size='sm' onClick={handleAdd}>
                        <PlusCircle className='mr-2 h-4 w-4' />
                        Add Fungsional
                    </Button>
                </CardHeader>
                <CardContent>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className='p-2 text-left'>Jabatan</th>
                                <th className='p-2 text-left'>TMT</th>
                                <th className='p-2 text-left'>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pegawai.fungsionals?.map((fungsional: PegawaiFungsional) => (
                                <tr key={fungsional.id}>
                                    <td className='p-2'>{fungsional.fungsional.nama}</td>
                                    <td className='p-2'>{fungsional.tmt}</td>
                                    <td className='p-2'>
                                        <Button variant='outline' size='sm' className='mr-2' onClick={() => handleEdit(fungsional)}>
                                            Edit
                                        </Button>
                                        <Button variant='destructive' size='sm' onClick={() => handleDelete(fungsional)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
            <PegawaiFungsionalForm
                pegawai={pegawai}
                fungsionals={fungsionals}
                fungsional={selectedFungsional}
                open={showForm}
                onClose={() => setShowForm(false)}
            />
        </>
    );
}
