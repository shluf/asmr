<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{public function up()
    {
        Schema::create('approval_surat', function (Blueprint $table) {
            $table->id('id_approval_surat');
            $table->unsignedBigInteger('id_pengajuan_surat');
            $table->unsignedBigInteger('id_rt');
            $table->unsignedBigInteger('id_rw');
            $table->string('status_approval');
            $table->date('tanggal_approval_rt')->nullable();
            $table->date('tanggal_approval')->nullable();
            $table->timestamps();

            // Foreign key references
            $table->foreign('id_pengajuan_surat')->references('id_pengajuan_surat')->on('pengajuan_surat')->onDelete('cascade');
            $table->foreign('id_rt')->references('id_rt')->on('rt')->onDelete('cascade');
            $table->foreign('id_rw')->references('id_rw')->on('rw')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('approval_surat');
    }
};
