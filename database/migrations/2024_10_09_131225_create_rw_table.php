<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rw', function (Blueprint $table) {
            $table->id('id_rw');
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->string('nama');
            $table->string('nik');
            $table->string('periode');
            $table->string('penanggung_jawab_rw');
            $table->string('alamat');
            $table->string('ttd')->default('');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rw');
    }
};
