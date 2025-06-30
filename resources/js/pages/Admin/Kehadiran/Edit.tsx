import { Kehadiran, PageProps, Pegawai, Periode } from '@/types';
import KehadiranForm from './KehadiranForm';

interface KehadiranEditProps extends PageProps {
    kehadiran: Kehadiran;
    pegawais: Pegawai[];
    periodes: Periode[];
}

export default function KehadiranEditPage({ auth, kehadiran, pegawais, periodes }: KehadiranEditProps) {
    return (
        <KehadiranForm
            auth={auth}
            action='edit'
            kehadiran={kehadiran}
            pegawais={pegawais}
            periodes={periodes}
        />
    );
}
