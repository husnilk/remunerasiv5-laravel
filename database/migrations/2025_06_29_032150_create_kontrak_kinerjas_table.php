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
        Schema::create('kontrak_kinerjas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pegawai_id')->constrained('pegawais');
            $table->foreignId('periode_id')->constrained('periodes');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->integer('tahun');
            $table->integer('bulan_mulai');
            $table->integer('bulan_selesai');
            $table->date('tanggal_mulai')->nullable();
            $table->date('tanggal_selesai')->nullable();
            $table->foreignId('penilai_id')->constrained('pegawais');
            $table->foreignId('atasan_penilai_id')->constrained('pegawais');
            $table->integer('orientasi')->nullable();
            $table->integer('integritas')->nullable();
            $table->integer('komitmen')->nullable();
            $table->integer('disiplin')->nullable();
            $table->integer('kerjasama')->nullable();
            $table->integer('kepemimpinan')->nullable();
            $table->text('keberatan')->nullable();
            $table->date('tanggal_keberatan')->nullable();
            $table->text('tanggapan')->nullable();
            $table->date('tanggal_tanggapan')->nullable();
            $table->text('keputusan')->nullable();
            $table->date('tanggal_keputusan')->nullable();
            $table->text('rekomendasi')->nullable();
            $table->date('tanggal_buat')->nullable();
            $table->date('tanggal_terima')->nullable();
            $table->date('tanggal_terima_atasan')->nullable();
            $table->integer('status')->default(0); // 0: draft, 1: submitted, 2: approved, 3: rejected
            $table->date('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users');
            $table->double('capaian_skp')->nullable();
            $table->integer('predikat_kinerja')->nullable();
            $table->integer('rating_perilaku')->nullable();
            $table->integer('rating_kinerja')->nullable();
            $table->integer('file_bukti')->nullable();
            $table->integer('poin')->default(0);
            $table->integer('poin_verifikasi')->default(0);
            $table->string('file_kontrak')->nullable();
            $table->string('file_kinerja')->nullable();
            $table->integer('tingkat_pelanggaran')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kontrak_kinerjas');
    }
};
