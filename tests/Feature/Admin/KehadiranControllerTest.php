<?php

namespace Tests\Feature\Admin;

use App\Models\Kehadiran;
use App\Models\Pegawai;
use App\Models\Periode;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class KehadiranControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;
    protected Pegawai $pegawai;
    protected Periode $periode;

    protected function setUp(): void
    {
        parent::setUp();

        $this->adminUser = User::factory()->create();
        // Assign admin role or necessary permissions if your app uses them
        // For example: $this->adminUser->assignRole('admin');

        $this->pegawai = Pegawai::factory()->create();
        $this->periode = Periode::factory()->create();

        $this->actingAs($this->adminUser);
    }

    public function test_can_view_kehadiran_index_page(): void
    {
        Kehadiran::factory()->count(3)->for($this->pegawai)->for($this->periode)->for($this->adminUser, 'createdBy')->create();

        $this->get(route('admin.kehadiran.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Kehadiran/Index')
                ->has('kehadirans.data', 3)
                ->has('kehadirans.data.0.pegawai')
                ->has('kehadirans.data.0.periode')
                ->has('kehadirans.data.0.createdBy')
            );
    }

    public function test_can_search_kehadiran_by_pegawai_name(): void
    {
        $pegawaiToSearch = Pegawai::factory()->create(['nama' => 'John Doe Searchable']);
        Kehadiran::factory()->for($pegawaiToSearch)->for($this->periode)->for($this->adminUser, 'createdBy')->create();
        Kehadiran::factory()->count(2)->for($this->pegawai)->for($this->periode)->for($this->adminUser, 'createdBy')->create();


        $this->get(route('admin.kehadiran.index', ['search' => 'John Doe Searchable']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Kehadiran/Index')
                ->has('kehadirans.data', 1)
                ->where('kehadirans.data.0.pegawai.nama', 'John Doe Searchable')
                ->where('filters.search', 'John Doe Searchable')
            );
    }

    public function test_can_view_kehadiran_create_page(): void
    {
        $this->get(route('admin.kehadiran.create'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Kehadiran/Create')
                ->has('pegawais')
                ->has('periodes')
            );
    }

    public function test_can_store_new_kehadiran(): void
    {
        $data = [
            'pegawai_id' => $this->pegawai->id,
            'periode_id' => $this->periode->id,
            'status_pegawai' => 1,
            'tahun' => 2024,
            'bulan' => 7,
            'hadir' => 20,
            'dinas_luar' => 2,
            // Add other fields as necessary, ensuring they are valid
        ];

        $this->post(route('admin.kehadiran.store'), $data)
            ->assertRedirect(route('admin.kehadiran.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('kehadirans', [
            'pegawai_id' => $this->pegawai->id,
            'periode_id' => $this->periode->id,
            'tahun' => 2024,
            'bulan' => 7,
            'hadir' => 20,
            'dinas_luar' => 2,
            'created_by' => $this->adminUser->id,
        ]);
    }

    public function test_store_kehadiran_validation_fails_for_invalid_data(): void
    {
        $this->post(route('admin.kehadiran.store'), ['pegawai_id' => 999]) // Invalid pegawai_id
            ->assertSessionHasErrors('pegawai_id');
    }


    public function test_can_view_kehadiran_edit_page(): void
    {
        $kehadiran = Kehadiran::factory()->for($this->pegawai)->for($this->periode)->for($this->adminUser, 'createdBy')->create();

        $this->get(route('admin.kehadiran.edit', $kehadiran->id))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Kehadiran/Edit')
                ->where('kehadiran.id', $kehadiran->id)
                ->has('pegawais')
                ->has('periodes')
            );
    }

    public function test_can_update_kehadiran(): void
    {
        $kehadiran = Kehadiran::factory()->for($this->pegawai)->for($this->periode)->for($this->adminUser, 'createdBy')->create([
            'hadir' => 10,
            'tahun' => 2023,
        ]);

        $updatedData = [
            'pegawai_id' => $this->pegawai->id, // Cannot change pegawai_id in this setup, but required
            'periode_id' => $this->periode->id,
            'status_pegawai' => 1,
            'tahun' => 2024, // Changed
            'bulan' => 8,     // Changed
            'hadir' => 22,    // Changed
            'dinas_luar' => 3,
             // Add other fields as necessary
        ];

        $this->put(route('admin.kehadiran.update', $kehadiran->id), $updatedData)
            ->assertRedirect(route('admin.kehadiran.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('kehadirans', [
            'id' => $kehadiran->id,
            'tahun' => 2024,
            'bulan' => 8,
            'hadir' => 22,
            'dinas_luar' => 3,
        ]);
    }

    public function test_can_delete_kehadiran(): void
    {
        $kehadiran = Kehadiran::factory()->for($this->pegawai)->for($this->periode)->for($this->adminUser, 'createdBy')->create();

        $this->delete(route('admin.kehadiran.destroy', $kehadiran->id))
            ->assertRedirect(route('admin.kehadiran.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('kehadirans', ['id' => $kehadiran->id]);
    }
}
