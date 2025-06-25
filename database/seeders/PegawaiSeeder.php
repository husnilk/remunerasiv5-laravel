<?php

namespace Database\Seeders;

use App\Models\Pegawai;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PegawaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pegawai::factory(10)->create([
            'pegawai_jenis_id' => 1, // Assuming you have a PegawaiJenis with ID 1
            'profile_picture' => 'profile_pictures/default.png', // Default profile picture
        ]);
    }
}
