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
        Schema::create('rubrik_kategoris', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('kode');
            $table->foreignId('rubrik_remun_id')->constrained('rubrik_remuns')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rubrik_kategoris');
    }
};
