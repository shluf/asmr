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
import { Check, CheckCircle, Cog, Download, HandCoins, HelpCircle, ShieldCheck, X } from "lucide-react";
import renderIcon from "@/utility/renderIcon";
import axios from "axios";
import { Collapsible, CollapsibleTrigger } from "@/Components/ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";


const dummyData = [
    {
      created_at: "2023-10-01",
      jenis_surat: "Surat Izin Penelitian",
      status_pengajuan: "Selesai",
      progress: [
        { title: "Pemeriksaan Berkas", description: "Berkas diperiksa oleh tim", status: "completed" },
        { title: "Proses Verifikasi RT", description: "Menunggu verifikasi lebih lanjut", tgl_approval: "", status: "completed" },
        { title: "Proses Verifikasi RW", description: "Menunggu verifikasi lebih lanjut", tgl_approval: "", status: "completed" },
        { title: "Penerbitan Surat", description: "Surat sedang dalam proses penerbitan", status: "completed" },
      ],
    },
    {
      created_at: "2023-10-15",
      jenis_surat: "Surat Keterangan Aktif",
      status_pengajuan: "Ditolak",
      progress: [
        { title: "Pemeriksaan Berkas", description: "Berkas tidak lengkap", status: "rejected" },
      ],
    },
    {
      created_at: "2023-09-20",
      jenis_surat: "Surat Cuti Akademik",
      status_pengajuan: "Sedang Diproses",
      progress: [
        { title: "Pemeriksaan Berkas", description: "Berkas diperiksa oleh tim", status: "completed" },
        { title: "Proses Verifikasi", description: "Menunggu persetujuan pimpinan", status: "in-progress" },
      ],
    },
  ]

const HistoriPengajuan = ({ nikWarga }) => {
    const [dataPengajuan, setDataPengajuan] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(`/history-warga/${nikWarga}`);

            // console.log(response.data.pengajuan);
            setDataPengajuan(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const [openItems, setOpenItems] = useState({})

    const getStatusIcon = (status) => {
      switch (status) {
        case "approved":
          return <Check className="h-6 w-6 text-white" />
        case "in-progress":
          return <Cog className="h-6 w-6 text-white" />
        case "rejected":
          return <X className="h-6 w-6 text-white" />
        default:
          return <HelpCircle className="h-6 w-6 text-white" />
      }
    }
  
    const getStatusColor = (status) => {
      switch (status) {
        case "approved":
          return "bg-green-500"
        case "in-progress":
          return "bg-yellow-500"
        case "rejected":
          return "bg-red-500"
        default:
          return "bg-gray-400"
      }
    }

    return (
        <div className="w-full">
            <Card>
            <CardContent className="space-y-4 p-6">
                {dataPengajuan.map((submission, index) => (
                <Collapsible
                    key={index}
                    open={openItems[index]}
                    onOpenChange={(isOpen) => setOpenItems({ ...openItems, [index]: isOpen })}
                >
                    <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                            <p className="font-medium">Tanggal Pengajuan</p>
                            <p className="text-sm text-blue-600">
                                {format(new Date(submission.created_at), "EEEE, dd MMMM yyyy", {
                                locale: idLocale,
                                })}
                            </p>
                            </div>
                            <div>
                            <p className="font-medium">Keperluan</p>
                            <p className="text-sm text-blue-600">{submission.jenis_surat}</p>
                            </div>
                            <div>
                            <p className="font-medium">Status Tindak Lanjut</p>
                            <p className="text-sm text-blue-600">{submission.status_pengajuan}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                          {submission.progress.some(step => step.title === "Penerbitan Surat" && step.status === "completed") && (
                            <Button variant="outline" className="rounded-full">
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                          <CollapsibleTrigger asChild>
                              <Button variant="outline" className="rounded-full">
                              {openItems[index] ? "Sembunyikan" : "Lihat Selengkapnya"}
                              </Button>
                          </CollapsibleTrigger>
                        </div>
                        </div>
                        <CollapsibleContent>
                        <div className="mt-6 space-y-4">
                            {submission.progress.map((step, stepIndex) => (
                               step.status !== "pending" ?
                            <div key={stepIndex} className="flex gap-4">
                                <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(
                                    step.status
                                )}`}
                                >
                                {getStatusIcon(step.status)}
                                </div>
                                <div className="flex-1">
                                <h4 className="font-medium">{step.title}</h4>
                                <p className="text-sm text-gray-500">{step.description}</p>
                                </div>
                            </div>
                              : '' 
                            ))}
                        </div>
                        </CollapsibleContent>
                    </CardContent>
                    </Card>
                </Collapsible>
                ))}
            </CardContent>
            </Card>
        </div>
    );
};

export default HistoriPengajuan;
