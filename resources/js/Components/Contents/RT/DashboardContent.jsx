import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { id as idLocale } from 'date-fns/locale';
import { useEffect, useState } from "react";
import axios from "axios";
import { UserFilled } from "@/utility/svg-icons";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";

const activities = [
    {
      date: "Senin, 10 September 2024",
      time: "19.00-21.00",
      activity: "Rapat Koordinasi RT",
      location: "Balai Warga RT 02",
      responsible: "Ketua RT 02"
    },
  ]

const DashboardContent = ({ idRT }) => {
  const [pengajuanTerakhir, setPengajuanTerakhir] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
      try {
          const response = await axios.get(`/surat/pengajuan/?id_rt=${idRT}&length=2`);
          setPengajuanTerakhir(response.data);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };


    return (
        <div className="space-y-8 overflow-hidden">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Kegiatan RT/RW</CardTitle>
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
                    <TableCell className="font-medium text-blue-600">{activity.date}</TableCell>
                    <TableCell>{activity.time}</TableCell>
                    <TableCell className="text-blue-600">{activity.activity}</TableCell>
                    <TableCell className="text-blue-600">{activity.location}</TableCell>
                    <TableCell>{activity.responsible}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Pengajuan Surat Terakhir</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
          {!pengajuanTerakhir.data ? (<>Loading</>) : !pengajuanTerakhir.data.length > 0 ? (
            <Alert>
              <AlertTitle>Tidak ada surat pending</AlertTitle>
              <AlertDescription>
                Semua pengajuan surat telah diproses
              </AlertDescription>
            </Alert>
          ) : pengajuanTerakhir.data.map((submission, index) => (
              <Card key={index}>
                <CardContent className="flex items-center p-6">
                    <div className="w-12 h-12 bg-green-3 rounded-[12px] flex items-center justify-center text-2xl">
                        <UserFilled size={6} />
                    </div>
                  <div className="grid grid-cols-2 gap-1 md:gap-4 ml-4 w-full justify-center items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 justify-center">
                        <div>
                            <p className="font-medium mt-2 text-left">Tanggal pengajuan</p>
                            <p className="font-medium text-sm text-blue-600 text-left">                        
                              {format(new Date(submission.created_at), "EEEE, dd MMMM yyyy", {
                              locale: idLocale,
                            })}
                            </p>
                        </div>
                        <div>
                            <p className="font-medium mt-2 text-left">Keperluan</p>
                            <p className="font-medium text-sm text-blue-600 text-left">{submission.jenis_surat}</p>
                        </div>
                    </div>
                  <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 justify-center">
                    <div>
                        <p className="font-medium mt-2 text-left">Status tindak lanjut</p>
                        <p className="font-medium text-sm text-blue-600 text-left">{submission.status_approval}</p>
                    </div>
                    <Link href="/dashboard/rekapPengajuan">
                    <Button variant="outline" className="rounded-full mt-2">
                      View Details
                    </Button>
                    </Link>
                  </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    )
};

export default DashboardContent;