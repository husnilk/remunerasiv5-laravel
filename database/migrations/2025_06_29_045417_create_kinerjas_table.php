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
        Schema::create('kinerjas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pegawai_id')->constrained('pegawais');
            $table->foreignId('periode_id')->constrained('periodes');
            $table->foreignId('kegiatan_id')->constrained('kegiatans');
            $table->foreignId('rubrik_id')->constrained('rubriks');
            $table->foreignId('rubrik_detail_id')->constrained('rubrik_details');
            $table->string('jabatan')->nullable();
            $table->string('nama');
            $table->double('jumlah');
            $table->double('jumlah_original')->nullable();
            $table->double('alasan_perubahan')->nullable();
            $table->double('poin')->default(0);
            $table->string('no_surat')->nullable();
            $table->date('tanggal_mulai')->nullable();
            $table->date('tanggal_selesai')->nullable();
            $table->string('jenis_dokumen')->nullable();
            $table->string('file_kinerja')->nullable();
            $table->string('link_kinerja')->nullable();
            $table->string('no_dokumen_kinerja')->nullable();
            $table->integer('verifikasi_status')->default(0);
            $table->integer('verifikasi_alasan_kode')->nullable();
            $table->string('verifikasi_alasan')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users');
            $table->date('verified_at')->nullable();
            $table->integer('validasi_status')->default(0);
            $table->integer('validasi_alasan_kode')->nullable();
            $table->string('validasi_alasan')->nullable();
            $table->foreignId('validated_by')->nullable()->constrained('users');
            $table->date('validated_at')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kinerjas');
    }
};
