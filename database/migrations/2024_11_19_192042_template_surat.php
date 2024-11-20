<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('template_surat', function (Blueprint $table) {
            $table->id();
            $table->string('jenis_surat');
            $table->longText('template_html');
            $table->timestamps();
        });

        Schema::table('pengajuan_surat', function (Blueprint $table) {
            $table->string('pdf_path')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('template_surat');
        
        Schema::table('pengajuan_surat', function (Blueprint $table) {
            $table->dropColumn('pdf_path');
        });
    }
};