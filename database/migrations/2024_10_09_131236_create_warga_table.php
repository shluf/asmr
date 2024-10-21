<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('warga', function (Blueprint $table) {
            $table->string('nik_warga')->primary();
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->unsignedBigInteger('id_rt');
            $table->unsignedBigInteger('id_rw');
            $table->string('nama');
            $table->string('nomer_kk');
            $table->string('jenis_kelamin');
            $table->string('phone');
            $table->string('tempat_dan_tanggal_lahir');
            $table->string('alamat');
            $table->string('kabupaten');
            $table->string('provinsi');
            $table->string('agama');
            $table->boolean('is_activated')->default(false);
            $table->timestamps();

            // Set up foreign keys
            $table->foreign('id_rt')->references('id_rt')->on('rt')->onDelete('cascade');
            $table->foreign('id_rw')->references('id_rw')->on('rw')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('warga');
    }
};
