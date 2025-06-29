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
        Schema::create('kegiatans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('periode_id')->constrained('periodes');
            $table->foreignId('rubrik_id')->constrained('rubriks');
            $table->foreignId('unit_id')->constrained('units');
            $table->string('nama');
            $table->integer('tipe_form')->default(1);
            $table->string('file_penugasan')->nullable();
            $table->string('link_penugasan')->nullable();
            $table->string('no_dokumen_penugasan')->nullable();
            $table->integer('kinerja_bersama')->default(1);
            $table->string('file_kinerja')->nullable();
            $table->string('linke_kinerja')->nullable();
            $table->string('no_dokumen_kinerja')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->foreignId('verified_by')->nullable()->constrained('users');
            $table->foreignId('validated_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kegiatans');
    }
};
