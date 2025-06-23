import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'; // Removed SidebarGroup, SidebarGroupLabel
import { type NavGroup, type NavItem } from '@/types';
import { Link } from '@inertiajs/react'; // Removed usePage
import { BookOpen, Database, Folder, LayoutGrid, ShieldCheck, Users } from 'lucide-react'; // Added Database icon
import AppLogo from './app-logo';

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
        ],
    },
    {
        title: 'Data Master',
        items: [
            {
                title: 'Units',
                href: route('data-master.units.index'),
                icon: Database, // Using Database icon for Units
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
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain groups={mainNavGroups} /> {/* Changed items to groups and mainNavItems to mainNavGroups */}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
