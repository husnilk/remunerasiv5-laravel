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
        Schema::create('bkds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pegawai_id')->constrained('pegawais');
            $table->foreignId('periode_id')->constrained('periodes');
            $table->foreignId('fungsional_id')->constrained('fungsionals');
            $table->integer('tahun')->nullable();
            $table->integer('semester')->nullable();
            $table->double('sks_kinerja_didik')->nullable();
            $table->double('sks_lebih_didik')->nullable();
            $table->double('sks_kinerja_ajar')->nullable();
            $table->double('sks_lebih_ajar')->nullable();
            $table->double('sks_kinerja_penelitian')->nullable();
            $table->double('sks_lebih_penelitian')->nullable();
            $table->double('sks_kinerja_pengabdian')->nullable();
            $table->double('sks_lebih_pengabdian')->nullable();
            $table->double('sks_kinerja_penunjang')->nullable();
            $table->double('sks_lebih_penunjang')->nullable();
            $table->double('sks_kinerja')->nullable();
            $table->double('sks_lebih')->nullable();
            $table->double('stat_kewajiban')->nullable();
            $table->double('stat_tugas')->nullable();
            $table->double('stat_belajar')->nullable();
            $table->string('simpulan_asesor')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bkds');
    }
};
