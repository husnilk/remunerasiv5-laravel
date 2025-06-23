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
        Schema::create('pegawais', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nik')->unique();
            $table->string('nip')->unique();
            $table->string('email')->unique();
            $table->string('nohp')->nullable();
            $table->string('tempat_lahir')->nullable();
            $table->string('tanggal_lahir')->nullable();
            $table->integer('jenis_kelamin')->default(1);
            $table->string('npwp')->nullable();
            $table->foreignId('pegawai_jenis_id')->constrained('pegawai_jenis')->cascadeOnDelete();
            $table->string('profile_picture')->nullable();
            $table->integer('aktif')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pegawais');
    }
};
