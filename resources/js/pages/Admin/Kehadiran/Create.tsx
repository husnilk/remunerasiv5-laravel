import { PageProps, Pegawai, Periode } from '@/types';
import KehadiranForm from './KehadiranForm';

interface KehadiranCreateProps extends PageProps {
    pegawais: Pegawai[];
    periodes: Periode[];
}

export default function KehadiranCreatePage({ auth, pegawais, periodes }: KehadiranCreateProps) {
    return (
        <KehadiranForm
            auth={auth}
            action='create'
            pegawais={pegawais}
            periodes={periodes}
        />
    );
}
