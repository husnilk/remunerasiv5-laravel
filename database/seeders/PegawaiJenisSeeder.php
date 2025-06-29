<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PegawaiJenisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\PegawaiJenis::factory()->create([
            'nama' => 'Dosen PNS',
            'kode' => 'DSN',
            'pegawai_ikatan_id' => 1, // Assuming you have a PegawaiIkatan with ID 1
            'jenis' => 'Dosen',
            'has_remun' => true,
        ]);
    }
}
