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
        Schema::create('rubriks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rubrik_kategori_id')->constrained('rubrik_kategoris')->cascadeOnDelete();
            $table->string('aktifitas');
            $table->text('uraian')->nullable();
            $table->text('uraian_bukti')->nullable();
            $table->string('kode')->nullable();
            $table->integer('jumlah')->default(1);
            $table->string('satuan');
            $table->integer('tipe_form')->default(1);
            $table->integer('personal')->default(0);
            $table->string('bukti_penugasan')->nullable();
            $table->string('bukti_kinerja')->nullable();
            $table->integer('min_pegawai')->default(0);
            $table->integer('max_pegawai')->default(0);
            $table->integer('min_poin')->default(0);
            $table->integer('max_poin')->default(0);
            $table->integer('fixed_poin')->default(0);
            $table->integer('umum')->default(1);
            $table->integer('aktif')->default(1);
            $table->integer('flat_rate')->default(1);
            $table->integer('rate')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rubriks');
    }
};
