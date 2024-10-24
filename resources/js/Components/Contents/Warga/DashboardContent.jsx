import React from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { CheckCircle, HandCoins } from "lucide-react"
import renderIcon from "@/utility/renderIcon";

const activities = [
    {
      date: "Senin, 10 September 2024",
      time: "19.00-21.00",
      activity: "Rapat Koordinasi RT",
      location: "Balai Warga RT 02",
      responsible: "Ketua RT 02"
    },
  ]
  
  const letterSubmissions = [
    {
      date: "Rabu, 19 Agustus 2024",
      purpose: "Surat Pengantar KTP/KK",
      status: "Selesai",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      date: "Selasa, 8 September 2024",
      purpose: "Surat Pengantar Domisili Usaha",
      status: "Dalam Proses",
      icon: HandCoins,
      color: "text-blue-500"
    }
  ]

const DashboardContent = () => {
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
            {letterSubmissions.map((submission, index) => (
              <Card key={index}>
                <CardContent className="flex items-center p-6">
                    <div className="w-12 h-12 bg-green-3 rounded-[12px] flex items-center justify-center text-2xl">
                        {renderIcon('user-filled', 2)}
                    </div>
                  <div className="grid grid-cols-2 gap-1 md:gap-4 ml-4 w-full justify-center items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 justify-center">
                        <div>
                            <p className="font-medium mt-2 text-left">Tanggal pengajuan</p>
                            <p className="font-medium text-sm text-blue-600 text-left">{submission.date}</p>
                        </div>
                        <div>
                            <p className="font-medium mt-2 text-left">Keperluan</p>
                            <p className="font-medium text-sm text-blue-600 text-left">{submission.purpose}</p>
                        </div>
                    </div>
                  <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 justify-center">
                    <div>
                        <p className="font-medium mt-2 text-left">Status tindak lanjut</p>
                        <p className="font-medium text-sm text-blue-600 text-left">{submission.status}</p>
                    </div>
                    <Button variant="outline" className="rounded-full mt-2">
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
    )
};

export default DashboardContent;
