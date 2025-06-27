<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JabatanUnit extends Model
{
    /** @use HasFactory<\Database\Factories\JabatanUnitFactory> */
    use HasFactory;

    protected $fillable = [
        'nama',
        'jabatan_id',
        'unit_id',
    ];

    /**
     * Get the jabatan that owns the JabatanUnit
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function jabatan(): BelongsTo
    {
        return $this->belongsTo(Jabatan::class);
    }

    /**
     * Get the unit that owns the JabatanUnit
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    /**
     * Get all of the pegawaiJabatans for the JabatanUnit
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function pegawaiJabatans(): HasMany
    {
        return $this->hasMany(PegawaiJabatan::class);
    }
}
