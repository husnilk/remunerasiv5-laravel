<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rubrik_pegawais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rubrik_id')->constrained('rubriks')->cascadeOnDelete();
            $table->foreignId('pegawai_jenis_id')->constrained('pegawai_jenis')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rubrik_pegawais');
    }
};
