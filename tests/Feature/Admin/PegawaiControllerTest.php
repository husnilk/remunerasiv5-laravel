<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use App\Models\Pegawai;
use App\Models\PegawaiJenis;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PegawaiControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected PegawaiJenis $pegawaiJenis;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(); // Assuming you have a User factory
        $this->actingAs($this->user);
        $this->pegawaiJenis = PegawaiJenis::factory()->create(); // Assuming you have a PegawaiJenis factory
    }

    public function test_pegawai_index_page_is_rendered(): void
    {
        Pegawai::factory()->count(5)->for($this->pegawaiJenis)->create();

        $response = $this->get(route('admin.pegawai.index'));

        $response->assertOk();
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Admin/Pegawai/Index')
                ->has('pegawais.data', 5)
                ->has('pegawais.data.0.pegawai_jenis')
        );
    }

    public function test_pegawai_create_page_is_rendered(): void
    {
        $response = $this->get(route('admin.pegawai.create'));

        $response->assertOk();
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Admin/Pegawai/Create')
                ->has('pegawaiJenis')
        );
    }

    public function test_can_store_a_new_pegawai(): void
    {
        Storage::fake('public');

        $data = [
            'nama' => 'Test Pegawai',
            'nik' => '1234567890123456',
            'nip' => '199001012020011001',
            'email' => 'test@example.com',
            'nohp' => '081234567890',
            'tempat_lahir' => 'Test City',
            'tanggal_lahir' => '1990-01-01',
            'jenis_kelamin' => 1,
            'npwp' => '123456789012345',
            'pegawai_jenis_id' => $this->pegawaiJenis->id,
            'aktif' => true,
            'profile_picture' => UploadedFile::fake()->image('avatar.jpg'),
        ];

        $response = $this->post(route('admin.pegawai.store'), $data);

        $response->assertRedirect(route('admin.pegawai.index'));
        $response->assertSessionHas('success', 'Pegawai created successfully.');
        $this->assertDatabaseHas('pegawais', ['nik' => '1234567890123456', 'email' => 'test@example.com']);

        $pegawai = Pegawai::firstWhere('nik', '1234567890123456');
        $this->assertNotNull($pegawai->profile_picture);
        Storage::disk('public')->assertExists($pegawai->profile_picture);
    }

    public function test_pegawai_show_page_is_rendered(): void
    {
        $pegawai = Pegawai::factory()->for($this->pegawaiJenis)->create();
        $response = $this->get(route('admin.pegawai.show', $pegawai->id));

        $response->assertOk();
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Admin/Pegawai/Show')
                ->where('pegawai.id', $pegawai->id)
                ->has('pegawai.pegawai_jenis')
        );
    }

    public function test_pegawai_edit_page_is_rendered(): void
    {
        $pegawai = Pegawai::factory()->for($this->pegawaiJenis)->create();
        $response = $this->get(route('admin.pegawai.edit', $pegawai->id));

        $response->assertOk();
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Admin/Pegawai/Edit')
                ->where('pegawai.id', $pegawai->id)
                ->has('pegawaiJenis')
        );
    }

    public function test_can_update_a_pegawai(): void
    {
        Storage::fake('public');
        $pegawai = Pegawai::factory()->for($this->pegawaiJenis)->create();
        $oldPicture = $pegawai->profile_picture; // Assuming factory might create one

        $updatedData = [
            'nama' => 'Updated Pegawai Name',
            'email' => 'updated@example.com',
            'nik' => $pegawai->nik, // NIK should be unique or ignored for self
            'nip' => $pegawai->nip,   // NIP should be unique or ignored for self
            'pegawai_jenis_id' => $this->pegawaiJenis->id,
            'jenis_kelamin' => 1,
            'aktif' => true,
            'profile_picture' => UploadedFile::fake()->image('new_avatar.jpg'),
        ];

        $response = $this->put(route('admin.pegawai.update', $pegawai->id), $updatedData);

        $response->assertRedirect(route('admin.pegawai.index'));
        $response->assertSessionHas('success', 'Pegawai updated successfully.');
        $this->assertDatabaseHas('pegawais', ['id' => $pegawai->id, 'email' => 'updated@example.com']);

        $pegawai->refresh();
        $this->assertNotNull($pegawai->profile_picture);
        Storage::disk('public')->assertExists($pegawai->profile_picture);
        if ($oldPicture) {
            Storage::disk('public')->assertMissing($oldPicture);
        }
    }

    public function test_can_delete_a_pegawai(): void
    {
        Storage::fake('public');
        $pegawai = Pegawai::factory()->for($this->pegawaiJenis)->create(['profile_picture' => UploadedFile::fake()->image('avatar.jpg')->store('profile_pictures', 'public')]);
        $picturePath = $pegawai->profile_picture;

        $response = $this->delete(route('admin.pegawai.destroy', $pegawai->id));

        $response->assertRedirect(route('admin.pegawai.index'));
        $response->assertSessionHas('success', 'Pegawai deleted successfully.');
        $this->assertDatabaseMissing('pegawais', ['id' => $pegawai->id]);
        if ($picturePath) {
             Storage::disk('public')->assertMissing($picturePath);
        }
    }

    public function test_pegawai_search_functionality(): void
    {
        Pegawai::factory()->for($this->pegawaiJenis)->create(['nama' => 'John Doe', 'nip' => '11111']);
        Pegawai::factory()->for($this->pegawaiJenis)->create(['nama' => 'Jane Doe', 'nip' => '22222']);
        Pegawai::factory()->for($this->pegawaiJenis)->create(['nama' => 'Another Person', 'nip' => '33333']);

        $response = $this->get(route('admin.pegawai.index', ['search' => 'John']));
        $response->assertInertia(
            fn (Assert $page) => $page
                ->has('pegawais.data', 1)
                ->where('pegawais.data.0.nama', 'John Doe')
        );

        $response = $this->get(route('admin.pegawai.index', ['search' => 'Doe']));
         $response->assertInertia(
            fn (Assert $page) => $page->has('pegawais.data', 2)
        );

        $response = $this->get(route('admin.pegawai.index', ['search' => '11111']));
         $response->assertInertia(
            fn (Assert $page) => $page
                ->has('pegawais.data', 1)
                ->where('pegawais.data.0.nip', '11111')
        );
    }
}
