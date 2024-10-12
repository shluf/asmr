import React, { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage = ({ auth }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 25,
        });
      }, []);

    useEffect(() => {

        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrolled]);


    return (
        <>
            <Head title="Home" />
            <main className="bg-gray-100 font-sans">
                <nav
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
            ${
                scrolled
                    ? "bg-white bg-opacity-50 backdrop-blur shadow-md mt-4 mx-4 rounded-lg"
                    : " "
            }`}
                >
                    <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                        <a
                            href="#"
                            className="text-2xl font-bold text-gray-800"
                        >
                            <img
                                src="/logo.svg"
                                alt="Logo"
                                className="h-8 inline-block mr-2"
                            />
                        </a>
                        <div className="hidden md:block">
                            <a
                                href="#"
                                className="text-gray-800 hover:text-green"
                            >
                                Beranda
                            </a>
                            <span className="mx-4 text-green">⋮</span>
                            <a
                                href="#tentang"
                                className="text-gray-800 hover:text-green"
                            >
                                Tentang
                            </a>
                            <span className="mx-4 text-green">⋮</span>
                            <a
                                href="#cara-kerja"
                                className="text-gray-800 hover:text-green"
                            >
                                Cara Kerja
                            </a>
                            <span className="mx-4 text-green">⋮</span>
                            <a
                                href="#kritik-saran"
                                className="text-gray-800 hover:text-green"
                            >
                                Kritik Saran
                            </a>
                        </div>
                        <div className="flex">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("register")}
                                        className="rounded-md px-3 py-2 bg-yellow hover:bg-yellow-2 text-white font-medium mr-2 ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Registrasi
                                    </Link>
                                    <Link
                                        href={route("login")}
                                        className="rounded-md px-3 py-2 bg-green hover:bg-green-2 text-white font-medium ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Masuk
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <div className="flex flex-col">
                <section className="relative bg-gray-100 py-16 h-screen box-border">
                    <div className="absolute inset-0 flex justify-center z-0">
                        <img
                            className="object-cover w-full h-full"
                            src="/img/bg_land_overlay.png"
                            alt="overlay"
                        />
                    </div>
                    <div className="container mx-auto px-4 h-full z-10 relative">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 h-full">
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="flex flex-col justify-center items-center">
                                    <h2 className="text-l md:text-xl font-bold text-gray-500 text-start w-full leading-tight">
                                        Portal Surat Menyurat
                                    </h2>
                                    <h1 className="text-4xl md:text-5xl font-black text-gray-800 text-center leading-tight">
                                        Pengajuan Masalah
                                        <br />
                                        RT & RW
                                    </h1>
                                </div>
                                <div className="mt-8 flex items-center justify-around p-4 shadow-md rounded-lg bg-white">
                                    {auth.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="rounded-md px-3 py-2 bg-yellow hover:bg-yellow-2 text-white font-medium mr-2 ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
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
                                                href={route("register")}
                                                className="rounded-md px-3 py-2 bg-yellow hover:bg-yellow-2 text-white font-medium mr-2 ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
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
                                                href={route("login")}
                                                className="rounded-md px-3 py-2 bg-green hover:bg-green-2 text-white font-medium ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Masuk
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="tentang"
                    className="relative bg-white py-16 h-full md:h-screen flex justify-center items-center w-full"
                >
                    <div className="container md:mx-auto md:px-4 flex justify-center items-center h-full">
                        <div className="flex flex-col-reverse gap-8 md:grid md:grid-cols-2">
                            <div className="flex flex-col justify-center items-start md:px-0 px-6">
                                <h1 data-aos="fade-up" className="text-m md:text-l font-bold text-gray-800 leading-tight relative flex items-center">
                                    <span className="absolute -left-[50px] block bg-gray-800 h-[2px] w-10 mr-2"></span>
                                    Tentang Kami
                                </h1>
                                <h2 data-aos="fade-right" data-aos-delay="750" className="mt-8 text-xl md:text-[2rem] font-bold text-gray-800 leading-tight">
                                    Solusi Praktis dan Cepat untuk Administrasi
                                    Surat Menyurat
                                </h2>
                                <p data-aos="fade-right" data-aos-delay="750" className="text-gray-600 mt-4">
                                    Selamat datang di portal resmi RT/RW kami,
                                    tempat Anda dapat mengurus berbagai
                                    keperluan administrasi surat menyurat dengan
                                    mudah dan efisien.
                                    <br />
                                    <br />
                                    Website ini dirancang untuk memudahkan warga
                                    dalam mendapatkan informasi, mengajukan
                                    permohonan surat, serta berkomunikasi dengan
                                    pengurus RT/RW secara online. Kami
                                    berkomitmen untuk memberikan layanan yang
                                    transparan, cepat, dan terpercaya bagi
                                    seluruh warga.
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <img
                                    src="/img/hero.png"
                                    alt="Hero Image"
                                    className="rounded-lg shadow-lg md:w-auto w-full h-[480px]"
                                    data-aos="zoom-in-left"
                                    data-aos-delay="750"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="cara-kerja"
                    className="bg-white py-16 h-full md:h-screen flex justify-center items-center box-border"
                >
                    <div className="container mx-auto px-4">
                        <h3 data-aos="fade-down-right" className="text-l text-center font-bold leading-tight text-green">
                            Bagaimana cara kerjanya?
                        </h3>
                        <h2 data-aos="flip-up" data-aos-delay="750" className="text-3xl text-center font-bold text-gray-800 leading-tight">
                            Langkah - langkah pengajuan masalah
                        </h2>
                        <div className="flex flex-col md:flex-row items-strech justify-center gap-8 mt-8 h-full">
                            <div data-aos="flip-left" data-aos-delay="250" className="flex justify-center items-center flex-col border border-gray-300 rounded-lg p-6 shadow-md w-full md:w-64">
                                <div className="flex justify-center items-center bg-[#FAEFCF] rounded-full h-12 w-12">
                                    <img
                                        src="/img/person.svg"
                                        alt="Icon 1"
                                        className="h-8 w-8"
                                    />
                                </div>
                                <h3 className="mt-10 text-lg font-bold text-center text-gray-800 leading-tight">
                                    Registrasi akun
                                </h3>
                                <p className="text-sm text-gray-600 mt-2 text-center">
                                    Buat akun untuk akses cepat ke layanan surat
                                    menyurat dan informasi RT/RW. Registrasi
                                    hanya butuh beberapa langkah sederhana.
                                </p>
                            </div>

                            <div className="flex justify-center items-center ">
                            <img
                                data-aos="zoom-in-right"
                                data-aos-delay="250"
                                src="/img/arrow.svg"
                                alt="Arrow Icon"
                                className="h-4 w-4 md:block hidden"
                            />
                            <img
                                data-aos="zoom-in"
                                data-aos-delay="250"
                                src="/img/arrow_down.svg"
                                alt="Arrow Icon"
                                className="block h-4 w-4 md:hidden"
                            />
                            </div>

                            <div data-aos="flip-left" data-aos-delay="500" className="flex justify-center items-center flex-col border border-gray-300 rounded-lg p-6 shadow-md w-full md:w-64">
                                <div className="flex justify-center items-center bg-[#CEFEF5] rounded-full h-12 w-12">
                                    <img
                                        src="/img/icon2.svg"
                                        alt="Icon 2"
                                        className="h-8 w-8"
                                    />
                                </div>
                                <h3 className="mt-10 text-lg font-bold text-center text-gray-800 leading-tight">
                                    Verifikasi akun
                                </h3>
                                <p className="text-sm text-gray-600 mt-2 text-center">
                                    Cek email untuk verifikasi dan aktifkan akun
                                    Anda agar bisa segera menggunakan semua
                                    layanan kami.
                                </p>
                            </div>

                            <div className="flex justify-center items-center ">
                            <img
                                data-aos="zoom-in-right"
                                data-aos-delay="500"
                                src="/img/arrow.svg"
                                alt="Arrow Icon"
                                className="h-4 w-4 md:block hidden"
                            />
                            <img
                                data-aos="zoom-in"
                                data-aos-delay="500"
                                src="/img/arrow_down.svg"
                                alt="Arrow Icon"
                                className="block h-4 w-4 md:hidden"
                            />
                            </div>

                            <div data-aos="flip-left" data-aos-delay="1000" className="flex justify-center items-center flex-col border border-gray-300 rounded-lg p-6 shadow-md w-full md:w-64">
                                <div className="flex justify-center items-center bg-[#EBDDFD] rounded-full h-12 w-12">
                                    <img
                                        src="/img/icon2.svg"
                                        alt="Icon 3"
                                        className="h-8 w-8"
                                    />
                                </div>
                                <h3 className="mt-10 text-lg font-bold text-center text-gray-800 leading-tight">
                                    Pengajuan masalah
                                </h3>
                                <p className="text-sm text-gray-600 mt-2 text-center">
                                    Laporkan masalah Anda melalui formulir
                                    online, dan kami akan segera
                                    menindaklanjutinya. Prosesnya cepat dan
                                    transparan.
                                </p>
                            </div>

                            <div className="flex justify-center items-center ">
                            <img
                                data-aos="zoom-in-right"
                                data-aos-delay="1000"
                                src="/img/arrow.svg"
                                alt="Arrow Icon"
                                className="h-4 w-4 md:block hidden"
                            />
                            <img
                                data-aos="zoom-in"
                                data-aos-delay="1000"
                                src="/img/arrow_down.svg"
                                alt="Arrow Icon"
                                className="block h-4 w-4 md:hidden"
                            />
                            </div>

                            <div data-aos="flip-left" data-aos-delay="1500" className="flex justify-center items-center flex-col border border-gray-300 rounded-lg p-6 shadow-md w-full md:w-64">
                                <div className="flex justify-center items-center bg-[#EBDDFD] rounded-full h-12 w-12">
                                    <img
                                        src="/img/icon2.svg"
                                        alt="Icon 4"
                                        className="h-8 w-8"
                                    />
                                </div>
                                <h3 className="mt-10 text-lg font-bold text-center text-gray-800 leading-tight">
                                    Masalah diproses
                                </h3>
                                <p className="text-sm text-gray-600 mt-2 text-center">
                                    Masalah Anda sedang kami tangani. Anda akan
                                    menerima update selanjutnya melalui email
                                    atau bisa memeriksanya langsung di website
                                    ini.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="kritik-saran" className="bg-white py-16 h-full md:h-screen box-border">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="p-8">
                                <h2 data-aos="fade-right" className="text-2xl font-bold mb-4">
                                    Adakah saran & kritik untuk kami?
                                </h2>
                                <p data-aos="fade-right" data-aos-delay="300" className="mb-6">
                                    Kami menghargai setiap masukan yang Anda
                                    berikan. Saran dan kritik Anda membantu kami
                                    untuk terus meningkatkan layanan demi
                                    kepuasan bersama.
                                </p>
                                <form data-aos="flip-right" data-aos-delay="750" action="mailto:example@example.com" method="post" encType="text/plain">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="firstName"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                defaultValue="John"
                                                className="mt-1 focus:ring-green focus:border-green block w-full shadow-sm sm:text-sm border-gray-300 rounded border-0 border-b-2"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="lastName"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                defaultValue="Doe"
                                                className="mt-1 focus:ring-green focus:border-green block w-full shadow-sm sm:text-sm border-gray-300 rounded border-0 border-b-2"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                defaultValue="johndoe@gmail.com"
                                                className="mt-1 focus:ring-green focus:border-green block w-full shadow-sm sm:text-sm border-gray-300 rounded border-0 border-b-2"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label
                                                htmlFor="subject"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                id="subject"
                                                className="mt-1 focus:ring-green focus:border-green block w-full shadow-sm sm:text-sm border-gray-300 rounded border-0 border-b-2"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label
                                                htmlFor="message"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows="3"
                                                className="mt-1 focus:ring-green focus:border-green block w-full shadow-sm sm:text-sm border-gray-300 rounded border-b-2"
                                                placeholder="Type your Message"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            className="bg-yellow hover:bg-yellow-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Kirimkan pesan
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div data-aos="fade-left" data-aos-delay="1000" className="md:block hidden">
                                <img src="/img/saran.png" alt="Hero Image" />
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="bg-[#434A54]">
                    <div className="bg-[url('/img/footer.png')] bg-cover py-10">
                        <div className="container mx-auto px-4 text-white">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div>
                                    <h3 className="text-2xl font-bold leading-tight">
                                        Layanan Surat Menyurat di Ujung Jari
                                        Anda, Bersama Kami!
                                    </h3>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold leading-tight">
                                        Alamat
                                    </h3>
                                    <p className="text-sm mt-2">
                                        1080 Brickell Ave
                                    </p>
                                    <p className="text-sm mt-2">
                                        Miami - Florida
                                    </p>
                                    <p className="text-sm mt-2">
                                        U.S. of America
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold leading-tight">
                                        Hubungi Kami
                                    </h3>
                                    <p className="text-sm mt-2 bg-green p-4 rounded-md">
                                        info@travel.comt
                                    </p>
                                    <p className="text-md font-bold mt-2">
                                        + 01 483 593 284
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                </div>
            </main>
        </>
    );
};

export default LandingPage;
