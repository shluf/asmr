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
import { CheckCircle, HandCoins } from "lucide-react";
import renderIcon from "@/utility/renderIcon";
import axios from "axios";

const activities = [
    {
        date: "Senin, 10 September 2024",
        time: "19.00-21.00",
        activity: "Rapat Koordinasi RT",
        location: "Balai Warga RT 02",
        responsible: "Ketua RT 02",
    },
];

const DashboardContent = () => {
    const [dataPengajuan, setDataPengajuan] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(route("pengajuan.surat"));

            console.log(response.data.pengajuan);
            setDataPengajuan(response.data.pengajuan);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
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
                            {activities.map((activity, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium text-blue-600">
                                        {activity.date}
                                    </TableCell>
                                    <TableCell>{activity.time}</TableCell>
                                    <TableCell className="text-blue-600">
                                        {activity.activity}
                                    </TableCell>
                                    <TableCell className="text-blue-600">
                                        {activity.location}
                                    </TableCell>
                                    <TableCell>
                                        {activity.responsible}
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
                    {dataPengajuan.map((dataPengajuan, index) => (
                        <Card key={index}>
                            <CardContent className="flex items-center p-6">
                                <div className="w-12 h-12 bg-green-3 rounded-[12px] flex items-center justify-center text-2xl">
                                    {renderIcon("user-filled", 2)}
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
                                            View Details
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
