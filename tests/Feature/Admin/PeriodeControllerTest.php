<?php

namespace Tests\Feature\Admin;

use App\Models\Periode;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class PeriodeControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;
    protected User $regularUser;

    protected function setUp(): void
    {
        parent::setUp();

        // Create roles and permissions
        $adminRole = Role::create(['name' => 'admin']);
        $managePeriodesPermission = Permission::create(['name' => 'manage periodes']); // Example permission
        $adminRole->givePermissionTo($managePeriodesPermission);

        // Create admin user
        $this->adminUser = User::factory()->create();
        $this->adminUser->assignRole($adminRole);
        $this->adminUser->last_active_role_id = $adminRole->id; // Assuming this field exists
        $this->adminUser->save();


        // Create regular user without admin permissions
        $this->regularUser = User::factory()->create();

        // Seed necessary base data if any (e.g. default roles from seeder)
        // $this->seed(PermissionsSeeder::class); // If you have a seeder for permissions
    }

    private function getPeriodeData(array $overrides = []): array
    {
        return array_merge([
            'nama' => 'Periode Test',
            'tahun' => 2024,
            'periode' => 1,
            'keterangan' => 'Keterangan periode test',
            'tgl_mulai' => '2024-01-01',
            'tgl_selesai' => '2024-06-30',
            'aktif' => 0, // Default to inactive, activation is a separate step
        ], $overrides);
    }

    public function test_admin_can_access_periode_index_page()
    {
        $response = $this->actingAs($this->adminUser)->get(route('admin.periodes.index'));
        $response->assertOk();
        $response->assertInertia(fn ($assert) => $assert->component('Admin/Periodes/Index'));
    }

    public function test_admin_can_access_periode_create_page()
    {
        $response = $this->actingAs($this->adminUser)->get(route('admin.periodes.create'));
        $response->assertOk();
        $response->assertInertia(fn ($assert) => $assert->component('Admin/Periodes/Create'));
    }

    public function test_admin_can_store_new_periode()
    {
        $data = $this->getPeriodeData();
        $response = $this->actingAs($this->adminUser)->post(route('admin.periodes.store'), $data);

        $response->assertRedirect(route('admin.periodes.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('periodes', ['nama' => $data['nama'], 'tahun' => $data['tahun']]);
    }

    public function test_store_periode_fails_with_invalid_data()
    {
        $data = $this->getPeriodeData(['nama' => '', 'tahun' => 'not-a-year']); // Invalid data
        $response = $this->actingAs($this->adminUser)->post(route('admin.periodes.store'), $data);

        $response->assertSessionHasErrors(['nama', 'tahun']);
        $this->assertDatabaseMissing('periodes', ['periode' => $data['periode']]);
    }

    public function test_admin_can_access_periode_edit_page()
    {
        $periode = Periode::factory()->create();
        $response = $this->actingAs($this->adminUser)->get(route('admin.periodes.edit', $periode->id));
        $response->assertOk();
        $response->assertInertia(fn ($assert) => $assert
            ->component('Admin/Periodes/Edit')
            ->has('periode.id', $periode->id)
        );
    }

    public function test_admin_can_update_periode()
    {
        $periode = Periode::factory()->create();
        $updatedData = $this->getPeriodeData(['nama' => 'Periode Updated Test', 'tahun' => 2025]);

        $response = $this->actingAs($this->adminUser)->put(route('admin.periodes.update', $periode->id), $updatedData);

        $response->assertRedirect(route('admin.periodes.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('periodes', ['id' => $periode->id, 'nama' => $updatedData['nama'], 'tahun' => $updatedData['tahun']]);
    }

    public function test_update_periode_fails_with_invalid_data()
    {
        $periode = Periode::factory()->create();
        $invalidData = $this->getPeriodeData(['nama' => '', 'tahun' => 'invalid-year']);

        $response = $this->actingAs($this->adminUser)->put(route('admin.periodes.update', $periode->id), $invalidData);
        $response->assertSessionHasErrors(['nama', 'tahun']);
        $this->assertNotEquals('', $periode->fresh()->nama); // Check original name is not changed
    }

    public function test_admin_can_delete_inactive_periode()
    {
        $periode = Periode::factory()->create(['aktif' => 0]);
        $response = $this->actingAs($this->adminUser)->delete(route('admin.periodes.destroy', $periode->id));

        $response->assertRedirect(route('admin.periodes.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseMissing('periodes', ['id' => $periode->id]);
    }

    public function test_admin_cannot_delete_active_periode()
    {
        $periode = Periode::factory()->create(['aktif' => 1]);
        $response = $this->actingAs($this->adminUser)->delete(route('admin.periodes.destroy', $periode->id));

        $response->assertRedirect(route('admin.periodes.index'));
        $response->assertSessionHas('error', 'Periode aktif tidak dapat dihapus.'); // Check for the specific error message
        $this->assertDatabaseHas('periodes', ['id' => $periode->id]);
    }

    public function test_admin_can_activate_periode()
    {
        $periodeToActivate = Periode::factory()->create(['aktif' => 0]);
        $currentlyActivePeriode = Periode::factory()->create(['aktif' => 1, 'nama' => 'Old Active Periode']);

        $response = $this->actingAs($this->adminUser)->post(route('admin.periodes.activate', $periodeToActivate->id));

        $response->assertRedirect(route('admin.periodes.index'));
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('periodes', ['id' => $periodeToActivate->id, 'aktif' => 1]);
        $this->assertDatabaseHas('periodes', ['id' => $currentlyActivePeriode->id, 'aktif' => 0]);
    }

    public function test_activating_already_active_periode_keeps_it_active_and_others_inactive()
    {
        $activePeriode = Periode::factory()->create(['aktif' => 1, 'nama' => 'Main Active Periode']);
        $inactivePeriode1 = Periode::factory()->create(['aktif' => 0, 'nama' => 'Inactive 1']);

        $response = $this->actingAs($this->adminUser)->post(route('admin.periodes.activate', $activePeriode->id));

        $response->assertRedirect(route('admin.periodes.index'));
        $response->assertSessionHas('success');
        $this->assertEquals(1, $activePeriode->fresh()->aktif);
        $this->assertEquals(0, $inactivePeriode1->fresh()->aktif);
    }

    public function test_admin_can_deactivate_periode()
    {
        $periodeToDeactivate = Periode::factory()->create(['aktif' => 1]);

        $response = $this->actingAs($this->adminUser)->post(route('admin.periodes.deactivate', $periodeToDeactivate->id));

        $response->assertRedirect(route('admin.periodes.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('periodes', ['id' => $periodeToDeactivate->id, 'aktif' => 0]);
    }

    public function test_deactivating_already_inactive_periode_keeps_it_inactive()
    {
        $inactivePeriode = Periode::factory()->create(['aktif' => 0]);

        $response = $this->actingAs($this->adminUser)->post(route('admin.periodes.deactivate', $inactivePeriode->id));
        $response->assertRedirect(route('admin.periodes.index'));
        $this->assertEquals(0, $inactivePeriode->fresh()->aktif);
    }

    public function test_unauthenticated_user_cannot_access_periode_pages()
    {
        $this->get(route('admin.periodes.index'))->assertRedirect(route('login'));
        $this->get(route('admin.periodes.create'))->assertRedirect(route('login'));

        $periode = Periode::factory()->create();
        $this->get(route('admin.periodes.edit', $periode->id))->assertRedirect(route('login'));
        $this->post(route('admin.periodes.store'), [])->assertRedirect(route('login'));
        $this->put(route('admin.periodes.update', $periode->id), [])->assertRedirect(route('login'));
        $this->delete(route('admin.periodes.destroy', $periode->id))->assertRedirect(route('login'));
        $this->post(route('admin.periodes.activate', $periode->id))->assertRedirect(route('login'));
        $this->post(route('admin.periodes.deactivate', $periode->id))->assertRedirect(route('login'));
    }

    // Optional: Test authorization if specific permissions are used beyond basic auth + admin role
    // For example, if a 'view periodes' permission was required.
    // public function test_user_without_permission_cannot_access_periode_index()
    // {
    //     $this->actingAs($this->regularUser)->get(route('admin.periodes.index'))->assertStatus(403);
    // }

}
