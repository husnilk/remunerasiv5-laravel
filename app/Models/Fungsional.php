<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fungsional extends Model
{
    /** @use HasFactory<\Database\Factories\FungsionalFactory> */
    use HasFactory;

    protected $fillable = [
        'nama',
        'kode',
        'grade',
        'job_value',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
        'grade' => 'integer',
        'job_value' => 'integer',
    ];
}
