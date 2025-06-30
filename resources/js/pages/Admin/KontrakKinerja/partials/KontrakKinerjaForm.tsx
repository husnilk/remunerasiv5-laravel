import { KontrakKinerja, Pegawai, Periode, SelectOption } from '@/types'; // Assuming Pegawai and Periode types exist
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming Shadcn Select
// import { Textarea } from '@/components/ui/textarea'; // If you have textareas
// import { Checkbox } from '@/components/ui/checkbox'; // If you have checkboxes

interface KontrakKinerjaFormProps {
    kontrakKinerja?: KontrakKinerja; // Optional: for edit mode
    allPegawai: Pick<Pegawai, 'id' | 'nama'>[]; // Or a more specific SelectOption type
    allPeriode: Pick<Periode, 'id' | 'nama'>[]; // Or a more specific SelectOption type
    onSubmit: (data: any) => void; // Adjust 'any' to a more specific type later
    onCancel: () => void;
    processing: boolean;
    errors: any; // Type this properly based on Inertia errors
}

// Helper to generate year options
const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        years.push({ value: i.toString(), label: i.toString() });
    }
    return years;
};

// Helper for month options
const monthOptions: SelectOption[] = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: new Date(0, i).toLocaleString('id-ID', { month: 'long' }), // Indonesian month names
}));

