import { Icon } from '@/components/icon';
import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    // DialogTrigger, // Removed DialogTrigger
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, SelectOption, Unit } from '@/types';
import { Head, router, useForm } from '@inertiajs/react'; // Removed Link
import { useState } from 'react'; // Removed useEffect
import { toast } from 'sonner';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';

interface UnitsIndexProps {
    units: PaginatedResponse<Unit>;
    filters: { search?: string };
    allUnits: SelectOption[]; // For parent unit selection
}

export default function UnitsIndexPage({ units, filters, allUnits }: UnitsIndexProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        name: '',
        code: '',
        parent_id: '',
        has_pagu: false,
        has_rubrik: false,
    });

    const handleSearch = () => {
        router.get(route('data-master.units.index'), { search: searchTerm }, { preserveState: true });
    };

    const openCreateModal = () => {
        reset();
        setCreateModalOpen(true);
    };

    const openEditModal = (unit: Unit) => {
        setCurrentUnit(unit);
        setData({
            name: unit.name,
            code: unit.code,
            parent_id: unit.parent_id || '',
            has_pagu: unit.has_pagu,
            has_rubrik: unit.has_rubrik,
        });
        setEditModalOpen(true);
    };

    const openDeleteModal = (unit: Unit) => {
        setCurrentUnit(unit);
        setDeleteModalOpen(true);
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('data-master.units.store'), {
            onSuccess: () => {
                setCreateModalOpen(false);
                toast.success('Unit created successfully.');
            },
            onError: () => {
                toast.error('Failed to create unit.');
            },
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentUnit) {
            put(route('data-master.units.update', currentUnit.id), {
                onSuccess: () => {
                    setEditModalOpen(false);
                    toast.success('Unit updated successfully.');
                },
                onError: () => {
                    toast.error('Failed to update unit.');
                },
            });
        }
    };

    const handleDelete = () => {
        if (currentUnit) {
            destroy(route('data-master.units.destroy', currentUnit.id), {
                onSuccess: () => {
                    setDeleteModalOpen(false);
                    toast.success('Unit deleted successfully.');
                },
                onError: (pageErrors) => {
                    if (pageErrors && pageErrors.error) {
                        toast.error(pageErrors.error);
                    } else {
                        toast.error('Failed to delete unit.');
                    }
                },
            });
        }
    };

    // Fetch all units for parent selection - this should ideally be passed from controller or a dedicated endpoint
    // For now, we'll assume `allUnits` is passed in props.
    // If not, a useEffect to fetch them could be added here.

    return (
        <AppLayout

        >
            <Head title="Units" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-4 flex items-center">
                                <Input
                                    type="text"
                                    placeholder="Search units..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="mr-2 max-w-sm"
                                />
                                <Button onClick={handleSearch}>Search</Button>
                            </div>

                            <div className="mb-4 flex justify-end">
                                <Button onClick={openCreateModal}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    New Unit
                                </Button>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Parent Unit</TableHead>
                                        <TableHead>Has Pagu</TableHead>
                                        <TableHead>Has Rubrik</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {units.data.map((unit) => (
                                        <TableRow key={unit.id}>
                                            <TableCell>{unit.code}</TableCell>
                                            <TableCell>{unit.name}</TableCell>
                                            <TableCell>{unit.parent?.name || '-'}</TableCell>
                                            <TableCell>{unit.has_pagu ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>{unit.has_rubrik ? 'Yes' : 'No'}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" onClick={() => openEditModal(unit)} className="mr-2">
                                                    <Pencil className="mr-1 h-4 w-4" />
                                                    Edit
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => openDeleteModal(unit)}>
                                                    <Trash2 className="mr-1 h-4 w-4" />
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination className="mt-6" links={units.links} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Dialog (using one dialog component for simplicity, could be split) */}
            <Dialog open={isCreateModalOpen || isEditModalOpen} onOpenChange={isCreateModalOpen ? setCreateModalOpen : setEditModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{isCreateModalOpen ? 'Create Unit' : 'Edit Unit'}</DialogTitle>
                        <DialogDescription>
                            {isCreateModalOpen ? 'Add a new unit to the system.' : 'Update the details of the unit.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={isCreateModalOpen ? handleCreate : handleUpdate}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="code" className="text-right">
                                    Code
                                </Label>
                                <Input id="code" value={data.code} onChange={(e) => setData('code', e.target.value)} className="col-span-3" />
                                {errors.code && <p className="col-span-4 text-sm text-red-600">{errors.code}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="col-span-3" />
                                {errors.name && <p className="col-span-4 text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="parent_id" className="text-right">
                                    Parent Unit
                                </Label>
                                <Select value={data.parent_id} onValueChange={(value) => setData('parent_id', value)}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select parent unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="-">
                                            <em>No Parent</em>
                                        </SelectItem>
                                        {allUnits
                                            .filter((u) => !currentUnit || u.value !== currentUnit.id) // Prevent self-parenting in edit
                                            .map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                {errors.parent_id && <p className="col-span-4 text-sm text-red-600">{errors.parent_id}</p>}
                            </div>
                            <div className="col-span-4 flex items-center space-x-2">
                                <Checkbox id="has_pagu" checked={data.has_pagu} onCheckedChange={(checked) => setData('has_pagu', !!checked)} />
                                <Label htmlFor="has_pagu" className="font-normal">
                                    Has Pagu
                                </Label>
                                {errors.has_pagu && <p className="text-sm text-red-600">{errors.has_pagu}</p>}
                            </div>
                            <div className="col-span-4 flex items-center space-x-2">
                                <Checkbox id="has_rubrik" checked={data.has_rubrik} onCheckedChange={(checked) => setData('has_rubrik', !!checked)} />
                                <Label htmlFor="has_rubrik" className="font-normal">
                                    Has Rubrik
                                </Label>
                                {errors.has_rubrik && <p className="text-sm text-red-600">{errors.has_rubrik}</p>}
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the unit:{' '}
                            <span className="font-semibold">{currentUnit?.name}</span>.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={handleDelete} disabled={processing}>
                            {processing ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
