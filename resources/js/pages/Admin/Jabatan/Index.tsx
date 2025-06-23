import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import React, { useState, useEffect, useCallback } from 'react';
import { Jabatan, PageProps, PaginatedResponse } from '@/types';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, ArrowUpDown, CheckCircle, XCircle } from 'lucide-react';
import { Pagination } from '@/components/pagination';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { debounce } from 'lodash';

interface JabatanIndexProps extends PageProps {
    jabatans: PaginatedResponse<Jabatan>;
    filters: {
        search?: string;
        active_status?: string;
        sort?: string;
        direction?: string;
        per_page?: string;
    };
}

export default function IndexJabatan() {
    const { jabatans: paginatedJabatans, filters, auth } = usePage<JabatanIndexProps>().props;
    const { data: jabatans, links, meta } = paginatedJabatans;

    const [search, setSearch] = useState(filters.search || '');
    const [activeStatus, setActiveStatus] = useState(filters.active_status || '');
    const [perPage, setPerPage] = useState(filters.per_page || '10');

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            router.get(route('data-master.jabatan.index'), { search: value, active_status: activeStatus, per_page: perPage }, { preserveState: true, replace: true });
        }, 300),
        [activeStatus, perPage]
    );

    useEffect(() => {
        if (search !== filters.search) {
             debouncedSearch(search);
        }
        return () => {
            debouncedSearch.cancel();
        };
    }, [search, filters.search, debouncedSearch]);

    const handleActiveStatusChange = (value: string) => {
        setActiveStatus(value);
        router.get(route('data-master.jabatan.index'), { search, active_status: value, per_page: perPage }, { preserveState: true, replace: true });
    };

    const handlePerPageChange = (value: string) => {
        setPerPage(value);
        router.get(route('data-master.jabatan.index'), { search, active_status: activeStatus, per_page: value }, { preserveState: true, replace: true });
    };

    const handleSort = (newSort: string) => {
        let newDirection = 'asc';
        if (filters.sort === newSort && filters.direction === 'asc') {
            newDirection = 'desc';
        }
        router.get(route('data-master.jabatan.index'), { ...filters, sort: newSort, direction: newDirection }, { preserveState: true, replace: true });
    };

    const handleDelete = (jabatan: Jabatan) => {
        if (confirm(`Are you sure you want to delete Jabatan: ${jabatan.nama}?`)) {
            router.delete(route('data-master.jabatan.destroy', jabatan.id));
        }
    };

    const getSortIndicator = (columnName: string) => {
        if (filters.sort === columnName) {
            return filters.direction === 'asc' ? ' ▲' : ' ▼';
        }
        return '';
    };

    return (
        <AppLayout>
            <Head title='Jabatan Management' />
            <div className='space-y-4'>

                <Card>
                    <CardHeader>
                        <CardTitle>Jabatan List</CardTitle>
                        <div className='mt-4 flex flex-col md:flex-row gap-2 items-center'>
                            <Input
                                placeholder='Search by name...'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className='max-w-sm'
                            />
                            <Select value={activeStatus} onValueChange={handleActiveStatusChange}>
                                <SelectTrigger className='w-[180px]'>
                                    <SelectValue placeholder='Filter by status' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='-'>All Statuses</SelectItem>
                                    <SelectItem value='true'>Active</SelectItem>
                                    <SelectItem value='false'>Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={perPage} onValueChange={handlePerPageChange}>
                                <SelectTrigger className='w-[120px]'>
                                    <SelectValue placeholder='Per page' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='10'>10/page</SelectItem>
                                    <SelectItem value='25'>25/page</SelectItem>
                                    <SelectItem value='50'>50/page</SelectItem>
                                    <SelectItem value='100'>100/page</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='cursor-pointer hover:bg-muted/50' onClick={() => handleSort('nama')}>
                                        Nama{getSortIndicator('nama')} <ArrowUpDown className='ml-2 h-4 w-4 inline-block' />
                                    </TableHead>
                                    <TableHead className='cursor-pointer hover:bg-muted/50' onClick={() => handleSort('grade')}>
                                        Grade{getSortIndicator('grade')} <ArrowUpDown className='ml-2 h-4 w-4 inline-block' />
                                    </TableHead>
                                    <TableHead className='cursor-pointer hover:bg-muted/50' onClick={() => handleSort('job_value')}>
                                        Job Value{getSortIndicator('job_value')} <ArrowUpDown className='ml-2 h-4 w-4 inline-block' />
                                    </TableHead>
                                    <TableHead>CG</TableHead>
                                    <TableHead>Poin SKP</TableHead>
                                    <TableHead className='cursor-pointer hover:bg-muted/50' onClick={() => handleSort('active')}>
                                        Active{getSortIndicator('active')} <ArrowUpDown className='ml-2 h-4 w-4 inline-block' />
                                    </TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {jabatans.length > 0 ? (
                                    jabatans.map((jabatan) => (
                                        <TableRow key={jabatan.id}>
                                            <TableCell>{jabatan.nama}</TableCell>
                                            <TableCell>{jabatan.grade}</TableCell>
                                            <TableCell>{jabatan.job_value}</TableCell>
                                            <TableCell>
                                                {jabatan.cg ? <CheckCircle className='h-5 w-5 text-green-500' /> : <XCircle className='h-5 w-5 text-red-500' />}
                                            </TableCell>
                                            <TableCell>{jabatan.poin_skp ?? '-'}</TableCell>
                                            <TableCell>
                                                {jabatan.active ? <CheckCircle className='h-5 w-5 text-green-500' /> : <XCircle className='h-5 w-5 text-red-500' />}
                                            </TableCell>
                                            <TableCell>
                                                <div className='flex space-x-2'>
                                                    <Button variant='outline' size='sm' asChild>
                                                        <Link href={route('data-master.jabatan.edit', jabatan.id)}>
                                                            <Edit className='h-4 w-4' />
                                                        </Link>
                                                    </Button>
                                                    <Button variant='destructive' size='sm' onClick={() => handleDelete(jabatan)}>
                                                        <Trash2 className='h-4 w-4' />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className='text-center'>
                                            No Jabatan found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Pagination links={links} className='mt-4' />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
