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
        Schema::create('remun_pegawai_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('remun_pegawai_id')->constrained('remun_pegawais');
            $table->foreignId('pegawai_jenis_id')->constrained('pegawais');
            $table->integer('tahun');
            $table->integer('bulan');
            $table->integer('status_bkd')->nullable();
            $table->integer('status_kehadiran')->nullable();
            $table->foreignId('jabatan_id')->constrained('jabatans')->nullable();
            $table->integer('jabatan_grade')->nullable();
            $table->integer('jabatan_jv')->nullable();
            $table->integer('jabatan_cg')->default(0);
            $table->foreignId('fungsional_id')->constrained('fungsionals');
            $table->integer('fungsional_grade')->nullable();
            $table->integer('fungsional_jv')->nullable();
            $table->integer('remun')->nullable();
            $table->integer('p1')->nullable();
            $table->integer('p2')->nullable();
            $table->double('poin_skp')->default(0);
            $table->integer('aktif')->default(1);
            $table->integer('max_poin')->default(56);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('remun_pegawai_details');
    }
};
