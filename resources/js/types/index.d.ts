import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    userRoles: string[];
    currentRole: string | null; // Can be null if not set or user has no roles
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    permission?: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Unit {
    id: string;
    name: string;
    code: string;
    parent_id: string | null;
    parent?: Unit; // Optional parent object for eager loading
    has_pagu: boolean;
    has_rubrik: boolean;
    created_at: string;
    updated_at: string;
    children_count?: number; // If you plan to count children
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface PegawaiIkatanKerja {
    id: number;
    nama: string;
    // Add any other fields from PegawaiIkatanKerja model you might need
    created_at: string;
    updated_at: string;
}

export type RubrikRemun = {
    id: number;
    nama: string;
    active: number | boolean; // Allow boolean for frontend state, number for backend
    created_at?: string;
    updated_at?: string;
};

export interface Pegawai {
    id: number;
    nama: string;
    nik: string;
    nip: string;
    email: string;
    nohp?: string | null;
    tempat_lahir?: string | null;
    tanggal_lahir?: string | null; // Consider using Date type if you parse it
    jenis_kelamin: 1 | 2; // 1 for Laki-laki, 2 for Perempuan
    npwp?: string | null;
    pegawai_jenis_id: number;
    profile_picture?: string | null;
    aktif: 0 | 1; // 0 for Tidak Aktif, 1 for Aktif
    created_at: string;
    updated_at: string;
    pegawai_jenis?: PegawaiJenis; // For eager loading
}

export type Fungsional = {
    id: number; // Assuming auto-incrementing integer ID
    nama: string;
    kode: string;
    grade: number | null;
    job_value: number | null;
    active: boolean;
    created_at?: string; // Optional, as it might not always be needed on the frontend
    updated_at?: string; // Optional
};

export interface PegawaiJenis {
    id: number;
    nama: string;
    kode: string;
    pegawai_ikatan_id: number;
    pegawai_ikatan?: PegawaiIkatanKerja; // For eager loading
    jenis: 'Dosen' | 'Tendik' | 'Pegawai Lainnya';
    has_remun: boolean;
    created_at: string;
    updated_at: string;
}
