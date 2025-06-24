<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Define permission names
        $permissions = [
            // Role Permissions
            'admin.manage',
            'admin.view',
            'employee.manage',
            'employee.view',

            // Permission Permissions (usually just view for info)

            // Add other permissions for your application modules
            // e.g., 'view users', 'edit users', 'manage settings', etc.
        ];

        // Create permissions
        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate(['name' => $permissionName, 'guard_name' => 'web']);
        }

        $this->command->info('Default permissions seeded.');

        // Create a Super Admin role and assign all permissions
        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);
        $superAdminRole->givePermissionTo(Permission::all());

        $this->command->info('Super Admin role created and all permissions assigned.');

        // Optionally, create other default roles
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $adminRole->givePermissionTo(['admin.manage', 'admin.view', 'employee.manage', 'employee.view']);
        // Add more specific permissions for Admin role as needed

        $this->command->info('Admin role created and assigned specific permissions.');
    }
}
