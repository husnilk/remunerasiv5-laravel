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
        Schema::create('pegawai_jenis', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('kode')->unique();
            $table->foreignId('pegawai_ikatan_id')->constrained('pegawai_ikatans')->cascadeOnDelete();
            $table->enum('jenis', ['Dosen', 'Tendik', 'Pegawai Lainnya']);
            $table->boolean('has_remun')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pegawai_jenis');
    }
};
