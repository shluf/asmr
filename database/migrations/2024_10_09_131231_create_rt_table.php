<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rt', function (Blueprint $table) {
            $table->id('id_rt');
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->unsignedBigInteger('id_rw');
            $table->string('nama');
            $table->string('nik');
            $table->string('periode');
            $table->string('penanggung_jawab_rt');
            $table->timestamps();

            // Foreign key to RW
            $table->foreign('id_rw')->references('id_rw')->on('rw')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('rt');
    }
};
