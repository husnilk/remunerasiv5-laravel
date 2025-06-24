<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RubrikRemun extends Model
{
    /** @use HasFactory<\Database\Factories\RubrikRemunFactory> */
    use HasFactory;

    protected $fillable = [
        'nama',
        'active',
    ];
}
