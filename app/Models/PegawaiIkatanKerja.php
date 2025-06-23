<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PegawaiIkatanKerja extends Model
{
    /** @use HasFactory<\Database\Factories\PegawaiIkatanKerjaFactory> */
    use HasFactory;

    protected $fillable = ['nama'];

    protected $table = 'pegawai_ikatan_kerjas'; // Corrected table name
}
