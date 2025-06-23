<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PegawaiJenis>
 */
class PegawaiJenisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ikatanKerja = \App\Models\PegawaiIkatanKerja::factory()->create(); // Ensure PegawaiIkatanKerja exists or is created

        return [
            'nama' => fake()->jobTitle() . ' ' . fake()->word(),
            'kode' => fake()->unique()->bothify('PJ-???-###'),
            'pegawai_ikatan_id' => $ikatanKerja->id,
            'jenis' => fake()->randomElement(['Dosen', 'Tendik', 'Pegawai Lainnya']),
            'has_remun' => fake()->boolean(),
        ];
    }
}
