<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pegawai>
 */
class PegawaiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => fake()->name(),
            'nik' => fake()->unique()->numerify('################'), // 16 digits
            'nip' => fake()->unique()->numerify('##################'), // 18 digits
            'email' => fake()->unique()->safeEmail(),
            'nohp' => fake()->e164PhoneNumber(),
            'tempat_lahir' => fake()->city(),
            'tanggal_lahir' => fake()->date(),
            'jenis_kelamin' => fake()->numberBetween(1, 2),
            'npwp' => fake()->numerify('###############'), // 15 digits
            'pegawai_jenis_id' => \App\Models\PegawaiJenis::factory(),
            // 'profile_picture' => null, // Or fake()->imageUrl() if you want to generate placeholder image URLs
            'aktif' => fake()->boolean(90), // 90% chance of being true (active)
        ];
    }
}
