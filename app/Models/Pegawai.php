<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pegawai extends Model
{
    /** @use HasFactory<\Database\Factories\PegawaiFactory> */
    use HasFactory;

    protected $fillable = [
        'nama',
        'nik',
        'nip',
        'email',
        'nohp',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'npwp',
        'pegawai_jenis_id',
        'profile_picture',
        'aktif',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'aktif' => 'boolean',
        'jenis_kelamin' => 'integer',
        'pegawai_jenis_id' => 'integer',
    ];

    public function pegawaiJenis()
    {
        return $this->belongsTo(PegawaiJenis::class);
    }

    /**
     * Get all of the pegawaiJabatans for the Pegawai
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function pegawaiJabatans(): HasMany
    {
        return $this->hasMany(PegawaiJabatan::class);
    }
}
