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
        Schema::create('rubrik_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rubrik_id')->constrained('rubriks')->cascadeOnDelete();
            $table->string('jabatan')->nullable();
            $table->double('poin')->default(0);
            $table->integer('fixed_poin')->default(1);
            $table->integer('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rubrik_details');
    }
};
