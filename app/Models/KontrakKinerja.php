<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KontrakKinerja extends Model
{
    /** @use HasFactory<\Database\Factories\KontrakKinerjaFactory> */
    use HasFactory;

    protected $fillable = [
        'pegawai_id',
        'periode_id',
        'created_by',
        'updated_by',
        'tahun',
        'bulan_mulai',
        'bulan_selesai',
        'tanggal_mulai',
        'tanggal_selesai',
        'penilai_id',
        'atasan_penilai_id',
        'orientasi',
        'integritas',
        'komitmen',
        'disiplin',
        'kerjasama',
        'kepemimpinan',
        'keberatan',
        'tanggal_keberatan',
        'tanggapan',
        'tanggal_tanggapan',
        'keputusan',
        'tanggal_keputusan',
        'rekomendasi',
        'tanggal_buat',
        'tanggal_terima',
        'tanggal_terima_atasan',
        'status',
        'verified_at',
        'verified_by',
        'capaian_skp',
        'predikat_kinerja',
        'rating_perilaku',
        'rating_kinerja',
        'file_bukti', // Consider if this should be handled differently (e.g., for file uploads)
        'poin',
        'poin_verifikasi',
        'file_kontrak', // Consider file upload handling
        'file_kinerja', // Consider file upload handling
        'tingkat_pelanggaran',
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_selesai' => 'date',
        'tanggal_keberatan' => 'date',
        'tanggal_tanggapan' => 'date',
        'tanggal_keputusan' => 'date',
        'tanggal_buat' => 'date',
        'tanggal_terima' => 'date',
        'tanggal_terima_atasan' => 'date',
        'verified_at' => 'datetime',
        'status' => 'integer',
        'tahun' => 'integer',
        'bulan_mulai' => 'integer',
        'bulan_selesai' => 'integer',
    ];

    /**
     * Get the Pegawai associated with the KontrakKinerja.
     */
    public function pegawai(): BelongsTo
    {
        return $this->belongsTo(Pegawai::class, 'pegawai_id');
    }

    /**
     * Get the Periode associated with the KontrakKinerja.
     */
    public function periode(): BelongsTo
    {
        return $this->belongsTo(Periode::class, 'periode_id');
    }

    /**
     * Get the User who created the KontrakKinerja.
     */
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the User who last updated the KontrakKinerja.
     */
    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get the Penilai (Pegawai) for the KontrakKinerja.
     */
    public function penilai(): BelongsTo
    {
        return $this->belongsTo(Pegawai::class, 'penilai_id');
    }

    /**
     * Get the Atasan Penilai (Pegawai) for the KontrakKinerja.
     */
    public function atasanPenilai(): BelongsTo
    {
        return $this->belongsTo(Pegawai::class, 'atasan_penilai_id');
    }

    /**
     * Get the User who verified the KontrakKinerja.
     */
    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}
