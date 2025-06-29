<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PegawaiIkatan extends Model
{
    /** @use HasFactory<\Database\Factories\PegawaiIkatanFactory> */
    use HasFactory;

    protected $fillable = ['nama'];

    protected $table = 'pegawai_ikatans'; // Corrected table name
}
