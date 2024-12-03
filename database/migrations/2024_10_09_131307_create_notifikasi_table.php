<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('notifikasi', function (Blueprint $table) {
            $table->id('id_notifikasi');
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->unsignedBigInteger('id_pengajuan_surat')->nullable();
            $table->unsignedBigInteger('id_program_kerja')->nullable();
            $table->text('pesan');
            $table->enum('jenis_notif',['surat','proker','lainya']);
            $table->timestamps();

            $table->foreign('id_pengajuan_surat')->references('id_pengajuan_surat')->on('pengajuan_surat')->onDelete('cascade');
            $table->foreign('id_program_kerja')->references('id_program_kerja')->on('program_kerja')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifikasi');
    }
};
