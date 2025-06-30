<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Periode>
 */
class PeriodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('-1 year', '+1 year');
        $endDate = (clone $startDate)->modify('+1 month'); // Example: periode is 1 month long

        return [
            'nama' => 'Periode ' . $this->faker->unique()->monthName() . ' ' . $startDate->format('Y'),
            'tanggal_mulai' => $startDate->format('Y-m-d'),
            'tanggal_selesai' => $endDate->format('Y-m-d'),
            'tahun' => (int)$startDate->format('Y'),
            'is_active' => $this->faker->boolean(25), // 25% chance of being active
        ];
    }
}
