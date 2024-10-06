<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Aplikasi Surat Menyurat RT/RW

Aplikasi Surat Menyurat RT/RW ini dirancang untuk memfasilitasi proses administrasi di lingkungan RT/RW dengan menyediakan platform yang memungkinkan warga mengajukan surat secara online, serta memudahkan RT/RW dalam proses persetujuan. <br><br>
Warga yang telah memiliki akun juga dapat melihat program kerja yang sudah, sedang, dan akan dilakukan oleh RW sehingga terdapat transparasi jabatan. Dengan sistem ini, seluruh proses dapat dilakukan secara online, mulai dari pengajuan, verifikasi, hingga penyimpanan dokumen, yang dapat diakses kapan saja dan di mana saja.


## Instalasi Aplikasi Surat Menyurat RT/RW

### Prasyarat
* **PHP:** Pastikan PHP versi 8.0 atau lebih tinggi sudah terinstal.
* **Composer:** Pastikan Composer sudah terinstal secara global.

### Langkah 1: Clone Proyek Laravel
```bash
git clone https://github.com/shluf/asmr.git
```

### Langkah 2: Masuk ke Direktori Proyek
```bash
cd asmr
```

### Langkah 3: Instal Dependensi
```bash
composer install
```

### Langkah 4: Konfigurasi Environment
1. Ubah nama file `.env.example` menjadi `.env`.
2. Sesuaikan pengaturan database pada file `.env`.

### Langkah 5: Generate Key Aplikasi
```bash
php artisan key:generate
```

### Langkah 6: Migrate database
Mulai database server kemudian jalan perintah berikut 
```bash
php artisan migrate
```

### Langkah 7: Konfigurasi Vite
1. Jalankan perintah berikut 
```bash
npm i 
```
2. Kemudian jalankan perintah berikut
```bash
npm run dev
```
3. Buka terminal baru dan jalankan perintah 
```bash
npm run build
```
4. Perintah `npm run dev` dapat ditutup

### Langkah 8: Jalankan Aplikasi
```bash
php artisan serve
```






## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).