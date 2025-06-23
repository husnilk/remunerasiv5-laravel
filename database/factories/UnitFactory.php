<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Unit>
 */
class UnitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'code' => $this->faker->unique()->regexify('[A-Z0-9]{2,5}'),
            'parent_id' => null,
            'has_pagu' => $this->faker->boolean(20), // 20% chance of being true
            'has_rubrik' => $this->faker->boolean(20), // 20% chance of being true
        ];
    }

    /**
     * Indicate that the unit has a parent.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function withParent(?string $parentId = null)
    {
        return $this->state(function (array $attributes) use ($parentId) {
            return [
                'parent_id' => $parentId ?? self::factory(),
            ];
        });
    }

    /**
     * Indicate that the unit has pagu.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function hasPagu()
    {
        return $this->state(function (array $attributes) {
            return [
                'has_pagu' => true,
            ];
        });
    }

    /**
     * Indicate that the unit has rubrik.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function hasRubrik()
    {
        return $this->state(function (array $attributes) {
            return [
                'has_rubrik' => true,
            ];
        });
    }
}
