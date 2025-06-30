<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kehadiran>
 */
class KehadiranFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
use App\Models\Pegawai;
use App\Models\Periode;
use App\Models\User;

class KehadiranFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pegawai_id' => Pegawai::factory(),
            'periode_id' => Periode::factory(),
            'created_by' => User::factory(),
            'status_pegawai' => 1, // Default to active
            'tahun' => $this->faker->numberBetween(date('Y') - 1, date('Y')),
            'bulan' => $this->faker->numberBetween(1, 12),
            'hadir' => $this->faker->numberBetween(15, 22),
            'dinas_luar' => $this->faker->numberBetween(0, 5),
            'cuti_sakit' => $this->faker->numberBetween(0, 2),
            'cuti_izin' => $this->faker->numberBetween(0, 2),
            'cuti_besar' => $this->faker->numberBetween(0, 1),
            'cuti_tahunan' => $this->faker->numberBetween(0, 12),
            'cuti_melahirkan' => $this->faker->numberBetween(0, 1), // Assuming this is a flag or count
            'cuti_penting' => $this->faker->numberBetween(0, 2),
            'cuti_non_taggungan' => $this->faker->numberBetween(0, 1),
            'tanpa_keterangan' => $this->faker->numberBetween(0, 1),
            'tugas_belajar' => $this->faker->numberBetween(0, 1),
            'cuti_bersalin_01' => $this->faker->numberBetween(0, 1),
            'cuti_bersalin_02' => $this->faker->numberBetween(0, 1),
            'cuti_bersalin_03' => $this->faker->numberBetween(0, 1),
            'terlambat_01' => $this->faker->numberBetween(0, 5),
            'terlambat_02' => $this->faker->numberBetween(0, 3),
            'terlambat_03' => $this->faker->numberBetween(0, 2),
            'terlambat_04' => $this->faker->numberBetween(0, 1),
            'terlambat_05' => $this->faker->numberBetween(0, 1),
            'terlambat_06' => $this->faker->numberBetween(0, 0), // Usually 0
            'pulang_cepat_01' => $this->faker->numberBetween(0, 5),
            'pulang_cepat_02' => $this->faker->numberBetween(0, 3),
            'pulang_cepat_03' => $this->faker->numberBetween(0, 2),
            'pulang_cepat_04' => $this->faker->numberBetween(0, 1),
            'pulang_cepat_05' => $this->faker->numberBetween(0, 1),
            'pulang_cepat_06' => $this->faker->numberBetween(0, 0), // Usually 0
        ];
    }
}
