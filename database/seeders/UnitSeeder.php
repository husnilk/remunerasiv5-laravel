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
            'nama' => 'Kementerian Keuangan',
            'kode' => '015',
        ]);

        $parent = Unit::where('kode', '015')->first(); // Also ensure where uses correct column name

        Unit::create([
            'nama' => 'Sekretariat Jenderal',
            'kode' => '01',
            'parent_id' => $parent->id,
        ]);

        Unit::create([
            'nama' => 'Direktorat Jenderal Pajak',
            'kode' => '04',
            'parent_id' => $parent->id,
            'has_pagu' => true,
            'has_rubrik' => true,
        ]);
    }
}
