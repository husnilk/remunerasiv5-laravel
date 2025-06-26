import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { type NavGroup, type NavItem } from '@/types';
import {
    BookOpen, Database,
    Folder,
    LayoutGrid,
    ShieldCheck,
    Users
} from 'lucide-react'; // Added Database icon
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
                permission: 'admin.manage'
            },
            {
                title: 'Permissions',
                href: route('admin.permissions.index'),
                icon: ShieldCheck,
                permission: 'admin.manage'
            },
            {
                title: 'Pegawai',
                href: route('admin.pegawai.index'), // Corrected route name
                icon: Users, // Using Users icon for Pegawai
                permission: 'employee.manage',
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
                <RoleSwitcher  />
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
