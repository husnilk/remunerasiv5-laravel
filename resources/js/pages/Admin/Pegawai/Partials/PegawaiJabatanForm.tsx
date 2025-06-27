import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { InputError } from '@/components/ui/input-error'; // Assuming this is your InputError component
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JabatanUnit, PegawaiJabatan } from '@/types';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { CalendarIcon } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

interface PegawaiJabatanFormProps {
    pegawaiId: number;
    jabatanUnits: JabatanUnit[];
    pegawaiJabatan?: PegawaiJabatan; // For editing
    onSuccess?: () => void;
    onCancel: () => void;
    submitButtonText?: string;
}

type FormData = {
    jabatan_unit_id: string; // Keep as string for form state
    tmt: Date | undefined;
    selesai: Date | undefined;
};

export default function PegawaiJabatanForm({
    pegawaiId,
    jabatanUnits,
    pegawaiJabatan,
    onSuccess,
    onCancel,
    submitButtonText = 'Simpan',
}: PegawaiJabatanFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm<FormData>({
        jabatan_unit_id: pegawaiJabatan?.jabatan_unit_id?.toString() || '',
        tmt: pegawaiJabatan?.tmt ? parseISO(pegawaiJabatan.tmt) : undefined,
        selesai: pegawaiJabatan?.selesai ? parseISO(pegawaiJabatan.selesai) : undefined,
    });

    useEffect(() => {
        if (pegawaiJabatan) {
            setData({
                jabatan_unit_id: pegawaiJabatan.jabatan_unit_id?.toString() || '',
                tmt: pegawaiJabatan.tmt ? parseISO(pegawaiJabatan.tmt) : undefined,
                selesai: pegawaiJabatan.selesai ? parseISO(pegawaiJabatan.selesai) : undefined,
            });
        } else {
            reset();
        }
    }, [pegawaiJabatan]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const formattedData = {
            ...data,
            tmt: data.tmt ? format(data.tmt, 'yyyy-MM-dd') : null,
            selesai: data.selesai ? format(data.selesai, 'yyyy-MM-dd') : null,
        };

        if (pegawaiJabatan) {
            put(route('admin.pegawai-jabatan.update', pegawaiJabatan.id), {
                data: formattedData,
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                },
                preserveScroll: true,
            });
        } else {
            post(route('admin.pegawai.pegawai-jabatan.store', pegawaiId), {
                data: formattedData,
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                },
                preserveScroll: true,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <Label htmlFor='jabatan_unit_id'>Jabatan Unit</Label>
                <Select
                    value={data.jabatan_unit_id}
                    onValueChange={(value) => setData('jabatan_unit_id', value)}
                >
                    <SelectTrigger id='jabatan_unit_id'>
                        <SelectValue placeholder='Pilih Jabatan Unit' />
                    </SelectTrigger>
                    <SelectContent>
                        {jabatanUnits.map((ju) => (
                            <SelectItem key={ju.id} value={ju.id.toString()}>
                                {ju.nama} ({ju.jabatan?.nama} - {ju.unit?.nama})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.jabatan_unit_id} className='mt-2' />
            </div>

            <div>
                <Label htmlFor='tmt'>Tanggal Mulai Tugas (TMT)</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={'outline'}
                            className={cn(
                                'w-full justify-start text-left font-normal',
                                !data.tmt && 'text-muted-foreground',
                            )}
                        >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {data.tmt ? format(data.tmt, 'PPP') : <span>Pilih tanggal</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                        <Calendar
                            mode='single'
                            selected={data.tmt}
                            onSelect={(date) => setData('tmt', date)}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <InputError message={errors.tmt} className='mt-2' />
            </div>

            <div>
                <Label htmlFor='selesai'>Tanggal Selesai (Opsional)</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={'outline'}
                            className={cn(
                                'w-full justify-start text-left font-normal',
                                !data.selesai && 'text-muted-foreground',
                            )}
                        >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {data.selesai ? format(data.selesai, 'PPP') : <span>Pilih tanggal</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                        <Calendar
                            mode='single'
                            selected={data.selesai}
                            onSelect={(date) => setData('selesai', date)}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <InputError message={errors.selesai} className='mt-2' />
            </div>

            <div className='flex justify-end space-x-2'>
                <Button type='button' variant='outline' onClick={onCancel} disabled={processing}>
                    Batal
                </Button>
                <Button type='submit' disabled={processing}>
                    {processing ? 'Menyimpan...' : submitButtonText}
                </Button>
            </div>
        </form>
    );
}
