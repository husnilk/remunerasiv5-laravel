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
        Schema::create('kinerja_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kinerja_id')->constrained('kinerjas');
            $table->foreignId('user_id')->constrained('users');
            $table->string('user_role')->nullable();
            $table->foreignId('rubrik_detail_id')->nullable();
            $table->double('jumlah')->nullable();
            $table->double('poin')->nullable();
            $table->integer('verifikasi_status')->default(0);
            $table->integer('validasi_status')->default(0);
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kinerja_logs');
    }
};
