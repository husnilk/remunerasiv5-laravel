<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Pegawai;
use App\Models\Periode;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Kehadiran extends Model
{
    /** @use HasFactory<\Database\Factories\KehadiranFactory> */
    use HasFactory;

    protected $fillable = [
        'pegawai_id',
        'periode_id',
        'created_by',
        'status_pegawai',
        'tahun',
        'bulan',
        'hadir',
        'dinas_luar',
        'cuti_sakit',
        'cuti_izin',
        'cuti_besar',
        'cuti_tahunan',
        'cuti_melahirkan',
        'cuti_penting',
        'cuti_non_taggungan',
        'tanpa_keterangan',
        'tugas_belajar',
        'cuti_bersalin_01',
        'cuti_bersalin_02',
        'cuti_bersalin_03',
        'terlambat_01',
        'terlambat_02',
        'terlambat_03',
        'terlambat_04',
        'terlambat_05',
        'terlambat_06',
        'pulang_cepat_01',
        'pulang_cepat_02',
        'pulang_cepat_03',
        'pulang_cepat_04',
        'pulang_cepat_05',
        'pulang_cepat_06',
    ];

    public function pegawai(): BelongsTo
    {
        return $this->belongsTo(Pegawai::class);
    }

    public function periode(): BelongsTo
    {
        return $this->belongsTo(Periode::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
