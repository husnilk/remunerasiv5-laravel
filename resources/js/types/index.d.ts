import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
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
