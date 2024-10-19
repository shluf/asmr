import React from "react";
import { Link } from "@inertiajs/react";

const DashboardContent = () => {
    const wargaStats = [
        { label: "Populasi Warga", value: 36 },
        { label: "Total Pengaduan", value: 30 },
        { label: "Total Pengaduan Dalam Proses", value: 10 },
        { label: "Total Pengaduan Menunggu Tindakan", value: 5 },
    ];

    const rtRwStats = [
        { label: "Populasi Staff", value: 8 },
        { label: "Total Pengaduan Selesai", value: 15 },
        { label: "Total Pengaduan Dalam Proses", value: 10 },
        { label: "Total Pengaduan Menunggu Tindakan", value: 5 },
    ];

    const approvals = [
        {
            name: "Agus Waluyo",
            nik: "330222299900",
            rt: "007",
            rw: "008",
            status: "Pending",
        },
        {
            name: "Ahmad Budiman",
            nik: "330399111222",
            rt: "007",
            rw: "008",
            status: "Pending",
        },
    ];

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full h-full">
                <div className="container mx-auto p-6 ">
                    <div className="grid grid-cols-2 gap-10 mb-8">
                        {/* Kartu Data Warga */}
                        <div className="border-2 border-blue-3 rounded-[10px]  shadow-lg">
                            <h2 className="text-lg font-bold text-blue-5 text-start border-b border-blue-3 p-4">
                                Data Warga
                            </h2>
                            <ul>
                                {wargaStats.map((stat, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between py-1 border-b text-blue-4 border-blue-3 p-4 mt-5   mb-5"
                                    >
                                        <span>{stat.label}</span>
                                        <span>{stat.value}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 w-full text-2xl text-start mb-4 p-5">
                                <Link>BIODATA WARGA</Link>
                            </div>
                        </div>

                        {/* Kartu Data Anggota RT/RW */}
                        <div className="border-2 border-blue-3 rounded-[10px]  shadow-lg">
                            <h2 className="text-lg font-bold text-blue-5 text-start border-b border-blue-3 p-4">
                                Data Anggota RT/RW
                            </h2>
                            <ul>
                                {rtRwStats.map((stat, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between py-1 border-b text-blue-4 border-blue-3 p-4 mt-5   mb-5"
                                    >
                                        <span>{stat.label}</span>
                                        <span>{stat.value}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 w-full text-2xl text-start mb- p-5">
                                <Link>BIODATA RT/RW</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto p-6">
                <div className="border rounded-lg p-4 shadow-lg">
                    <h2 className="text-lg font-bold mb-4">
                        Approval warga pending
                    </h2>
                    <div className="space-y-4">
                        {approvals.map((approval, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between border gap-8 border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                            >
                                <div className="flex flex-row gap-10 justify-around items-center">
                                    {/* Icon */}
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                                        {approval.icon}
                                    </div>
                                </div>
                                    <div className="flex gap-4 justify-between w-full">
                                        <div className="flex flex-col items-start">
                                            <span className="font-semibold text-gray-700">
                                                Nama
                                            </span>
                                            <span className="text-gray-900">
                                                {approval.name}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-700">
                                                NIK
                                            </span>
                                            <span className="text-gray-900">
                                                {approval.nik}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-700">
                                                RT
                                            </span>
                                            <span className="text-blue-600">
                                                {approval.rt}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-700">
                                                RW
                                            </span>
                                            <span className="text-blue-600">
                                                {approval.rw}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-700">
                                                Status
                                            </span>
                                            <span className="text-orange-500">
                                                {approval.status}
                                            </span>
                                        </div>
                                    </div>
                                {/* Action Button */}
                                <div className="flex">
                                <button className="border border-blue-500 text-blue-500 md:px-32 py-2 text-nowrap rounded-full hover:bg-blue-500 hover:text-white transition">
                                    Lihat data
                                </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
