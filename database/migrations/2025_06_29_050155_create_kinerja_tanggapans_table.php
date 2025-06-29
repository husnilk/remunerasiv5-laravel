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
        Schema::create('kinerja_tanggapans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kinerja_id')->constrained('kinerjas');
            $table->foreignId('from')->constrained('users');
            $table->foreignId('to')->constrained('users');
            $table->integer('aktifititas')->default(0);
            $table->integer('anonymous')->default(1);
            $table->text('message')->nullable();
            $table->integer('read')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kinerja_tanggapans');
    }
};
