import { useForm } from '@inertiajs/react';
import { Rubrik, RubrikKategori } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { FormEvent } from 'react';

type RubrikFormData = Omit<Rubrik, 'id' | 'created_at' | 'updated_at'>;

interface RubrikFormProps {
    rubrik?: Rubrik;
    rubrikKategoris: RubrikKategori[];
    onSubmit: (data: RubrikFormData) => void;
    isSubmitting: boolean;
    formType: 'create' | 'edit';
}

export default function RubrikForm({
    rubrik,
    rubrikKategoris,
    onSubmit,
    isSubmitting,
    formType,
}: RubrikFormProps) {
    const { data, setData, errors, reset } = useForm<RubrikFormData>({
        rubrik_kategori_id: rubrik?.rubrik_kategori_id || rubrikKategoris[0]?.id || '',
        aktifitas: rubrik?.aktifitas || '',
        uraian: rubrik?.uraian || '',
        uraian_bukti: rubrik?.uraian_bukti || '',
        kode: rubrik?.kode || '',
        jumlah: rubrik?.jumlah || 1,
        satuan: rubrik?.satuan || '',
        tipe_form: rubrik?.tipe_form || 1,
        personal: rubrik?.personal || 0,
        bukti_penugasan: rubrik?.bukti_penugasan || '',
        bukti_kinerja: rubrik?.bukti_kinerja || '',
        min_pegawai: rubrik?.min_pegawai || 0,
        max_pegawai: rubrik?.max_pegawai || 0,
        min_poin: rubrik?.min_poin || 0,
        max_poin: rubrik?.max_poin || 0,
        fixed_poin: rubrik?.fixed_poin || 0,
        umum: rubrik?.umum || 1,
        aktif: rubrik?.aktif || 1,
        flat_rate: rubrik?.flat_rate || 1,
        rate: rubrik?.rate || 0,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Left Column */}
                <div className='space-y-4'>
                    <div>
                        <Label htmlFor='rubrik_kategori_id'>Rubrik Kategori*</Label>
                        <Select
                            name='rubrik_kategori_id'
                            value={data.rubrik_kategori_id?.toString()}
                            onValueChange={(value) => setData('rubrik_kategori_id', parseInt(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='Select Kategori' />
                            </SelectTrigger>
                            <SelectContent>
                                {rubrikKategoris.map((kategori) => (
                                    <SelectItem key={kategori.id} value={kategori.id.toString()}>
                                        {kategori.nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.rubrik_kategori_id} className='mt-2' />
                    </div>

                    <div>
                        <Label htmlFor='aktifitas'>Aktifitas*</Label>
                        <Input
                            id='aktifitas'
                            name='aktifitas'
                            value={data.aktifitas}
                            onChange={(e) => setData('aktifitas', e.target.value)}
                        />
                        <InputError message={errors.aktifitas} className='mt-2' />
                    </div>

                    <div>
                        <Label htmlFor='kode'>Kode</Label>
                        <Input
                            id='kode'
                            name='kode'
                            value={data.kode || ''}
                            onChange={(e) => setData('kode', e.target.value)}
                        />
                        <InputError message={errors.kode} className='mt-2' />
                    </div>

                    <div>
                        <Label htmlFor='uraian'>Uraian</Label>
                        <Textarea
                            id='uraian'
                            name='uraian'
                            value={data.uraian || ''}
                            onChange={(e) => setData('uraian', e.target.value)}
                        />
                        <InputError message={errors.uraian} className='mt-2' />
                    </div>

                    <div>
                        <Label htmlFor='uraian_bukti'>Uraian Bukti</Label>
                        <Textarea
                            id='uraian_bukti'
                            name='uraian_bukti'
                            value={data.uraian_bukti || ''}
                            onChange={(e) => setData('uraian_bukti', e.target.value)}
                        />
                        <InputError message={errors.uraian_bukti} className='mt-2' />
                    </div>

                    <div>
                        <Label htmlFor='satuan'>Satuan*</Label>
                        <Input
                            id='satuan'
                            name='satuan'
                            value={data.satuan}
                            onChange={(e) => setData('satuan', e.target.value)}
                        />
                        <InputError message={errors.satuan} className='mt-2' />
                    </div>
                     <div>
                        <Label htmlFor='jumlah'>Jumlah*</Label>
                        <Input
                            id='jumlah'
                            name='jumlah'
                            type='number'
                            value={data.jumlah}
                            onChange={(e) => setData('jumlah', parseInt(e.target.value))}
                        />
                        <InputError message={errors.jumlah} className='mt-2' />
                    </div>

                    <div>
                        <Label htmlFor='bukti_penugasan'>Bukti Penugasan</Label>
                        <Input
                            id='bukti_penugasan'
                            name='bukti_penugasan'
                            value={data.bukti_penugasan || ''}
                            onChange={(e) => setData('bukti_penugasan', e.target.value)}
                        />
                        <InputError message={errors.bukti_penugasan} className='mt-2' />
                    </div>

                    <div>
                        <Label htmlFor='bukti_kinerja'>Bukti Kinerja</Label>
                        <Input
                            id='bukti_kinerja'
                            name='bukti_kinerja'
                            value={data.bukti_kinerja || ''}
                            onChange={(e) => setData('bukti_kinerja', e.target.value)}
                        />
                        <InputError message={errors.bukti_kinerja} className='mt-2' />
                    </div>
                </div>

                {/* Right Column */}
                <div className='space-y-4'>
                    <div>
                        <Label htmlFor='min_poin'>Min Poin*</Label>
                        <Input
                            id='min_poin'
                            name='min_poin'
                            type='number'
                            value={data.min_poin}
                            onChange={(e) => setData('min_poin', parseFloat(e.target.value))}
                        />
                        <InputError message={errors.min_poin} className='mt-2' />
                    </div>
                    <div>
                        <Label htmlFor='max_poin'>Max Poin*</Label>
                        <Input
                            id='max_poin'
                            name='max_poin'
                            type='number'
                            value={data.max_poin}
                            onChange={(e) => setData('max_poin', parseFloat(e.target.value))}
                        />
                        <InputError message={errors.max_poin} className='mt-2' />
                    </div>
                     <div>
                        <Label htmlFor='fixed_poin'>Fixed Poin*</Label>
                        <Input
                            id='fixed_poin'
                            name='fixed_poin'
                            type='number'
                            value={data.fixed_poin}
                            onChange={(e) => setData('fixed_poin', parseFloat(e.target.value))}
                        />
                        <InputError message={errors.fixed_poin} className='mt-2' />
                    </div>
                     <div>
                        <Label htmlFor='rate'>Rate*</Label>
                        <Input
                            id='rate'
                            name='rate'
                            type='number'
                            value={data.rate}
                            onChange={(e) => setData('rate', parseFloat(e.target.value))}
                        />
                        <InputError message={errors.rate} className='mt-2' />
                    </div>

                    <div>
                        <Label htmlFor='min_pegawai'>Min Pegawai*</Label>
                        <Input
                            id='min_pegawai'
                            name='min_pegawai'
                            type='number'
                            value={data.min_pegawai}
                            onChange={(e) => setData('min_pegawai', parseInt(e.target.value))}
                        />
                        <InputError message={errors.min_pegawai} className='mt-2' />
                    </div>

                    <div>
                        <Label htmlFor='max_pegawai'>Max Pegawai*</Label>
                        <Input
                            id='max_pegawai'
                            name='max_pegawai'
                            type='number'
                            value={data.max_pegawai}
                            onChange={(e) => setData('max_pegawai', parseInt(e.target.value))}
                        />
                        <InputError message={errors.max_pegawai} className='mt-2' />
                    </div>

                    <div>
                        <Label htmlFor='tipe_form'>Tipe Form*</Label>
                        <Select
                            name='tipe_form'
                            value={data.tipe_form.toString()}
                            onValueChange={(value) => setData('tipe_form', parseInt(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='Select Tipe Form' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='1'>Tipe 1 (Default)</SelectItem>
                                <SelectItem value='2'>Tipe 2</SelectItem>
                                {/* Add more types as needed */}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.tipe_form} className='mt-2' />
                    </div>

                    <div className='flex items-center space-x-2 pt-2'>
                        <Checkbox
                            id='personal'
                            checked={!!data.personal}
                            onCheckedChange={(checked) => setData('personal', checked ? 1 : 0)}
                        />
                        <Label htmlFor='personal'>Personal</Label>
                        <InputError message={errors.personal} className='ml-2' />
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Checkbox
                            id='umum'
                            checked={!!data.umum}
                            onCheckedChange={(checked) => setData('umum', checked ? 1 : 0)}
                        />
                        <Label htmlFor='umum'>Umum</Label>
                        <InputError message={errors.umum} className='ml-2' />
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Checkbox
                            id='aktif'
                            checked={!!data.aktif}
                            onCheckedChange={(checked) => setData('aktif', checked ? 1 : 0)}
                        />
                        <Label htmlFor='aktif'>Aktif</Label>
                        <InputError message={errors.aktif} className='ml-2' />
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Checkbox
                            id='flat_rate'
                            checked={!!data.flat_rate}
                            onCheckedChange={(checked) => setData('flat_rate', checked ? 1 : 0)}
                        />
                        <Label htmlFor='flat_rate'>Flat Rate</Label>
                        <InputError message={errors.flat_rate} className='ml-2' />
                    </div>

                </div>
            </div>

            <div className='flex items-center justify-end gap-2 pt-4'>
                <Button type='button' variant='outline' onClick={() => reset()} disabled={isSubmitting}>
                    Reset
                </Button>
                <Button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : formType === 'create' ? 'Create Rubrik' : 'Update Rubrik'}
                </Button>
            </div>
        </form>
    );
}
