<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PegawaiFungsional extends Model
{
    /** @use HasFactory<\Database\Factories\PegawaiFungsionalFactory> */
        use HasFactory;

    protected $fillable = [
        'pegawai_id',
        'fungsional_id',
        'tmt',
    ];

    protected $casts = [
        'tmt' => 'date',
    ];

    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class);
    }

    public function fungsional()
    {
        return $this->belongsTo(Fungsional::class);
    }
}
