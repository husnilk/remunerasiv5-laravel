<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fungsional>
 */
class FungsionalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => $this->faker->unique()->jobTitle(),
            'kode' => $this->faker->unique()->lexify('F???'), // Example: F001, FABC
            'grade' => $this->faker->optional()->numberBetween(1, 15),
            'job_value' => $this->faker->optional()->numberBetween(100, 1000),
            'active' => $this->faker->boolean(90), // 90% chance of being true
        ];
    }
}
