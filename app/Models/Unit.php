<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Unit extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'code',
        'parent_id',
        'has_pagu',
        'has_rubrik',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'has_pagu' => 'boolean',
        'has_rubrik' => 'boolean',
    ];

    /**
     * Get the parent unit of this unit.
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Unit::class, 'parent_id');
    }

    /**
     * Get the children units of this unit.
     */
    public function children(): HasMany
    {
        return $this->hasMany(Unit::class, 'parent_id');
    }
}
