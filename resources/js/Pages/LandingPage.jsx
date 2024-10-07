import React from "react";
import { Head, Link } from "@inertiajs/react";

const LandingPage = ({ auth }) => {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
      <>
        <Head title="Home" />
        <body className="bg-gray-100 font-sans">
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <a href="#" className="text-2xl font-bold text-gray-800">
                        <img
                            src="/logo.svg"
                            alt="Logo"
                            className="h-8 inline-block mr-2"
                        />
                    </a>
                    <div>
                        <a
                            href="#"
                            className="text-gray-800 hover:text-green-500 mr-4"
                        >
                            Beranda
                        </a>
                        <a
                            href="#tentang"
                            className="text-gray-800 hover:text-green-500 mr-4"
                        >
                            Tentang
                        </a>
                        <a
                            href="#cara-kerja"
                            className="text-gray-800 hover:text-green-500 mr-4"
                        >
                            Cara Kerja
                        </a>
                        <a
                            href="#kritik-saran"
                            className="text-gray-800 hover:text-green-500 mr-4"
                        >
                            Kritik Saran
                        </a>
                        <a href="#" className="text-gray-800 hover:text-green-500">
                            Bantuan
                        </a>
                    </div>
                    <div className="flex">
                    {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold mr-2 ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                            Registrasi
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-bold ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Masuk
                                        </Link>
                                    </>
                                )}
                    </div>
                </div>
            </nav>

            <section className="relative bg-gray-100 py-16 h-[100vh]">
                <div className="container mx-auto px-4 h-full">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-8 h-full">
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="flex flex-col justify-center items-center">
                                <h2 className="text-l md:text-xl font-bold text-gray-500 text-start w-full leading-tight">
                                    Portal Surat Menyurat
                                </h2>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center leading-tight">
                                    Pengajuan Masalah
                                    <br />
                                    RT & RW
                                </h1>
                            </div>
                            <div className="mt-8 flex items-center justify-around p-4 shadow-md rounded-lg bg-white">
                                    {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                  <div className="flex items-center justify-center">
                                    <div className="hidden md:flex flex-col items-center justify-center mr-4">
                                        <p className="text-gray-800 font-bold text-center">
                                            Belum memiliki akun?
                                        </p>
                                        <p className="text-gray-600 text-center">
                                            Insert keyword
                                        </p>
                                    </div>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold mr-2 ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                            Registrasi
                                        </Link>
                                        <div className="hidden md:flex flex-col items-center justify-center mr-4">
                                        <p className="text-gray-800 font-bold text-center">
                                            Sudah memiliki akun?
                                        </p>
                                        <p className="text-gray-600 text-center">
                                            All Typologies
                                        </p>
                                    </div>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-bold ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Masuk
                                        </Link>
                                  </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="tentang" className="relative bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-m md:text-l font-bold text-gray-800 leading-tight">
                                Tentang Kami
                            </h1>
                            <h2 className="text-xl md:text-xl font-bold text-gray-800 leading-tight">
                                Solusi Praktis dan Cepat untuk Administrasi
                                Surat Menyurat
                            </h2>
                            <p className="text-gray-600 mt-4">
                                Selamat datang di portal resmi RT/RW kami,
                                tempat Anda dapat mengurus berbagai keperluan
                                administrasi surat menyurat dengan mudah dan
                                efisien.
                                <br />
                                Website ini dirancang untuk memudahkan warga
                                dalam mendapatkan informasi, mengajukan
                                permohonan surat, serta berkomunikasi dengan
                                pengurus RT/RW secara online. Kami berkomitmen
                                untuk memberikan layanan yang transparan, cepat,
                                dan terpercaya bagi seluruh warga.
                            </p>
                        </div>
                        <div>
                            <img
                                src="/img/hero.png"
                                alt="Hero Image"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section id="cara-kerja" className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h3 className="text-l text-center font-bold leading-tight text-green-500">
                        Bagaimana cara kerjanya?
                    </h3>
                    <h2 className="text-3xl text-center font-bold text-gray-800 leading-tight">
                        Langkah - langkah pengajuan masalah
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
                        <div>
                            <img
                                src="icon1.svg"
                                alt="Icon 1"
                                className="h-8 w-8 inline-block mr-2"
                            />
                            <h3 className="text-lg font-bold text-center text-gray-800 leading-tight">
                                Registrasi akun
                            </h3>
                            <p className="text-gray-600 mt-2 text-center">
                                Buat akun untuk akses cepat ke layanan surat
                                menyurat dan informasi RT/RW. Registrasi hanya
                                butuh beberapa langkah sederhana.
                            </p>
                        </div>
                        <div>
                            <img
                                src="icon2.svg"
                                alt="Icon 2"
                                className="h-8 w-8 inline-block mr-2"
                            />
                            <h3 className="text-lg font-bold text-center text-gray-800 leading-tight">
                                Verifikasi akun
                            </h3>
                            <p className="text-gray-600 mt-2 text-center">
                                Cek email untuk verifikasi dan aktifkan akun
                                Anda agar bisa segera menggunakan semua layanan
                                kami.
                            </p>
                        </div>
                        <div>
                            <img
                                src="icon3.svg"
                                alt="Icon 3"
                                className="h-8 w-8 inline-block mr-2"
                            />
                            <h3 className="text-lg font-bold text-center text-gray-800 leading-tight">
                                Pengajuan masalah
                            </h3>
                            <p className="text-gray-600 mt-2 text-center">
                                Laporkan masalah Anda melalui formulir online,
                                dan kami akan segera menindaklanjutinya.
                                Prosesnya cepat dan transparan.
                            </p>
                        </div>
                        <div>
                            <img
                                src="icon3.svg"
                                alt="Icon 3"
                                className="h-8 w-8 inline-block mr-2"
                            />
                            <h3 className="text-lg font-bold text-center text-gray-800 leading-tight">
                                Masalah diproses
                            </h3>
                            <p className="text-gray-600 mt-2 text-center">
                                Masalah Anda sedang kami tangani. Anda akan
                                menerima update selanjutnya melalui email atau
                                bisa memeriksanya langsung di website ini.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="kritik-saran" className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-4">
                                Adakah saran & kritik untuk kami?
                            </h2>
                            <p className="mb-6">
                                Kami menghargai setiap masukan yang Anda
                                berikan. Saran dan kritik Anda membantu kami
                                untuk terus meningkatkan layanan demi kepuasan
                                bersama.
                            </p>
                            <form>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            for="firstName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            value="John"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border-b-2"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="lastName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            value="Doe"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border-b-2"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            for="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value="johndoe@gmail.com"
                                            className="mt-1 focus:border-b-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border-b-2"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            for="subject"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            id="subject"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border-b-2"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            for="message"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="3"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border-b-2"
                                            placeholder="Type your Message"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Kirimkan pesan
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div>
                        <img
                                src="/img/saran.png"
                                alt="Hero Image"
                                // className="rounded-lg shadow-lg"
                            />
                            {/* <img src="/img/footer.png" alt="Testimonial 2" className="h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.06)] "/> */}
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-[url('/img/footer.png')] bg-cover py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 leading-tight">
                                Layanan Surat Menyurat di Ujung Jari Anda,
                                Bersama Kami!
                            </h3>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 leading-tight">
                                Alamat
                            </h3>
                            <p className="text-gray-600 mt-2">1080 Brickell Ave</p>
                            <p className="text-gray-600 mt-2">Miami - Florida</p>
                            <p className="text-gray-600 mt-2">U.S. of America</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 leading-tight">
                                Hubungi Kami
                            </h3>
                            <p className="text-gray-600 mt-2 bg-green-500 p-4 rounded-md">
                                info@travel.comt
                            </p>
                            <p className="text-gray-600 font-bold mt-2">
                                + 01 483 593 284
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </body>
      </>
    );
};

export default LandingPage;
