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
        Schema::create('kehadirans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pegawai_id')->constrained('pegawais');
            $table->foreignId('periode_id')->constrained('periodes');
            $table->foreignId('created_by')->constrained('users');
            $table->integer('status_pegawai')->default(1);
            $table->integer('tahun');
            $table->integer('bulan');
            $table->integer('hadir')->default(0);
            $table->integer('dinas_luar')->default(0);
            $table->integer('cuti_sakit')->default(0);
            $table->integer('cuti_izin')->default(0);
            $table->integer('cuti_besar')->default(0);
            $table->integer('cuti_tahunan')->default(0);
            $table->integer('cuti_melahirkan')->default(0);
            $table->integer('cuti_penting')->default(0);
            $table->integer('cuti_non_taggungan')->default(0);
            $table->integer('tanpa_keterangan')->default(0);
            $table->integer('tugas_belajar')->default(0);
            $table->integer('cuti_bersalin_01')->default(0);
            $table->integer('cuti_bersalin_02')->default(0);
            $table->integer('cuti_bersalin_03')->default(0);
            $table->integer('terlambat_01')->default(0);
            $table->integer('terlambat_02')->default(0);
            $table->integer('terlambat_03')->default(0);
            $table->integer('terlambat_04')->default(0);
            $table->integer('terlambat_05')->default(0);
            $table->integer('terlambat_06')->default(0);
            $table->integer('pulang_cepat_01')->default(0);
            $table->integer('pulang_cepat_02')->default(0);
            $table->integer('pulang_cepat_03')->default(0);
            $table->integer('pulang_cepat_04')->default(0);
            $table->integer('pulang_cepat_05')->default(0);
            $table->integer('pulang_cepat_06')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kehadirans');
    }
};
