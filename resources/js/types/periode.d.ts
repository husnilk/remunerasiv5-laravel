import { LaravelPaginatorProps } from './index'; // Assuming this general type exists for paginator props

export interface Periode {
    id: number;
    tahun: number;
    periode: number;
    nama: string;
    keterangan?: string;
    pir?: number;
    tgl_mulai?: string; // Dates are strings
    tgl_selesai?: string;
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
    aktif: 0 | 1 | boolean; // Can be number from backend, boolean in JS
    show_insentif: 0 | 1 | boolean;
    user_confirmation: 0 | 1 | boolean;
    created_at: string;
    updated_at: string;
}

export interface PeriodesIndexProps {
    periodes: LaravelPaginatorProps<Periode>;
    filters?: Record<string, string>; // For any filtering if implemented
    flash?: {
        success?: string;
        error?: string;
    };
}
