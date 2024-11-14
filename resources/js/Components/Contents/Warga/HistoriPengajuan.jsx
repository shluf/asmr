import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Check, CheckCircle, Cog, Download, HandCoins, HelpCircle, ShieldCheck, X } from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "@/Components/ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { fetchHistoryData } from "@/hooks/Warga";


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


const HistoriPengajuan = ({ nikWarga }) => {
    const [dataPengajuan, setDataPengajuan] = useState([]);
    const [openItems, setOpenItems] = useState({})

    useEffect(() => {
        fetchHistoryData(setDataPengajuan, nikWarga);
    }, []);

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
