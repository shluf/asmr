import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { UserFilled } from "@/utility/svg-icons";
import { Skeleton } from "@/Components/ui/skeleton";
import { Card, CardContent } from "@/Components/ui/card";
import DataCard from "@/Components/partials/DataCard";
import { ShieldCheck } from "lucide-react";
import { fetchRtRwStats, fetchWargaPendingData, fetchWargaStats } from "@/hooks/Admin";

const DashboardContent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [dataWarga, setDataWarga] = useState([]);

    const [wargaStats, setWargaStats] = useState([
        { label: "Populasi Warga", value: "···" },
        { label: "Total Pengajuan Surat", value: "···" },
        { label: "Total Pengajuan Dalam Proses", value: "···" },
        { label: "Total Pengajuan Menunggu Tindakan", value: "···" },
    ]);

    const [RtRwStats, setRtRwStats] = useState([
        { label: "Populasi Staff", value: "···" },
        { label: "Total Pengajuan Surat", value: "···" },
        { label: "Total Pengajuan Dalam Proses", value: "···" },
        { label: "Total Pengajuan Menunggu Tindakan", value: "···" },
    ]);

    useEffect(() => {
        fetchWargaPendingData(setDataWarga, setIsLoading);
        fetchWargaStats(setWargaStats);
        fetchRtRwStats(setRtRwStats);
    }, []);

    return (
        <div className="flex flex-col w-full mb-10">
            <div className="flex w-full h-full">
                <div className="container mx-auto p-6 ">
                <DataCard 
                    wargaStats={wargaStats} 
                    RtRwStats={RtRwStats}
                />
                </div>
            </div>
            <div className="container mx-auto p-6 md:mb-0 mb-8">
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
                        : !dataWarga.length > 0 ? (
                            <Card>
                              <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                  <ShieldCheck className="h-6 w-6 text-blue" />
                                </div>               
                                <div className='flex flex-col h-full justify-between'>
                                  <p className="font-medium flex items-center h-1/2">Tidak ada warga yang mendaftar</p>
                                  <p className="text-sm flex h-1/2 text-blue">Semua approval role warga telah diproses</p>
                                </div>
                              </div>
                              </CardContent>
                            </Card>
                          ) : dataWarga.map((warga, index) => (
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
                                        <span className="md:text-base text-sm text-blue-600 text-nowrap">
                                            {warga.nama}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-700">
                                            NIK
                                        </span>
                                        <span className="md:text-base text-sm text-blue-600">
                                            {warga.nik_warga}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-700">
                                            RT
                                        </span>
                                        <span className="md:text-base text-sm text-blue-600 text-nowrap">
                                            {warga.no_rt}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-700">
                                            RW
                                        </span>
                                        <span className="md:text-base text-sm text-blue-600 text-nowrap">
                                            {warga.no_rw}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-700">
                                            Status
                                        </span>
                                        <span className="md:text-base text-sm text-green-2">
                                            {warga.approved === null
                                                ? "Pending" : 
                                                warga.approved === 1 
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
                                        className="border border-blue-500 text-blue-500 md:px-28 px-4 py-2 text-nowrap rounded-full hover:bg-blue-500 hover:text-white transition"
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
