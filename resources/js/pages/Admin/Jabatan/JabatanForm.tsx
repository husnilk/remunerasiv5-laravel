import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Jabatan } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { CalendarIcon, Save } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import InputError from '@/components/input-error';

interface JabatanFormProps {
    jabatan?: Jabatan;
    onSubmit: (data: Partial<Jabatan>) => void;
    processing: boolean;
    errors: Partial<Record<keyof Jabatan, string>>;
}

export default function JabatanForm({ jabatan, onSubmit, processing, errors }: JabatanFormProps) {
    const { data, setData, transform } = useForm<Partial<Jabatan>>({
        nama: jabatan?.nama || '',
        grade: jabatan?.grade || undefined,
        job_value: jabatan?.job_value || undefined,
        cg: jabatan?.cg || false,
        poin_skp: jabatan?.poin_skp || undefined,
        active: jabatan?.active === undefined ? true : jabatan.active,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const transformedData = { ...data };
        // Ensure numbers are numbers, not strings from input
        if (transformedData.grade !== undefined) transformedData.grade = Number(transformedData.grade);
        if (transformedData.job_value !== undefined) transformedData.job_value = Number(transformedData.job_value);
        if (transformedData.poin_skp !== undefined) transformedData.poin_skp = Number(transformedData.poin_skp);

        onSubmit(transformedData);
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
                <Label htmlFor='nama'>Nama Jabatan</Label>
                <Input
                    id='nama'
                    name='nama'
                    value={data.nama}
                    onChange={(e) => setData('nama', e.target.value)}
                    className='mt-1 block w-full'
                    required
                />
                <InputError message={errors.nama} className='mt-2' />
            </div>

            <div>
                <Label htmlFor='grade'>Grade</Label>
                <Input
                    id='grade'
                    name='grade'
                    type='number'
                    value={data.grade === undefined ? '' : data.grade}
                    onChange={(e) => setData('grade', e.target.value === '' ? undefined : parseInt(e.target.value))}
                    className='mt-1 block w-full'
                    required
                />
                <InputError message={errors.grade} className='mt-2' />
            </div>

            <div>
                <Label htmlFor='job_value'>Job Value</Label>
                <Input
                    id='job_value'
                    name='job_value'
                    type='number'
                    value={data.job_value === undefined ? '' : data.job_value}
                    onChange={(e) => setData('job_value', e.target.value === '' ? undefined : parseInt(e.target.value))}
                    className='mt-1 block w-full'
                    required
                />
                <InputError message={errors.job_value} className='mt-2' />
            </div>

            <div>
                <Label htmlFor='poin_skp'>Poin SKP</Label>
                <Input
                    id='poin_skp'
                    name='poin_skp'
                    type='number'
                    value={data.poin_skp === undefined ? '' : data.poin_skp}
                    onChange={(e) => setData('poin_skp', e.target.value === '' ? undefined : parseInt(e.target.value))}
                    className='mt-1 block w-full'
                />
                <InputError message={errors.poin_skp} className='mt-2' />
            </div>

            <div className='flex items-center space-x-2'>
                <Checkbox
                    id='cg'
                    name='cg'
                    checked={data.cg}
                    onCheckedChange={(checked) => setData('cg', Boolean(checked))}
                />
                <Label htmlFor='cg' className='font-medium'>
                    Corporate Grade (CG)
                </Label>
                <InputError message={errors.cg} className='mt-2' />
            </div>

            <div className='flex items-center space-x-2'>
                <Checkbox
                    id='active'
                    name='active'
                    checked={data.active}
                    onCheckedChange={(checked) => setData('active', Boolean(checked))}
                />
                <Label htmlFor='active' className='font-medium'>
                    Active
                </Label>
                <InputError message={errors.active} className='mt-2' />
            </div>

            <div className='flex items-center justify-end gap-4'>
                <Button variant='outline' asChild>
                    <Link href={route('data-master.jabatan.index')}>Cancel</Link>
                </Button>
                <Button type='submit' disabled={processing}>
                    <Save className='mr-2 h-4 w-4' />
                    {processing ? 'Saving...' : 'Save Jabatan'}
                </Button>
            </div>
        </form>
    );
}
