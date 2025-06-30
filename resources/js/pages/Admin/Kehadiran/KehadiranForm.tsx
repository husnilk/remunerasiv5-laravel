import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Kehadiran, PageProps, Pegawai, Periode } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';

interface KehadiranFormData {
    pegawai_id: string | number;
    periode_id: string | number;
    status_pegawai: number;
    tahun: number;
    bulan: number;
    hadir: number;
    dinas_luar: number;
    cuti_sakit: number;
    cuti_izin: number;
    cuti_besar: number;
    cuti_tahunan: number;
    cuti_melahirkan: number;
    cuti_penting: number;
    cuti_non_taggungan: number;
    tanpa_keterangan: number;
    tugas_belajar: number;
    cuti_bersalin_01: number;
    cuti_bersalin_02: number;
    cuti_bersalin_03: number;
    terlambat_01: number;
    terlambat_02: number;
    terlambat_03: number;
    terlambat_04: number;
    terlambat_05: number;
    terlambat_06: number;
    pulang_cepat_01: number;
    pulang_cepat_02: number;
    pulang_cepat_03: number;
    pulang_cepat_04: number;
    pulang_cepat_05: number;
    pulang_cepat_06: number;
}

interface KehadiranFormProps extends PageProps {
    kehadiran?: Kehadiran;
    pegawais: Pegawai[];
    periodes: Periode[];
    action: 'create' | 'edit';
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

export default function KehadiranForm({
    auth,
    kehadiran,
    pegawais,
    periodes,
    action,
}: KehadiranFormProps) {
    const isEdit = action === 'edit';
    const title = isEdit ? 'Edit Kehadiran' : 'Tambah Kehadiran';
    const description = isEdit
        ? 'Perbarui data kehadiran pegawai.'
        : 'Tambah data kehadiran pegawai baru.';
    const endpoint = isEdit
        ? route('admin.kehadiran.update', kehadiran?.id)
        : route('admin.kehadiran.store');

    const { data, setData, post, put, processing, errors } = useForm<KehadiranFormData>({
        pegawai_id: kehadiran?.pegawai_id || '',
        periode_id: kehadiran?.periode_id || '',
        status_pegawai: kehadiran?.status_pegawai || 1,
        tahun: kehadiran?.tahun || currentYear,
        bulan: kehadiran?.bulan || new Date().getMonth() + 1,
        hadir: kehadiran?.hadir || 0,
        dinas_luar: kehadiran?.dinas_luar || 0,
        cuti_sakit: kehadiran?.cuti_sakit || 0,
        cuti_izin: kehadiran?.cuti_izin || 0,
        cuti_besar: kehadiran?.cuti_besar || 0,
        cuti_tahunan: kehadiran?.cuti_tahunan || 0,
        cuti_melahirkan: kehadiran?.cuti_melahirkan || 0,
        cuti_penting: kehadiran?.cuti_penting || 0,
        cuti_non_taggungan: kehadiran?.cuti_non_taggungan || 0,
        tanpa_keterangan: kehadiran?.tanpa_keterangan || 0,
        tugas_belajar: kehadiran?.tugas_belajar || 0,
        cuti_bersalin_01: kehadiran?.cuti_bersalin_01 || 0,
        cuti_bersalin_02: kehadiran?.cuti_bersalin_02 || 0,
        cuti_bersalin_03: kehadiran?.cuti_bersalin_03 || 0,
        terlambat_01: kehadiran?.terlambat_01 || 0,
        terlambat_02: kehadiran?.terlambat_02 || 0,
        terlambat_03: kehadiran?.terlambat_03 || 0,
        terlambat_04: kehadiran?.terlambat_04 || 0,
        terlambat_05: kehadiran?.terlambat_05 || 0,
        terlambat_06: kehadiran?.terlambat_06 || 0,
        pulang_cepat_01: kehadiran?.pulang_cepat_01 || 0,
        pulang_cepat_02: kehadiran?.pulang_cepat_02 || 0,
        pulang_cepat_03: kehadiran?.pulang_cepat_03 || 0,
        pulang_cepat_04: kehadiran?.pulang_cepat_04 || 0,
        pulang_cepat_05: kehadiran?.pulang_cepat_05 || 0,
        pulang_cepat_06: kehadiran?.pulang_cepat_06 || 0,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(endpoint, { preserveScroll: true });
        } else {
            post(endpoint, { preserveScroll: true });
        }
    };

    const formFields = [
        { name: 'hadir', label: 'Hadir', type: 'number' },
        { name: 'dinas_luar', label: 'Dinas Luar', type: 'number' },
        { name: 'cuti_sakit', label: 'Cuti Sakit', type: 'number' },
        { name: 'cuti_izin', label: 'Cuti Izin', type: 'number' },
        { name: 'cuti_besar', label: 'Cuti Besar', type: 'number' },
        { name: 'cuti_tahunan', label: 'Cuti Tahunan', type: 'number' },
        { name: 'cuti_melahirkan', label: 'Cuti Melahirkan', type: 'number' },
        { name: 'cuti_penting', label: 'Cuti Penting', type: 'number' },
        { name: 'cuti_non_taggungan', label: 'Cuti Non Tanggungan', type: 'number' },
        { name: 'tanpa_keterangan', label: 'Tanpa Keterangan', type: 'number' },
        { name: 'tugas_belajar', label: 'Tugas Belajar', type: 'number' },
        { name: 'cuti_bersalin_01', label: 'Cuti Bersalin Anak ke-1', type: 'number' },
        { name: 'cuti_bersalin_02', label: 'Cuti Bersalin Anak ke-2', type: 'number' },
        { name: 'cuti_bersalin_03', label: 'Cuti Bersalin Anak ke-3, dst.', type: 'number' },
    ];

    const lateFields = [
        { name: 'terlambat_01', label: 'Terlambat < 15 Menit', type: 'number' },
        { name: 'terlambat_02', label: 'Terlambat 15 - <30 Menit', type: 'number' },
        { name: 'terlambat_03', label: 'Terlambat 30 - <60 Menit', type: 'number' },
        { name: 'terlambat_04', label: 'Terlambat 60 - <90 Menit', type: 'number' },
        { name: 'terlambat_05', label: 'Terlambat >= 90 Menit', type: 'number' },
        { name: 'terlambat_06', label: 'Terlambat >1 Hari Kerja', type: 'number' },
    ];

    const earlyLeaveFields = [
        { name: 'pulang_cepat_01', label: 'Pulang Cepat < 15 Menit', type: 'number' },
        { name: 'pulang_cepat_02', label: 'Pulang Cepat 15 - <30 Menit', type: 'number' },
        { name: 'pulang_cepat_03', label: 'Pulang Cepat 30 - <60 Menit', type: 'number' },
        { name: 'pulang_cepat_04', label: 'Pulang Cepat 60 - <90 Menit', type: 'number' },
        { name: 'pulang_cepat_05', label: 'Pulang Cepat >= 90 Menit', type: 'number' },
        { name: 'pulang_cepat_06', label: 'Pulang Cepat >1 Hari Kerja', type: 'number' },
    ];

    return (
        <AppLayout user={auth.user}>
            <Head title={title} />
            <div className='max-w-4xl mx-auto p-6'>
                <div className='flex items-center justify-between mb-6'>
                    <Heading title={title} description={description} />
                    <Link href={route('admin.kehadiran.index')}>
                        <Button variant='outline'>Kembali</Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* Pegawai */}
                        <div>
                            <Label htmlFor='pegawai_id'>Pegawai</Label>
                            <Select
                                name='pegawai_id'
                                value={data.pegawai_id?.toString()}
                                onValueChange={(value) => setData('pegawai_id', value)}
                                disabled={isEdit} // Disable if editing, as pegawai shouldn't change
                            >
                                <SelectTrigger id='pegawai_id'>
                                    <SelectValue placeholder='Pilih Pegawai' />
                                </SelectTrigger>
                                <SelectContent>
                                    {pegawais.map((peg) => (
                                        <SelectItem key={peg.id} value={peg.id.toString()}>
                                            {peg.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.pegawai_id} className='mt-2' />
                        </div>

                        {/* Periode */}
                        <div>
                            <Label htmlFor='periode_id'>Periode</Label>
                            <Select
                                name='periode_id'
                                value={data.periode_id?.toString()}
                                onValueChange={(value) => setData('periode_id', value)}>
                                <SelectTrigger id='periode_id'>
                                    <SelectValue placeholder='Pilih Periode' />
                                </SelectTrigger>
                                <SelectContent>
                                    {periodes.map((per) => (
                                        <SelectItem key={per.id} value={per.id.toString()}>
                                            {per.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.periode_id} className='mt-2' />
                        </div>

                        {/* Tahun */}
                        <div>
                            <Label htmlFor='tahun'>Tahun</Label>
                            <Select
                                name='tahun'
                                value={data.tahun.toString()}
                                onValueChange={(value) => setData('tahun', parseInt(value))}>
                                <SelectTrigger id='tahun'>
                                    <SelectValue placeholder='Pilih Tahun' />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem key={year} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.tahun} className='mt-2' />
                        </div>

                        {/* Bulan */}
                        <div>
                            <Label htmlFor='bulan'>Bulan</Label>
                            <Select
                                name='bulan'
                                value={data.bulan.toString()}
                                onValueChange={(value) => setData('bulan', parseInt(value))}>
                                <SelectTrigger id='bulan'>
                                    <SelectValue placeholder='Pilih Bulan' />
                                </SelectTrigger>
                                <SelectContent>
                                    {months.map((month) => (
                                        <SelectItem key={month} value={month.toString()}>
                                            {new Date(0, month - 1).toLocaleString('id-ID', { month: 'long' })}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.bulan} className='mt-2' />
                        </div>

                        {/* Status Pegawai */}
                        <div>
                            <Label htmlFor='status_pegawai'>Status Pegawai</Label>
                            <Select
                                name='status_pegawai'
                                value={data.status_pegawai.toString()}
                                onValueChange={(value) => setData('status_pegawai', parseInt(value))}>
                                <SelectTrigger id='status_pegawai'>
                                    <SelectValue placeholder='Pilih Status Pegawai' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='1'>Aktif</SelectItem>
                                    <SelectItem value='0'>Tidak Aktif</SelectItem>
                                    {/* Add other statuses as needed */}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status_pegawai} className='mt-2' />
                        </div>
                    </div>

                    {/* Kehadiran Fields */}
                    <div className='space-y-2 border p-4 rounded-md'>
                        <h3 className='text-lg font-medium'>Detail Kehadiran</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {formFields.map((field) => (
                                <div key={field.name}>
                                    <Label htmlFor={field.name}>{field.label}</Label>
                                    <Input
                                        id={field.name}
                                        type={field.type}
                                        name={field.name}
                                        value={data[field.name as keyof KehadiranFormData]}
                                        onChange={(e) =>
                                            setData(
                                                field.name as keyof KehadiranFormData,
                                                e.target.type === 'number'
                                                    ? parseInt(e.target.value) || 0
                                                    : e.target.value
                                            )
                                        }
                                        className='mt-1 block w-full'
                                        min={0}
                                    />
                                    <InputError
                                        message={errors[field.name as keyof KehadiranFormData]}
                                        className='mt-2'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Keterlambatan Fields */}
                    <div className='space-y-2 border p-4 rounded-md'>
                        <h3 className='text-lg font-medium'>Detail Keterlambatan</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {lateFields.map((field) => (
                                <div key={field.name}>
                                    <Label htmlFor={field.name}>{field.label}</Label>
                                    <Input
                                        id={field.name}
                                        type={field.type}
                                        name={field.name}
                                        value={data[field.name as keyof KehadiranFormData]}
                                        onChange={(e) =>
                                            setData(
                                                field.name as keyof KehadiranFormData,
                                                e.target.type === 'number'
                                                    ? parseInt(e.target.value) || 0
                                                    : e.target.value
                                            )
                                        }
                                        className='mt-1 block w-full'
                                        min={0}
                                    />
                                    <InputError
                                        message={errors[field.name as keyof KehadiranFormData]}
                                        className='mt-2'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pulang Cepat Fields */}
                    <div className='space-y-2 border p-4 rounded-md'>
                        <h3 className='text-lg font-medium'>Detail Pulang Cepat</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {earlyLeaveFields.map((field) => (
                                <div key={field.name}>
                                    <Label htmlFor={field.name}>{field.label}</Label>
                                    <Input
                                        id={field.name}
                                        type={field.type}
                                        name={field.name}
                                        value={data[field.name as keyof KehadiranFormData]}
                                        onChange={(e) =>
                                            setData(
                                                field.name as keyof KehadiranFormData,
                                                e.target.type === 'number'
                                                    ? parseInt(e.target.value) || 0
                                                    : e.target.value
                                            )
                                        }
                                        className='mt-1 block w-full'
                                        min={0}
                                    />
                                    <InputError
                                        message={errors[field.name as keyof KehadiranFormData]}
                                        className='mt-2'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className='flex items-center justify-end gap-4'>
                        <Link href={route('admin.kehadiran.index')}>
                            <Button type='button' variant='outline'>
                                Batal
                            </Button>
                        </Link>
                        <Button type='submit' disabled={processing}>
                            {isEdit ? 'Simpan Perubahan' : 'Simpan Kehadiran'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
