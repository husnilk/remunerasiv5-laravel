<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periode extends Model
{
    /** @use HasFactory<\Database\Factories\PeriodeFactory> */
    use HasFactory;

    protected $fillable = [
        'tahun',
        'periode',
        'nama',
        'keterangan',
        'pir',
        'tgl_mulai',
        'tgl_selesai',
        'tgl_input_mulai',
        'tgl_input_selesai',
        'tgl_verifikasi_mulai',
        'tgl_verifikasi_selesai',
        'tgl_validasi_mulai',
        'tgl_validasi_selesai',
        'kehadiran',
        'skp',
        'format_skp',
        'calc_method',
        'bkd_tahun',
        'bkd_semester',
        'bkd_source_p1',
        'bkd_tahun_p1',
        'bkd_semester_p1',
        'bkd_source_p2',
        'bkd_tahun_p2',
        'bkd_semester_p2',
        'aktif',
        'show_insentif',
        'user_confirmation',
    ];
}
