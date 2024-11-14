import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { UserFilled } from "@/utility/svg-icons";
import { Link } from "@inertiajs/react";
import { fetchPengajuanData } from "@/hooks/Warga";
import { fetchProkerData } from "@/hooks/Common";
import { Skeleton } from "@/Components/ui/skeleton";
import { ShieldCheck } from "lucide-react";


const DashboardContent = () => {
    const [dataProker, setDataProker] = useState([]);
    const [dataPengajuan, setDataPengajuan] = useState([]);
    const [prokerIsLoading, setProkerIsLoading] = useState(true);
    const [pengajuanIsLoading, setPengajuanIsLoading] = useState(true);

    useEffect(() => {
        fetchProkerData(setDataProker, setProkerIsLoading);
        fetchPengajuanData(setDataPengajuan, setPengajuanIsLoading);
    }, []);

    return (
        <div className="space-y-8 overflow-hidden w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Kegiatan RT/RW
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Hari/tanggal</TableHead>
                                <TableHead>Jam</TableHead>
                                <TableHead>Kegiatan</TableHead>
                                <TableHead>Tempat</TableHead>
                                <TableHead>Penanggung jawab</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {prokerIsLoading
                                ? [...Array(3)].map((_, index) => (
                                    <TableRow key={`skeleton-${index}`}>
                                        <TableCell>
                                            <Skeleton className="h-6 w-24" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-6 w-16" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-6 w-32" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-6 w-24" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-6 w-28" />
                                        </TableCell>
                                    </TableRow>
                                  ))
                                : dataProker.map((Proker, index) => (
                                      <TableRow key={index}>
                                          <TableCell className="font-medium text-blue-600">
                                              {Proker.tanggal}
                                          </TableCell>
                                          <TableCell className="text-blue-600">
                                              {Proker.waktu}
                                          </TableCell>
                                          <TableCell>
                                              {Proker.jenis_kegiatan}
                                          </TableCell>
                                          <TableCell className="text-blue-600">
                                              {Proker.tempat}
                                          </TableCell>
                                          <TableCell>
                                              {Proker.penanggung_jawab}
                                          </TableCell>
                                      </TableRow>
                                  ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Pengajuan Surat Terakhir
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                {pengajuanIsLoading ? (
                        <>
                            {[...Array(2)].map((_, index) => (
                                <Card key={index}>
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                                {[...Array(6)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex flex-col h-full justify-between"
                                                    >
                                                        <Skeleton className="h-4 w-24 mb-2" />
                                                        <Skeleton className="h-4 w-32" />
                                                    </div>
                                                ))}
                                            </div>
                                            <Skeleton className="h-10 w-32 rounded-full" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    )  : !dataPengajuan.length > 0 ? (
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <ShieldCheck className="h-6 w-6 text-green" />
                                    </div>
                                    <div className="flex flex-col h-full justify-between">
                                        <p className="font-medium flex items-center h-1/2">
                                            Tidak ada pengajuan surat
                                        </p>
                                        <p className="text-sm flex h-1/2 text-green">
                                            Anda belum melakukan pengajuan surat
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : dataPengajuan.map((dataPengajuan, index) => (
                        <Card key={index}>
                            <CardContent className="flex items-center p-6">
                                <div className="w-12 h-12 bg-green-3 rounded-[12px] flex items-center justify-center text-2xl">
                                    <UserFilled size={6} />
                                </div>
                                <div className="grid grid-cols-2 gap-1 md:gap-4 ml-4 w-full justify-center items-center">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 justify-center">
                                        <div>
                                            <p className="font-medium mt-2 text-left">
                                                Tanggal pengajuan
                                            </p>
                                            <p className="font-medium text-sm text-blue-600 text-left">
                                                {format(
                                                    new Date(
                                                        dataPengajuan.created_at
                                                    ),
                                                    "EEEE, dd MMMM yyyy",
                                                    { locale: idLocale }
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-medium mt-2 text-left">
                                                Keperluan
                                            </p>
                                            <p className="font-medium text-sm text-blue-600 text-left">
                                                {dataPengajuan.jenis_surat}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 justify-center">
                                        <div>
                                            <p className="font-medium mt-2 text-left">
                                                Status tindak lanjut
                                            </p>
                                            <p className="font-medium text-sm text-blue-600 text-left">
                                                {dataPengajuan.status_pengajuan}
                                            </p>
                                        </div>
                                            <Button
                                                variant="outline"
                                                className="rounded-full mt-2"
                                            >
                                        <Link href="/dashboard/histori">
                                                View Details
                                        </Link>
                                            </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardContent;
