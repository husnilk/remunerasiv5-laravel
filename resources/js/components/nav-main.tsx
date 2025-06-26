import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavGroup } from '@/types'; // Changed NavItem to NavGroup
import { Link, usePage } from '@inertiajs/react';
import { can } from '@/lib/can'; // Assuming can function is defined to check permissions

export function NavMain({ groups = [] }: { groups: NavGroup[] }) {
    // Changed items to groups
    const page = usePage();
    return (
        <>
            {groups.map((group) => (
                <SidebarGroup className="px-2 py-2" key={group.title}>
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.filter((item) => can(item.permission) || item.permission == null ).map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}