export default function KontrakKinerjaForm({
    kontrakKinerja,
    allPegawai,
    allPeriode,
    onSubmit,
    onCancel,
    processing,
    errors: formErrors, // Renamed to avoid conflict with useForm's errors
}: KontrakKinerjaFormProps) {
    const { data, setData, post, put, errors, reset } = useForm({
        pegawai_id: kontrakKinerja?.pegawai_id?.toString() || '',
        periode_id: kontrakKinerja?.periode_id?.toString() || '',
        tahun: kontrakKinerja?.tahun?.toString() || new Date().getFullYear().toString(),
        bulan_mulai: kontrakKinerja?.bulan_mulai?.toString() || '',
        bulan_selesai: kontrakKinerja?.bulan_selesai?.toString() || '',
        tanggal_mulai: kontrakKinerja?.tanggal_mulai || '',
        tanggal_selesai: kontrakKinerja?.tanggal_selesai || '',
        penilai_id: kontrakKinerja?.penilai_id?.toString() || '',
        atasan_penilai_id: kontrakKinerja?.atasan_penilai_id?.toString() || '',
        orientasi: kontrakKinerja?.orientasi?.toString() || '',
        integritas: kontrakKinerja?.integritas?.toString() || '',
        komitmen: kontrakKinerja?.komitmen?.toString() || '',
        disiplin: kontrakKinerja?.disiplin?.toString() || '',
        kerjasama: kontrakKinerja?.kerjasama?.toString() || '',
        kepemimpinan: kontrakKinerja?.kepemimpinan?.toString() || '',
        // Add all other fields from your migration here, ensuring they are initialized
        status: kontrakKinerja?.status?.toString() || '0', // Default to 'Draft'
        // ... other fields
    });

    const yearOptions = generateYearOptions();

    useEffect(() => {
        // Reset form if kontrakKinerja prop changes (e.g., for edit)
        if (kontrakKinerja) {
            reset({
                pegawai_id: kontrakKinerja.pegawai_id?.toString() || '',
                periode_id: kontrakKinerja.periode_id?.toString() || '',
                tahun: kontrakKinerja.tahun?.toString() || new Date().getFullYear().toString(),
                bulan_mulai: kontrakKinerja.bulan_mulai?.toString() || '',
                bulan_selesai: kontrakKinerja.bulan_selesai?.toString() || '',
                tanggal_mulai: kontrakKinerja.tanggal_mulai || '',
                tanggal_selesai: kontrakKinerja.tanggal_selesai || '',
                penilai_id: kontrakKinerja.penilai_id?.toString() || '',
                atasan_penilai_id: kontrakKinerja.atasan_penilai_id?.toString() || '',
                orientasi: kontrakKinerja.orientasi?.toString() || '',
                integritas: kontrakKinerja.integritas?.toString() || '',
                komitmen: kontrakKinerja.komitmen?.toString() || '',
                disiplin: kontrakKinerja.disiplin?.toString() || '',
                kerjasama: kontrakKinerja.kerjasama?.toString() || '',
                kepemimpinan: kontrakKinerja.kepemimpinan?.toString() || '',
                status: kontrakKinerja.status?.toString() || '0',
            });
        }
    }, [kontrakKinerja, reset]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        onSubmit(data); // The parent component (Create/Edit) will handle post/put
    };

    return (
        <form onSubmit={submit} className='space-y-6'>
            {/* Pegawai */}
            <div>
                <Label htmlFor='pegawai_id'>Pegawai</Label>
                <Select
                    value={data.pegawai_id}
                    onValueChange={(value) => setData('pegawai_id', value)}
                    disabled={processing}
                >
                    <SelectTrigger id='pegawai_id'>
                        <SelectValue placeholder='Pilih Pegawai' />
                    </SelectTrigger>
                    <SelectContent>
                        {allPegawai.map((peg) => (
                            <SelectItem key={peg.id} value={peg.id.toString()}>
                                {peg.nama}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={formErrors.pegawai_id || errors.pegawai_id} className='mt-2' />
            </div>

            {/* Periode */}
            <div>
                <Label htmlFor='periode_id'>Periode</Label>
                <Select
                    value={data.periode_id}
                    onValueChange={(value) => setData('periode_id', value)}
                    disabled={processing}
                >
                    <SelectTrigger id='periode_id'>
                        <SelectValue placeholder='Pilih Periode' />
                    </SelectTrigger>
                    <SelectContent>
                        {allPeriode.map((per) => (
                            <SelectItem key={per.id} value={per.id.toString()}>
                                {per.nama}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={formErrors.periode_id || errors.periode_id} className='mt-2' />
            </div>

            {/* Tahun */}
            <div>
                <Label htmlFor='tahun'>Tahun</Label>
                <Select value={data.tahun} onValueChange={(value) => setData('tahun', value)} disabled={processing}>
                    <SelectTrigger id='tahun'>
                        <SelectValue placeholder='Pilih Tahun' />
                    </SelectTrigger>
                    <SelectContent>
                        {yearOptions.map((year) => (
                            <SelectItem key={year.value} value={year.value}>
                                {year.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={formErrors.tahun || errors.tahun} className='mt-2' />
            </div>

            {/* Bulan Mulai */}
            <div>
                <Label htmlFor='bulan_mulai'>Bulan Mulai</Label>
                <Select
                    value={data.bulan_mulai}
                    onValueChange={(value) => setData('bulan_mulai', value)}
                    disabled={processing}
                >
                    <SelectTrigger id='bulan_mulai'>
                        <SelectValue placeholder='Pilih Bulan Mulai' />
                    </SelectTrigger>
                    <SelectContent>
                        {monthOptions.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                                {month.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={formErrors.bulan_mulai || errors.bulan_mulai} className='mt-2' />
            </div>

            {/* Bulan Selesai */}
            <div>
                <Label htmlFor='bulan_selesai'>Bulan Selesai</Label>
                <Select
                    value={data.bulan_selesai}
                    onValueChange={(value) => setData('bulan_selesai', value)}
                    disabled={processing}
                >
                    <SelectTrigger id='bulan_selesai'>
                        <SelectValue placeholder='Pilih Bulan Selesai' />
                    </SelectTrigger>
                    <SelectContent>
                        {monthOptions.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                                {month.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={formErrors.bulan_selesai || errors.bulan_selesai} className='mt-2' />
            </div>

            {/* Tanggal Mulai */}
            <div>
                <Label htmlFor='tanggal_mulai'>Tanggal Mulai</Label>
                <Input
                    id='tanggal_mulai'
                    type='date'
                    value={data.tanggal_mulai}
                    onChange={(e) => setData('tanggal_mulai', e.target.value)}
                    disabled={processing}
                />
                <InputError message={formErrors.tanggal_mulai || errors.tanggal_mulai} className='mt-2' />
            </div>

            {/* Tanggal Selesai */}
            <div>
                <Label htmlFor='tanggal_selesai'>Tanggal Selesai</Label>
                <Input
                    id='tanggal_selesai'
                    type='date'
                    value={data.tanggal_selesai}
                    onChange={(e) => setData('tanggal_selesai', e.target.value)}
                    disabled={processing}
                />
                <InputError message={formErrors.tanggal_selesai || errors.tanggal_selesai} className='mt-2' />
            </div>

            {/* Penilai */}
            <div>
                <Label htmlFor='penilai_id'>Penilai</Label>
                <Select
                    value={data.penilai_id}
                    onValueChange={(value) => setData('penilai_id', value)}
                    disabled={processing}
                >
                    <SelectTrigger id='penilai_id'>
                        <SelectValue placeholder='Pilih Penilai' />
                    </SelectTrigger>
                    <SelectContent>
                        {allPegawai.map((peg) => (
                            <SelectItem key={peg.id} value={peg.id.toString()}>
                                {peg.nama}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={formErrors.penilai_id || errors.penilai_id} className='mt-2' />
            </div>

            {/* Atasan Penilai */}
            <div>
                <Label htmlFor='atasan_penilai_id'>Atasan Penilai</Label>
                <Select
                    value={data.atasan_penilai_id}
                    onValueChange={(value) => setData('atasan_penilai_id', value)}
                    disabled={processing}
                >
                    <SelectTrigger id='atasan_penilai_id'>
                        <SelectValue placeholder='Pilih Atasan Penilai' />
                    </SelectTrigger>
                    <SelectContent>
                        {allPegawai.map((peg) => (
                            <SelectItem key={peg.id} value={peg.id.toString()}>
                                {peg.nama}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={formErrors.atasan_penilai_id || errors.atasan_penilai_id} className='mt-2' />
            </div>

            {/* Perilaku Fields (Orientasi, Integritas, etc.) - Example for Orientasi */}
            <div>
                <Label htmlFor='orientasi'>Orientasi Pelayanan (0-100)</Label>
                <Input
                    id='orientasi'
                    type='number'
                    min='0'
                    max='100'
                    value={data.orientasi}
                    onChange={(e) => setData('orientasi', e.target.value)}
                    disabled={processing}
                />
                <InputError message={formErrors.orientasi || errors.orientasi} className='mt-2' />
            </div>
            {/* Add Integritas, Komitmen, Disiplin, Kerjasama, Kepemimpinan similarly */}
            <div>
                <Label htmlFor='integritas'>Integritas (0-100)</Label>
                <Input id='integritas' type='number' min='0' max='100' value={data.integritas} onChange={(e) => setData('integritas', e.target.value)} disabled={processing} />
                <InputError message={formErrors.integritas || errors.integritas} className='mt-2' />
            </div>
            <div>
                <Label htmlFor='komitmen'>Komitmen (0-100)</Label>
                <Input id='komitmen' type='number' min='0' max='100' value={data.komitmen} onChange={(e) => setData('komitmen', e.target.value)} disabled={processing} />
                <InputError message={formErrors.komitmen || errors.komitmen} className='mt-2' />
            </div>
            <div>
                <Label htmlFor='disiplin'>Disiplin (0-100)</Label>
                <Input id='disiplin' type='number' min='0' max='100' value={data.disiplin} onChange={(e) => setData('disiplin', e.target.value)} disabled={processing} />
                <InputError message={formErrors.disiplin || errors.disiplin} className='mt-2' />
            </div>
            <div>
                <Label htmlFor='kerjasama'>Kerjasama (0-100)</Label>
                <Input id='kerjasama' type='number' min='0' max='100' value={data.kerjasama} onChange={(e) => setData('kerjasama', e.target.value)} disabled={processing} />
                <InputError message={formErrors.kerjasama || errors.kerjasama} className='mt-2' />
            </div>
            <div>
                <Label htmlFor='kepemimpinan'>Kepemimpinan (0-100, jika berlaku)</Label>
                <Input id='kepemimpinan' type='number' min='0' max='100' value={data.kepemimpinan} onChange={(e) => setData('kepemimpinan', e.target.value)} disabled={processing} />
                <InputError message={formErrors.kepemimpinan || errors.kepemimpinan} className='mt-2' />
            </div>


            {/* Status - This might be controlled by workflow rather than direct user input in many cases */}
            {/* For simplicity, allowing selection here. Adjust based on requirements. */}
            {kontrakKinerja && ( // Only show status editing for existing records, or adjust logic
                 <div>
                    <Label htmlFor='status'>Status</Label>
                    <Select
                        value={data.status}
                        onValueChange={(value) => setData('status', value)}
                        disabled={processing}
                    >
                        <SelectTrigger id='status'>
                            <SelectValue placeholder='Pilih Status' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='0'>Draft</SelectItem>
                            <SelectItem value='1'>Submitted</SelectItem>
                            <SelectItem value='2'>Approved</SelectItem>
                            <SelectItem value='3'>Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={formErrors.status || errors.status} className='mt-2' />
                </div>
            )}


            {/* Add other fields here:
                keberatan, tanggal_keberatan, tanggapan, tanggal_tanggapan, keputusan, tanggal_keputusan,
                rekomendasi, tanggal_buat, tanggal_terima, tanggal_terima_atasan, verified_at, verified_by,
                capaian_skp, predikat_kinerja, rating_perilaku, rating_kinerja, file_bukti, poin,
                poin_verifikasi, file_kontrak, file_kinerja, tingkat_pelanggaran
                Use Textarea for multi-line text, Input type='file' for file uploads (requires backend handling)
            */}

            <div className='flex items-center justify-end gap-4'>
                <Button type='button' variant='outline' onClick={onCancel} disabled={processing}>
                    Batal
                </Button>
                <Button type='submit' disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </div>
        </form>
    );
}
