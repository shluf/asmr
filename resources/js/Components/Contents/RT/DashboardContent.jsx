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
import { id as idLocale } from "date-fns/locale";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserFilled } from "@/utility/svg-icons";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { fetchProkerData } from "@/hooks/Common";
import { fetchPengajuanTerbaruData } from "@/hooks/RT";
import { Skeleton } from "@/Components/ui/skeleton";

const DashboardContent = ({ idRT }) => {
    const [pengajuanTerakhir, setPengajuanTerakhir] = useState([]);
    const [dataProker, setDataProker] = useState([]);
    const [prokerIsLoading, setProkerIsLoading] = useState(true);
    
    useEffect(() => {
        fetchProkerData(setDataProker, setProkerIsLoading);
        fetchPengajuanTerbaruData(setPengajuanTerakhir, idRT);
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
                                          <TableCell>
                                              <div className="flex space-x-2">
                                                  <Skeleton className="h-8 w-8 rounded-full" />
                                                  <Skeleton className="h-8 w-8 rounded-full" />
                                              </div>
                                          </TableCell>
                                      </TableRow>
                                  ))
                                : dataProker.map((activity, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium text-blue-600">
                                        {activity.tanggal}
                                    </TableCell>
                                    <TableCell>{activity.waktu}</TableCell>
                                    <TableCell className="text-blue-600">
                                        {activity.jenis_kegiatan}
                                    </TableCell>
                                    <TableCell className="text-blue-600">
                                        {activity.tempat}
                                    </TableCell>
                                    <TableCell>
                                        {activity.penanggung_jawab}
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
                    {!pengajuanTerakhir.data ? (
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
                    ) : !pengajuanTerakhir.data.length > 0 ? (
                        <Alert>
                            <AlertTitle>Tidak ada surat pending</AlertTitle>
                            <AlertDescription>
                                Semua pengajuan surat telah diproses
                            </AlertDescription>
                        </Alert>
                    ) : (
                        pengajuanTerakhir.data.map((submission, index) => (
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
                                                            submission.created_at
                                                        ),
                                                        "EEEE, dd MMMM yyyy",
                                                        {
                                                            locale: idLocale,
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-medium mt-2 text-left">
                                                    Keperluan
                                                </p>
                                                <p className="font-medium text-sm text-blue-600 text-left">
                                                    {submission.jenis_surat}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 justify-center">
                                            <div>
                                                <p className="font-medium mt-2 text-left">
                                                    Status tindak lanjut
                                                </p>
                                                <p className="font-medium text-sm text-blue-600 text-left">
                                                    {submission.status_approval}
                                                </p>
                                            </div>
                                            <Link href="/dashboard/rekapPengajuan">
                                                <Button
                                                    variant="outline"
                                                    className="rounded-full mt-2"
                                                >
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardContent;
