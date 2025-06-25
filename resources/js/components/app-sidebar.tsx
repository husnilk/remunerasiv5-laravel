import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavGroup, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    AudioWaveform,
    BookOpen, Command,
    Database,
    Folder,
    GalleryVerticalEnd,
    LayoutGrid,
    ShieldCheck,
    Users
} from 'lucide-react'; // Added Database icon
import AppLogo from './app-logo';
import { RoleSwitcher } from '@/components/role-switcher';

const mainNavGroups: NavGroup[] = [
    {
        title: 'Platform',
        items: [
            {
                title: 'Dashboard',
                href: route('dashboard'),
                icon: LayoutGrid,
            },
        ],
    },
    {
        title: 'Access Management',
        items: [
            {
                title: 'Roles',
                href: route('admin.roles.index'),
                icon: Users,
            },
            {
                title: 'Permissions',
                href: route('admin.permissions.index'),
                icon: ShieldCheck,
            },
            {
                title: 'Pegawai',
                href: route('admin.pegawai.index'), // Corrected route name
                icon: Users, // Using Users icon for Pegawai
            },
        ],
    },
    {
        title: 'Data Master',
        items: [
            {
                title: 'Units',
                href: route('admin.units.index'),
                icon: Database, // Using Database icon for Units
            },
            {
                title: 'Pegawai Ikatan', // Added
                href: route('admin.pegawai-ikatan.index'), // Added
                icon: Database, // Using Database icon for now, can be changed
            },
            {
                title: 'Jenis Pegawai',
                href: route('admin.pegawai-jenis.index'),
                icon: Database, // Using Database icon for now, can be changed
            },
            {
                title: 'Fungsional',
                href: route('admin.fungsionals.index'),
                icon: Database, // Using Database icon for now, can be changed
            },
            {
                title: 'Jabatan',
                href: route('admin.jabatan.index'),
                icon: Database, // Using Database icon for now, can be changed
            },
            {
                title: 'Rubrik Remun',
                href: route('admin.rubrik-remun.index'),
                icon: Database,
            },
            {
                title: 'Rubrik Kategori',
                href: route('admin.rubrik-kategori.index'),
                icon: Database,
            },
            {
                title: 'Rubrik',
                href: route('admin.rubrik.index'),
                icon: Database, // You might want to choose a more specific icon
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                {/*<SidebarMenu>*/}
                {/*    <SidebarMenuItem>*/}
                {/*        <SidebarMenuButton size="lg" asChild>*/}
                {/*            <Link href={route('dashboard')} prefetch>*/}
                {/*                <AppLogo />*/}
                {/*            </Link>*/}
                {/*        </SidebarMenuButton>*/}
                {/*    </SidebarMenuItem>*/}
                {/*</SidebarMenu>*/}
                <RoleSwitcher versions={["1","2","3"]} defaultVersion="1" />
            </SidebarHeader>

            <SidebarContent className="flex flex-col gap-y-2">
                <NavMain groups={mainNavGroups} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
