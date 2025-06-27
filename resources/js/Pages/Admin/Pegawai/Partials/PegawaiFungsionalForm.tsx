import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { Fungsional, Pegawai, PegawaiFungsional } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PegawaiFungsionalFormProps {
    pegawai: Pegawai;
    fungsionals: Fungsional[];
    fungsional?: PegawaiFungsional;
    open: boolean;
    onClose: () => void;
}

export default function PegawaiFungsionalForm({ pegawai, fungsionals, fungsional, open, onClose }: PegawaiFungsionalFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        fungsional_id: fungsional?.fungsional_id || '',
        tmt: fungsional?.tmt || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (fungsional) {
            put(route('admin.pegawai.fungsional.update', { pegawai: pegawai.id, fungsional: fungsional.id }), {
                onSuccess: () => onClose(),
            });
        } else {
            post(route('admin.pegawai.fungsional.store', { pegawai: pegawai.id }), {
                onSuccess: () => onClose(),
            });
        }
    };

    useEffect(() => {
        if (open) {
            reset();
            setData({
                fungsional_id: fungsional?.fungsional_id || '',
                tmt: fungsional?.tmt || '',
            });
        }
    }, [open, fungsional, reset, setData]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{fungsional ? 'Edit' : 'Add'} Fungsional</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className='space-y-4'>
                    <div>
                        <Label htmlFor='fungsional_id'>Jabatan Fungsional</Label>
                        <select
                            id='fungsional_id'
                            value={data.fungsional_id}
                            onChange={(e) => setData('fungsional_id', e.target.value)}
                            className='w-full mt-1'
                        >
                            <option value=''>Pilih Jabatan</option>
                            {fungsionals.map((f) => (
                                <option key={f.id} value={f.id}>
                                    {f.nama}
                                </option>
                            ))}
                        </select>
                        {errors.fungsional_id && <p className='text-red-500 text-xs mt-1'>{errors.fungsional_id}</p>}
                    </div>
                    <div>
                        <Label htmlFor='tmt'>TMT</Label>
                        <Input
                            id='tmt'
                            type='date'
                            value={data.tmt}
                            onChange={(e) => setData('tmt', e.target.value)}
                        />
                        {errors.tmt && <p className='text-red-500 text-xs mt-1'>{errors.tmt}</p>}
                    </div>
                    <div className='flex justify-end space-x-2'>
                        <Button type='button' variant='outline' onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type='submit' disabled={processing}>
                            {processing ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
