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
        Schema::create('remun_pegawais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pegawai_id')->constrained('pegawais');
            $table->foreignId('periode_id')->constrained('periodes');
            $table->foreignId('pegawai_jenis_id')->constrained('pegawai_jenis');
            $table->integer('tahun')->nullable();
            $table->integer('bulan')->nullable();
            $table->double('poin')->nullable();
            $table->integer('absensi')->nullable();
            $table->integer('skp')->nullable();
            $table->double('capaian_skp')->nullable();
            $table->string('p1_bkd_file')->nullable();
            $table->date('p1_bkd_tanggal')->nullable();
            $table->double('p1_bkd_sks_kinerja')->nullable();
            $table->double('p1_bkd_sks_lebih')->nullable();
            $table->string('p1_bkd_kesimpulan')->nullable();
            $table->string('p2_bkd_file')->nullable();
            $table->date('p2_bkd_tanggal')->nullable();
            $table->double('p2_bkd_sks_kinerja')->nullable();
            $table->double('p2_bkd_sks_lebih')->nullable();
            $table->string('p2_bkd_kesimpulan')->nullable();
            $table->integer('bkd_status')->default(0);
            $table->integer('remun_aktif')->default(1);
            $table->foreignId('validated_by')->constrained('users');
            $table->double('poin_skp')->default(0);
            $table->double('poin_kinerja')->default(0);
            $table->integer('status')->default(0);
            $table->double('sks_ajar_bkd')->default(0);
            $table->double('sks_ajar_remun')->default(0);
            $table->double('sks_ajar_lebih')->default(0);
            $table->double('sks_ajar_pengurang')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('remun_pegawais');
    }
};
