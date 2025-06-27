import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Periode } from '@/types/periode'; // Assuming type definition exists or will be created
import { Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error'; // Assuming this component exists
import React from 'react';

interface PeriodeFormProps {
    periode?: Periode; // Optional: for editing
    mode: 'create' | 'edit';
}

// Define a type for the form data based on Periode, making all fields potentially partial for the form
type PeriodeFormData = Partial<Omit<Periode, 'id' | 'created_at' | 'updated_at'>> & {
    nama: string;
    tahun: number;
    periode: number;
    // Add other required or frequently used fields here, others can be string | number | undefined
    keterangan?: string;
    tgl_mulai?: string; // Dates will be strings from form inputs
    tgl_selesai?: string;
    // Add other fields as needed from the model's fillable array
    pir?: number;
    tgl_input_mulai?: string;
    tgl_input_selesai?: string;
    tgl_verifikasi_mulai?: string;
    tgl_verifikasi_selesai?: string;
    tgl_validasi_mulai?: string;
    tgl_validasi_selesai?: string;
    kehadiran?: number;
    skp?: number;
    format_skp?: number;
    calc_method?: number;
    bkd_tahun?: number;
    bkd_semester?: string;
    bkd_source_p1?: number;
    bkd_tahun_p1?: number;
    bkd_semester_p1?: string;
    bkd_source_p2?: number;
    bkd_tahun_p2?: number;
    bkd_semester_p2?: string;
    show_insentif?: boolean;
    user_confirmation?: boolean;
};

export default function PeriodeForm({ periode, mode }: PeriodeFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm<PeriodeFormData>({
        nama: periode?.nama || '',
        tahun: periode?.tahun || new Date().getFullYear(),
        periode: periode?.periode || 1,
        keterangan: periode?.keterangan || '',
        tgl_mulai: periode?.tgl_mulai || '',
        tgl_selesai: periode?.tgl_selesai || '',
        pir: periode?.pir ?? 3000, // Default from migration
        tgl_input_mulai: periode?.tgl_input_mulai || '',
        tgl_input_selesai: periode?.tgl_input_selesai || '',
        tgl_verifikasi_mulai: periode?.tgl_verifikasi_mulai || '',
        tgl_verifikasi_selesai: periode?.tgl_verifikasi_selesai || '',
        tgl_validasi_mulai: periode?.tgl_validasi_mulai || '',
        tgl_validasi_selesai: periode?.tgl_validasi_selesai || '',
        kehadiran: periode?.kehadiran ?? undefined,
        skp: periode?.skp ?? undefined,
        format_skp: periode?.format_skp ?? undefined,
        calc_method: periode?.calc_method ?? undefined,
        bkd_tahun: periode?.bkd_tahun ?? undefined,
        bkd_semester: periode?.bkd_semester || '',
        bkd_source_p1: periode?.bkd_source_p1 ?? undefined,
        bkd_tahun_p1: periode?.bkd_tahun_p1 ?? undefined,
        bkd_semester_p1: periode?.bkd_semester_p1 || '',
        bkd_source_p2: periode?.bkd_source_p2 ?? undefined,
        bkd_tahun_p2: periode?.bkd_tahun_p2 ?? undefined,
        bkd_semester_p2: periode?.bkd_semester_p2 || '',
        show_insentif: periode?.show_insentif ?? false,
        user_confirmation: periode?.user_confirmation ?? true, // Default from migration
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (mode === 'create') {
            post(route('admin.periodes.store'), {
                onSuccess: () => reset(),
            });
        } else if (periode) {
            put(route('admin.periodes.update', periode.id),{
                onSuccess: () => reset(),
            });
        }
    };

    // Helper to simplify input change handling
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        let processedValue: string | number | boolean = value;

        if (type === 'number') {
            processedValue = value === '' ? '' : Number(value);
        } else if (type === 'checkbox') {
            processedValue = (e.target as HTMLInputElement).checked;
        }
        setData(name as keyof PeriodeFormData, processedValue as any); // Use 'as any' carefully
    };

    const handleCheckboxChange = (name: keyof PeriodeFormData) => (checked: boolean) => {
        setData(name, checked);
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>{mode === 'create' ? 'Tambah Periode Baru' : 'Edit Periode'}</CardTitle>
                <CardDescription>
                    {mode === 'create' ? 'Isi detail untuk periode baru.' : 'Ubah detail periode yang sudah ada.'}
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="nama">Nama Periode</Label>
                            <Input
                                id="nama"
                                name="nama"
                                value={data.nama}
                                onChange={handleInputChange}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.nama} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="tahun">Tahun</Label>
                            <Input
                                id="tahun"
                                name="tahun"
                                type="number"
                                value={data.tahun}
                                onChange={handleInputChange}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.tahun} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="periode">Periode (Angka)</Label>
                            <Input
                                id="periode"
                                name="periode"
                                type="number"
                                value={data.periode}
                                onChange={handleInputChange}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.periode} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="keterangan">Keterangan</Label>
                            <Textarea
                                id="keterangan"
                                name="keterangan"
                                value={data.keterangan || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.keterangan} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="tgl_mulai">Tanggal Mulai</Label>
                            <Input
                                id="tgl_mulai"
                                name="tgl_mulai"
                                type="date"
                                value={data.tgl_mulai || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.tgl_mulai} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="tgl_selesai">Tanggal Selesai</Label>
                            <Input
                                id="tgl_selesai"
                                name="tgl_selesai"
                                type="date"
                                value={data.tgl_selesai || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.tgl_selesai} className="mt-2" />
                        </div>
                    </div>

                    {/* Optional: Add more fields here as needed, example for PIR */}
                    <div>
                        <Label htmlFor="pir">PIR</Label>
                        <Input
                            id="pir"
                            name="pir"
                            type="number"
                            value={data.pir ?? ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.pir} className="mt-2" />
                    </div>


                    {/* Add other fields tgl_input_mulai, tgl_input_selesai etc. similarly if they need to be on the main form */}
                    {/* For boolean fields like show_insentif, user_confirmation, use Checkbox from shadcn if available */}
                    {/* This example keeps the form concise with core fields. */}

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" asChild>
                        <Link href={route('admin.periodes.index')}>Batal</Link>
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {processing ? (mode === 'create' ? 'Menyimpan...' : 'Memperbarui...') : (mode === 'create' ? 'Simpan' : 'Update')}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
