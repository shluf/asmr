// import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children, button, title }) {

    return (
        <section className="relative bg-gray-100 overflow-hidden">
            <div className="absolute inset-0 flex justify-center z-0">
                <img
                    className="object-cover w-full h-full"
                    src="/img/bg_land_overlay.png"
                    alt="overlay"
                />
            </div>

            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-white bg-opacity-50 backdrop-blur shadow-md mt-4 mx-4 rounded-lg">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <a href="#" className="text-2xl font-bold text-gray-800">
                        <img
                            src="/logo.svg"
                            alt="Logo"
                            className="h-8 inline-block mr-2"
                        />
                    </a>
                    <div className="hidden md:block">
                        <a href="/#" className="text-gray-800 hover:text-green">
                            Beranda
                        </a>
                        <span className="mx-4 text-green">⋮</span>
                        <a
                            href="/#tentang"
                            className="text-gray-800 hover:text-green"
                        >
                            Tentang
                        </a>
                        <span className="mx-4 text-green">⋮</span>
                        <a
                            href="/#cara-kerja"
                            className="text-gray-800 hover:text-green"
                        >
                            Cara Kerja
                        </a>
                        <span className="mx-4 text-green">⋮</span>
                        <a
                            href="/#kritik-saran"
                            className="text-gray-800 hover:text-green"
                        >
                            Kritik Saran
                        </a>
                    </div>
                    <div className="flex">
                        {button == "all" ? (
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
                        ) : button == "register" ? (
                            <>
                                <Link
                                    href={route("register")}
                                    className="rounded-md px-3 py-2 bg-yellow hover:bg-yellow-2 text-white font-medium mr-2 ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Registrasi
                                </Link>
                            </>
                        ) : (
                            <Link
                                href={route("login")}
                                className="rounded-md px-3 py-2 bg-green hover:bg-green-2 text-white font-medium ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Masuk
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <div className="flex relative z-10 min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
                {/* <div>
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div> */}
                <div>
                    <h1 className="font-bold text-4xl">{title}</h1>
                </div>

                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </section>
    );
}
