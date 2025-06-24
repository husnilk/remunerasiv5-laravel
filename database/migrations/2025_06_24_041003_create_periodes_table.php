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
        Schema::create('periodes', function (Blueprint $table) {
            $table->id();
            $table->integer('tahun');
            $table->integer('periode');
            $table->string('nama');
            $table->string('keterangan')->nullable();
            $table->double('pir')->default(3000);
            $table->date('tgl_mulai')->nullable();
            $table->date('tgl_selesai')->nullable();
            $table->date('tgl_input_mulai')->nullable();
            $table->date('tgl_input_selesai')->nullable();
            $table->date('tgl_verifikasi_mulai')->nullable();
            $table->date('tgl_verifikasi_selesai')->nullable();
            $table->date('tgl_validasi_mulai')->nullable();
            $table->date('tgl_validasi_selesai')->nullable();
            $table->integer('kehadiran')->nullable();
            $table->integer('skp')->nullable();
            $table->integer('format_skp')->nullable();
            $table->integer('calc_method')->nullable();
            $table->integer('bkd_tahun')->nullable();
            $table->string('bkd_semester')->nullable();
            $table->integer('bkd_source_p1')->nullable();
            $table->integer('bkd_tahun_p1')->nullable();
            $table->string('bkd_semester_p1')->nullable();
            $table->integer('bkd_source_p2')->nullable();
            $table->integer('bkd_tahun_p2')->nullable();
            $table->string('bkd_semester_p2')->nullable();
            $table->integer('aktif')->default(0);
            $table->integer('show_insentif')->default(0);
            $table->integer('user_confirmation')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('periodes');
    }
};
