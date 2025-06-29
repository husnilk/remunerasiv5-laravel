<?php

namespace Database\Factories;

use App\Models\PegawaiIkatan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PegawaiIkatan>
 */

class PegawaiIkatanFactory extends Factory
{
    protected $model = PegawaiIkatan::class;

    public function definition(): array
    {
        return [
            'nama' => fake()->unique()->randomElement(['PNS', 'PPPK', 'Non-PNS Tetap', 'Non-PNS Kontrak', 'Honorer']),
            // Add other fields if PegawaiIkatanKerja has them and they need fake data
        ];
    }
}
