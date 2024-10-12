<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('program_kerja', function (Blueprint $table) {
            $table->id('id_program_kerja');
            $table->unsignedBigInteger('id_rw');
            $table->foreign('id_rw')->references('id_rw')->on('rw')->onDelete('cascade');
            $table->string('jenis_kegiatan');
            $table->date('tanggal');
            $table->string('tempat');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('program_kerja');
    }
};
