import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Pegawai, PegawaiJenis } from '@/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea'; // Assuming you might want a bio or notes field

interface PegawaiFormProps {
    pegawai?: Pegawai;
    pegawaiJenis: PegawaiJenis[];
    onSubmit: (data: any) => void; // Adjust 'any' to a more specific type if possible
    processing: boolean;
    errors: Partial<Record<keyof Pegawai | string, string>>; // Allow string keys for general errors
}

export default function PegawaiForm({ pegawai, pegawaiJenis, onSubmit, processing, errors }: PegawaiFormProps) {
    const { data, setData, transform } = useForm<Partial<Pegawai>>({
        nama: pegawai?.nama || '',
        nik: pegawai?.nik || '',
        nip: pegawai?.nip || '',
        email: pegawai?.email || '',
        nohp: pegawai?.nohp || '',
        tempat_lahir: pegawai?.tempat_lahir || '',
        tanggal_lahir: pegawai?.tanggal_lahir || '',
        jenis_kelamin: pegawai?.jenis_kelamin || 1, // Default to 1 (e.g., Male)
        npwp: pegawai?.npwp || '',
        pegawai_jenis_id: pegawai?.pegawai_jenis_id || undefined,
        // profile_picture: null, // Handle file input separately if needed
        aktif: pegawai?.aktif === undefined ? 1 : pegawai.aktif, // Default to 1 (Active)
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Transform data if necessary, e.g., for file uploads
        // transform((currentData) => ({
        //     ...currentData,
        //     // _method: pegawai ? 'PUT' : 'POST', // Inertia handles this automatically for put/patch/delete
        // }));
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
                <Label htmlFor='nama'>Nama</Label>
                <Input
                    id='nama'
                    name='nama'
                    value={data.nama}
                    onChange={(e) => setData('nama', e.target.value)}
                    required
                />
                <InputError message={errors.nama} className='mt-2' />
            </div>

            <div>
                <Label htmlFor='nik'>NIK</Label>
                <Input
                    id='nik'
                    name='nik'
                    value={data.nik}
                    onChange={(e) => setData('nik', e.target.value)}
                    required
                />
                <InputError message={errors.nik} className='mt-2' />
            </div>

            <div>
                <Label htmlFor='nip'>NIP</Label>
                <Input
                    id='nip'
                    name='nip'
                    value={data.nip}
                    onChange={(e) => setData('nip', e.target.value)}
                    required
                />
                <InputError message={errors.nip} className='mt-2' />
            </div>

            <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                    id='email'
                    type='email'
                    name='email'
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                />
                <InputError message={errors.email} className='mt-2' />
            </div>

            <div>
                <Label htmlFor='nohp'>No. HP</Label>
                <Input
                    id='nohp'
                    name='nohp'
                    value={data.nohp || ''}
                    onChange={(e) => setData('nohp', e.target.value)}
                />
                <InputError message={errors.nohp} className='mt-2' />
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div>
                    <Label htmlFor='tempat_lahir'>Tempat Lahir</Label>
                    <Input
                        id='tempat_lahir'
                        name='tempat_lahir'
                        value={data.tempat_lahir || ''}
                        onChange={(e) => setData('tempat_lahir', e.target.value)}
                    />
                    <InputError message={errors.tempat_lahir} className='mt-2' />
                </div>
                <div>
                    <Label htmlFor='tanggal_lahir'>Tanggal Lahir</Label>
                    <Input
                        id='tanggal_lahir'
                        type='date'
                        name='tanggal_lahir'
                        value={data.tanggal_lahir || ''}
                        onChange={(e) => setData('tanggal_lahir', e.target.value)}
                    />
                    <InputError message={errors.tanggal_lahir} className='mt-2' />
                </div>
            </div>

            <div>
                <Label htmlFor='jenis_kelamin'>Jenis Kelamin</Label>
                <Select
                    name='jenis_kelamin'
                    value={String(data.jenis_kelamin)}
                    onValueChange={(value) => setData('jenis_kelamin', parseInt(value))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder='Pilih Jenis Kelamin' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='1'>Laki-laki</SelectItem>
                        <SelectItem value='2'>Perempuan</SelectItem>
                    </SelectContent>
                </Select>
                <InputError message={errors.jenis_kelamin} className='mt-2' />
            </div>

            <div>
                <Label htmlFor='npwp'>NPWP</Label>
                <Input
                    id='npwp'
                    name='npwp'
                    value={data.npwp || ''}
                    onChange={(e) => setData('npwp', e.target.value)}
                />
                <InputError message={errors.npwp} className='mt-2' />
            </div>

            <div>
                <Label htmlFor='pegawai_jenis_id'>Jenis Pegawai</Label>
                <Select
                    name='pegawai_jenis_id'
                    value={String(data.pegawai_jenis_id || '')}
                    onValueChange={(value) => setData('pegawai_jenis_id', parseInt(value))}

                >
                    <SelectTrigger>
                        <SelectValue placeholder='Pilih Jenis Pegawai' />
                    </SelectTrigger>
                    <SelectContent>
                        {pegawaiJenis.map((jenis) => (
                            <SelectItem key={jenis.id} value={String(jenis.id)}>
                                {jenis.nama}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.pegawai_jenis_id} className='mt-2' />
            </div>

            {/* <div>
                <Label htmlFor="profile_picture">Profile Picture</Label>
                <Input
                    id="profile_picture"
                    type="file"
                    name="profile_picture"
                    onChange={(e) => setData('profile_picture', e.target.files ? e.target.files[0] : null)}
                />
                <InputError message={errors.profile_picture} className='mt-2' />
            </div> */}

            <div>
                <Label htmlFor='aktif'>Status Aktif</Label>
                <Select
                    name='aktif'
                    value={String(data.aktif)}
                    onValueChange={(value) => setData('aktif', parseInt(value))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder='Pilih Status Aktif' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='1'>Aktif</SelectItem>
                        <SelectItem value='0'>Tidak Aktif</SelectItem>
                    </SelectContent>
                </Select>
                <InputError message={errors.aktif} className='mt-2' />
            </div>


            <div className='flex items-center justify-end gap-4'>
                <Button type='submit' disabled={processing}>
                    {processing ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    );
}
