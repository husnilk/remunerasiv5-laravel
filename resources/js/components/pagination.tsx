import { cn } from '@/lib/utils';
import { PaginationLink } from '@/types';
import { Link } from '@inertiajs/react';
import { buttonVariants } from './ui/button';

interface Props {
    links: PaginationLink[];
    className?: string;
}

export function Pagination({ links, className }: Props) {
    if (links.length <= 3) return null; // Hide if only prev, current, next or less

    return (
        <nav className={cn('flex items-center justify-center space-x-1', className)}>
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || ''}
                    className={cn(
                        buttonVariants({ variant: link.active ? 'outline' : 'ghost', size: 'sm' }),
                        !link.url && 'cursor-not-allowed text-gray-400 dark:text-gray-600',
                        link.active && 'border-primary font-bold text-primary',
                    )}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    as="button"
                    disabled={!link.url}
                />
            ))}
        </nav>
    );
}
