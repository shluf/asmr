<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pengajuan_surat', function (Blueprint $table) {
            $table->id('id_pengajuan_surat');
            $table->string('nik_warga');
            $table->unsignedBigInteger('id_rt');
            $table->unsignedBigInteger('id_rw');
            $table->string('jenis_surat');
            $table->string('status_pengajuan');
            $table->text('deskripsi');
            $table->timestamps();

            // Foreign keys for RT and RW
            $table->foreign('id_rt')->references('id_rt')->on('rt')->onDelete('cascade');
            $table->foreign('id_rw')->references('id_rw')->on('rw')->onDelete('cascade');
            $table->foreign('nik_warga')->references('nik_warga')->on('warga')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('pengajuan_surat');
    }
};
