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
            $table->enum('status_rw', ['approved', 'rejected', 'pending'])->default('pending');
            $table->enum('status_rt', ['approved', 'rejected', 'pending'])->default('pending');
            $table->string('status_approval')->nullable();
            $table->date('tanggal_approval_rt')->nullable();
            $table->date('tanggal_approval_rw')->nullable();
            $table->timestamps();

            // Foreign key references
            $table->foreign('id_pengajuan_surat')->references('id_pengajuan_surat')->on('pengajuan_surat')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('approval_surat');
    }
};
