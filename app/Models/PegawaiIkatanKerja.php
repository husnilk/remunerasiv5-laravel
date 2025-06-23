<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PegawaiIkatanKerja extends Model
{
    /** @use HasFactory<\Database\Factories\PegawaiIkatanKerjaFactory> */
    use HasFactory;

    protected $fillable = ['nama']; // Added fillable property

    protected $table = 'pegawai_ikatans'; // Ensuring correct table name
}
