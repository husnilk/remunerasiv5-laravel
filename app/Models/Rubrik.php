<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rubrik extends Model
{
    /** @use HasFactory<\Database\Factories\RubrikFactory> */
    use HasFactory;

    protected $fillable = [
        'rubrik_kategori_id',
        'aktifitas',
        'uraian',
        'uraian_bukti',
        'kode',
        'jumlah',
        'satuan',
        'tipe_form',
        'personal',
        'bukti_penugasan',
        'bukti_kinerja',
        'min_pegawai',
        'max_pegawai',
        'min_poin',
        'max_poin',
        'fixed_poin',
        'umum',
        'aktif',
        'flat_rate',
        'rate',
    ];

    /**
     * Get the rubrik kategori that owns the rubrik.
     */
    public function rubrikKategori()
    {
        return $this->belongsTo(RubrikKategori::class);
    }
}
