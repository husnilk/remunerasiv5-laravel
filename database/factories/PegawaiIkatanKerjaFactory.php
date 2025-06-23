<?php

namespace Database\Factories;

use App\Models\PegawaiIkatanKerja;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PegawaiIkatan>
 */

class PegawaiIkatanKerjaFactory extends Factory
{
    protected $model = PegawaiIkatanKerja::class;

    public function definition(): array
    {
        return [
            'nama' => fake()->unique()->randomElement(['PNS', 'PPPK', 'Non-PNS Tetap', 'Non-PNS Kontrak', 'Honorer']),
            // Add other fields if PegawaiIkatanKerja has them and they need fake data
        ];
    }
}
