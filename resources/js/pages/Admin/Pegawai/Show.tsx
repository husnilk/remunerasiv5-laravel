import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { JabatanUnit, PageProps, Pegawai, PegawaiJabatan } from '@/types';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit2, PlusCircle, Trash2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog'; // Assuming Dialog component exists
import { useState } from 'react';
import PegawaiJabatanForm from './Partials/PegawaiJabatanForm';
import { format, parseISO } from 'date-fns';
import { id as localeID } from 'date-fns/locale'; // For Indonesian date formatting

interface ShowPageProps extends PageProps {
    pegawai: Pegawai;
    jabatanUnits: JabatanUnit[];
    flash: {
        success?: string;
        error?: string;
    };
}

export default function Show({ auth, pegawai: initialPegawai, jabatanUnits, flash }: ShowPageProps) {
    const { pegawai } = usePage<ShowPageProps>().props; // Ensures we have the latest pegawai data after form submissions

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [selectedPegawaiJabatan, setSelectedPegawaiJabatan] = useState<PegawaiJabatan | undefined>(undefined);

    const openAddModal = () => {
        setSelectedPegawaiJabatan(undefined);
        setIsAddModalOpen(true);
    };

    const openEditModal = (pj: PegawaiJabatan) => {
        setSelectedPegawaiJabatan(pj);
        setIsEditModalOpen(true);
    };

    const openDeleteConfirm = (pj: PegawaiJabatan) => {
        setSelectedPegawaiJabatan(pj);
        setIsDeleteConfirmOpen(true);
    };

    const handleDelete = () => {
        if (selectedPegawaiJabatan) {
            router.delete(route('admin.pegawai-jabatan.destroy', selectedPegawaiJabatan.id), {
                preserveScroll: true,
                onSuccess: () => setIsDeleteConfirmOpen(false),
            });
        }
    };

    const formatDate = (dateString?: string | null) => {
        if (!dateString) return '-';
        try {
            return format(parseISO(dateString), 'dd MMMM yyyy', { locale: localeID });
        } catch (error) {
            console.error("Error formatting date:", dateString, error);
            return dateString; // fallback to original string if parsing fails
        }
    };


    return (
        <AppLayout
            user={auth.user}
            header={
                <div className='flex items-center justify-between'>
                    <Heading>Detail Pegawai: {pegawai.nama}</Heading>
                    <Button variant='outline' asChild>
                        <Link href={route('admin.pegawai.index')}>
                            <ArrowLeft className='mr-2 h-4 w-4' />
                            Kembali ke Daftar
                        </Link>
                    </Button>
                </div>
            }
        >
            <Head title={`Detail Pegawai - ${pegawai.nama}`} />

            {flash?.success && (
                 <div className="mb-4 rounded bg-green-100 p-4 text-sm text-green-700">
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="mb-4 rounded bg-red-100 p-4 text-sm text-red-700">
                    {flash.error}
                </div>
            )}


            <div className='space-y-6'>
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Umum</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Nama Lengkap</p>
                                <p>{pegawai.nama}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>NIK</p>
                                <p>{pegawai.nik}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>NIP</p>
                                <p>{pegawai.nip}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Email</p>
                                <p>{pegawai.email}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>No. HP</p>
                                <p>{pegawai.nohp || '-'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Pribadi</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Tempat Lahir</p>
                                <p>{pegawai.tempat_lahir || '-'}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Tanggal Lahir</p>
                                <p>{formatDate(pegawai.tanggal_lahir)}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Jenis Kelamin</p>
                                <p>{pegawai.jenis_kelamin === 1 ? 'Laki-laki' : 'Perempuan'}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>NPWP</p>
                                <p>{pegawai.npwp || '-'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Status Kepegawaian</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Jenis Pegawai</p>
                                <p>{pegawai.pegawai_jenis?.nama || '-'}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>Status Aktif</p>
                                <p>{pegawai.aktif ? 'Aktif' : 'Tidak Aktif'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Riwayat Jabatan Section */}
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between'>
                        <div>
                            <CardTitle>Riwayat Jabatan</CardTitle>
                            <CardDescription>Daftar jabatan yang pernah diemban oleh pegawai.</CardDescription>
                        </div>
                        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={openAddModal}>
                                    <PlusCircle className='mr-2 h-4 w-4' />
                                    Tambah Riwayat
                                </Button>
                            </DialogTrigger>
                            <DialogContent className='sm:max-w-2xl'>
                                <DialogHeader>
                                    <DialogTitle>Tambah Riwayat Jabatan</DialogTitle>
                                    <DialogDescription>
                                        Isi detail jabatan baru untuk pegawai {pegawai.nama}.
                                    </DialogDescription>
                                </DialogHeader>
                                <PegawaiJabatanForm
                                    pegawaiId={pegawai.id}
                                    jabatanUnits={jabatanUnits}
                                    onSuccess={() => setIsAddModalOpen(false)}
                                    onCancel={() => setIsAddModalOpen(false)}
                                    submitButtonText='Tambah Jabatan'
                                />
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Jabatan Unit</TableHead>
                                    <TableHead>Jabatan</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>TMT</TableHead>
                                    <TableHead>Selesai</TableHead>
                                    <TableHead className='text-right'>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pegawai.pegawai_jabatans && pegawai.pegawai_jabatans.length > 0 ? (
                                    pegawai.pegawai_jabatans.map((pj) => (
                                        <TableRow key={pj.id}>
                                            <TableCell>{pj.jabatan_unit?.nama}</TableCell>
                                            <TableCell>{pj.jabatan_unit?.jabatan?.nama || '-'}</TableCell>
                                            <TableCell>{pj.jabatan_unit?.unit?.nama || '-'}</TableCell>
                                            <TableCell>{formatDate(pj.tmt)}</TableCell>
                                            <TableCell>{formatDate(pj.selesai)}</TableCell>
                                            <TableCell className='text-right'>
                                                <Button
                                                    variant='ghost'
                                                    size='sm'
                                                    onClick={() => openEditModal(pj)}
                                                    className='mr-1'
                                                >
                                                    <Edit2 className='h-4 w-4' />
                                                </Button>
                                                <Button
                                                    variant='ghost'
                                                    size='sm'
                                                    onClick={() => openDeleteConfirm(pj)}
                                                    className='text-red-500 hover:text-red-700'
                                                >
                                                    <Trash2 className='h-4 w-4' />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className='text-center'>
                                            Belum ada riwayat jabatan.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Edit PegawaiJabatan Modal */}
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent className='sm:max-w-2xl'>
                        <DialogHeader>
                            <DialogTitle>Edit Riwayat Jabatan</DialogTitle>
                            <DialogDescription>
                                Perbarui detail jabatan untuk {pegawai.nama}.
                            </DialogDescription>
                        </DialogHeader>
                        {selectedPegawaiJabatan && (
                             <PegawaiJabatanForm
                                pegawaiId={pegawai.id}
                                jabatanUnits={jabatanUnits}
                                pegawaiJabatan={selectedPegawaiJabatan}
                                onSuccess={() => setIsEditModalOpen(false)}
                                onCancel={() => setIsEditModalOpen(false)}
                                submitButtonText='Simpan Perubahan'
                            />
                        )}
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Konfirmasi Hapus</DialogTitle>
                            <DialogDescription>
                                Apakah Anda yakin ingin menghapus riwayat jabatan ini? Tindakan ini tidak dapat diurungkan.
                                <br />
                                Jabatan: {selectedPegawaiJabatan?.jabatan_unit?.jabatan?.nama} di Unit: {selectedPegawaiJabatan?.jabatan_unit?.unit?.nama}
                                <br />
                                TMT: {formatDate(selectedPegawaiJabatan?.tmt)}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>Batal</Button>
                            </DialogClose>
                            <Button variant="destructive" onClick={handleDelete}>
                                Ya, Hapus
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>


                <div className='mt-6 text-right'>
                    <Button asChild>
                        <Link href={route('admin.pegawai.edit', pegawai.id)}>
                            Edit Data Pegawai
                        </Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
