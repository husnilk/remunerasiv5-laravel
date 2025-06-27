<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PegawaiJabatan extends Model
{
    /** @use HasFactory<\Database\Factories\PegawaiJabatanFactory> */
    use HasFactory;

    protected $fillable = [
        'pegawai_id',
        'jabatan_unit_id',
        'tmt',
        'selesai',
    ];

    protected $casts = [
        'tmt' => 'date',
        'selesai' => 'date',
    ];

    /**
     * Get the pegawai that owns the PegawaiJabatan
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function pegawai(): BelongsTo
    {
        return $this->belongsTo(Pegawai::class);
    }

    /**
     * Get the jabatanUnit that owns the PegawaiJabatan
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function jabatanUnit(): BelongsTo
    {
        return $this->belongsTo(JabatanUnit::class);
    }
}
