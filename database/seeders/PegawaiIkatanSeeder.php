<?php

namespace Database\Seeders;

use App\Models\PegawaiIkatan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PegawaiIkatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PegawaiIkatan::factory()->create(['nama' => 'PNS']);
        PegawaiIkatan::factory()->create(['nama' => 'PHL']);
    }
}
