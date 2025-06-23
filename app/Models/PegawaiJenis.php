<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PegawaiJenis extends Model
{
    /** @use HasFactory<\Database\Factories\PegawaiJenisFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama',
        'kode',
        'pegawai_ikatan_id',
        'jenis',
        'has_remun',
    ];

    /**
     * Get the pegawai ikatan that owns the PegawaiJenis.
     */
    public function pegawaiIkatan()
    {
        return $this->belongsTo(PegawaiIkatan::class, 'pegawai_ikatan_id');
    }
}
