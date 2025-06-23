<?php

namespace Database\Seeders;

use App\Models\Unit;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Unit::create([
            'name' => 'Kementerian Keuangan',
            'code' => '015',
        ]);

        $parent = Unit::where('code', '015')->first();

        Unit::create([
            'name' => 'Sekretariat Jenderal',
            'code' => '01',
            'parent_id' => $parent->id,
        ]);

        Unit::create([
            'name' => 'Direktorat Jenderal Pajak',
            'code' => '04',
            'parent_id' => $parent->id,
            'has_pagu' => true,
            'has_rubrik' => true,
        ]);
    }
}
