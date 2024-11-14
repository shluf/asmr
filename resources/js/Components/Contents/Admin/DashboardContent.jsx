import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import renderIcon from "@/utility/renderIcon";
import { UserFilled } from "@/utility/svg-icons";
import { Skeleton } from "@/Components/ui/skeleton";
import { Card, CardContent } from "@/Components/ui/card";

const DashboardContent = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [wargaStats, setWargaStats] = useState([
        { label: "Populasi Warga", value: 0 },
        { label: "Total Pengajuan", value: 0 },
        { label: "Total Pengajuan Dalam Proses", value: 0 },
        { label: "Total Pengajuan Menunggu Tindakan", value: 0 },
    ]);
    const fetchWargaStats = async () => {
        try {
            const response = await axios.get("/CountUser");
            setWargaStats([
                {
                    label: "Populasi Warga",
                    value: response.data.CountWarga,
                },
                {
                    label: "Total Pengajuan Surat",
                    value: response.data.CountPengajuanSurat,
                },
                {
                    label: "Total Pengajuan Dalam Proses",
                    value: response.data.CountDataPengajuanPending,
                },
                {
                    label: "Total Pengajuan Menunggu Tindakan",
                    value: response.data.CountDataPengajuanSelesai,
                },
            ]);
        } catch (error) {
            console.error("Error fetching warga stats:", error);
        }
    };

    const [RtRwStats, setRtRwStats] = useState([
        { label: "Populasi Staff", value: 0 },
        { label: "Total Pengajuan Surat", value: 0 },
        { label: "Total Pengajuan Dalam Proses", value: 0 },
        { label: "Total Pengajuan Menunggu Tindakan", value: 0 },
    ]);
    const fetchRtRwStats = async () => {
        try {
            const response = await axios.get("/CountUser");
            setRtRwStats([
                {
                    label: "Populasi staff ",
                    value: response.data.CountRtDanRw,
                },
                {
                    label: "Total Pengajuan Surat",
                    value: response.data.CountPengajuanSurat,
                },
                {
                    label: "Total Pengajuan Dalam Proses",
                    value: response.data.CountDataPengajuanPending,
                },
                {
                    label: "Total Pengajuan Menunggu Tindakan",
                    value: response.data.CountDataPengajuanSelesai,
                },
            ]);
        } catch (error) {
            console.error("Error fetching warga stats:", error);
        }
    };
    const [dataWarga, setDataWarga] = useState([]);

    useEffect(() => {
        fetchData();
        fetchWargaStats();
        fetchRtRwStats();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(route("biodataUser"));
            setDataWarga(response.data.warga);
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full h-full">
                <div className="container mx-auto p-6 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
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
                                <Link href="dashboard/biodataUser">
                                    BIODATA WARGA
                                </Link>
                            </div>
                        </div>

                        {/* Kartu Data Anggota RT/RW */}
                        <div className="border-2 border-blue-3 rounded-[10px]  shadow-lg">
                            <h2 className="text-lg font-bold text-blue-5 text-start border-b border-blue-3 p-4">
                                Data Anggota RT/RW
                            </h2>
                            <ul>
                                {RtRwStats.map((stat, index) => (
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
                                <Link href="dashboard/biodataUser">
                                    BIODATA RT/RW
                                </Link>
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
                        {isLoading ? 
                            <>
                            {[...Array(2)].map((_, index) => (
                                <Card key={index}>
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex flex-col h-full justify-between"
                                                    >
                                                        <Skeleton className="h-4 w-24 mb-2" />
                                                        <Skeleton className="h-4 w-32" />
                                                    </div>
                                                ))}
                                            </div>
                                            <Skeleton className="h-10 w-52 rounded-full" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                        : dataWarga.map((warga, index) => (
                            <div
                                key={index}
                                className="overflow-x-scroll flex items-center justify-between border gap-8 border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                            >
                                <div className="flex flex-row gap-10 justify-around items-center">
                                    <div className="w-12 h-12 bg-green-3 rounded-[12px] flex items-center justify-center text-2xl">
                                        <UserFilled size={6} />
                                    </div>
                                </div>
                                <div className="flex gap-4 justify-between w-full">
                                    <div className="flex flex-col items-start">
                                        <span className="font-semibold text-gray-700">
                                            Nama
                                        </span>
                                        <span className="text-gray-900">
                                            {warga.nama}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-700">
                                            NIK
                                        </span>
                                        <span className="text-gray-900">
                                            {warga.nik_warga}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-700">
                                            RT
                                        </span>
                                        <span className="text-blue-600">
                                            {warga.id_rt}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-700">
                                            RW
                                        </span>
                                        <span className="text-blue-600">
                                            {warga.id_rw}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-700">
                                            Status
                                        </span>
                                        <span className="text-orange-500">
                                            {warga.approved === 1
                                                ? "Approved"
                                                : "Not Approved"}
                                        </span>
                                    </div>
                                </div>
                                {/* Action Button */}
                                <div className="flex">
                                    <Link
                                        href={route("dashboard", {
                                            page: "approvalRole",
                                        })}
                                        className="border border-blue-500 text-blue-500 md:px-32 py-2 text-nowrap rounded-full hover:bg-blue-500 hover:text-white transition"
                                    >
                                        Lihat data
                                    </Link>
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
