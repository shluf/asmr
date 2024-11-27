import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Check, Cog, Download, ShieldCheck, X, HelpCircle } from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "@/Components/ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { downloadSurat, fetchHistoryData } from "@/hooks/Warga";
import { Skeleton } from "@/Components/ui/skeleton";

const getStatusIcon = (status) => {
  switch (status) {
    case "approved":
      return <Check className="h-6 w-6 text-white" />;
    case "in-progress":
      return <Cog className="h-6 w-6 text-white" />;
    case "rejected":
      return <X className="h-6 w-6 text-white" />;
    default:
      return <HelpCircle className="h-6 w-6 text-white" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "approved":
      return "bg-green-500";
    case "in-progress":
      return "bg-yellow-500";
    case "rejected":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

const HistoriPengajuan = ({ nikWarga }) => {
  const [dataPengajuan, setDataPengajuan] = useState([]);
  const [openItems, setOpenItems] = useState({});
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [isDownloadLoading, setIsDownloadLoading] = useState(true);

  useEffect(() => {
    fetchHistoryData(setDataPengajuan, nikWarga, setIsHistoryLoading);
  }, [nikWarga]);

  const handleDownloadSurat = (id) => {
    downloadSurat(id, setIsDownloadLoading)
  }

  return (
    <div className="w-full mb-4">
      <Card>
        <CardContent className="space-y-4 p-6">
          {isHistoryLoading ? (
            [...Array(5)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-xl" />
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-2">
                          <Skeleton className="h-4 w-[100px]" />
                          <Skeleton className="h-4 w-[120px]" />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <Skeleton className="w-32 h-10 rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : !dataPengajuan.length > 0 ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-green" />
                </div>               
                <div className='flex flex-col h-full justify-between'>
                  <p className="font-medium flex items-center h-1/2">Tidak ada surat yang diajukan</p>
                  <p className="text-sm flex h-1/2 text-green">Anda belum mengajukan surat</p>
                </div>
              </div>
              </CardContent>
            </Card>
          ) : (
            dataPengajuan.map((submission, index) => (
              <Collapsible
                key={index}
                open={openItems[index] || false}
                onOpenChange={(isOpen) =>
                  setOpenItems((prev) => ({ ...prev, [index]: isOpen }))
                }
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <ShieldCheck className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <p className="font-medium mb-1">Tanggal Pengajuan</p>
                          <p className="text-sm text-blue-600">
                            {submission?.created_at
                              ? format(new Date(submission.created_at), "EEEE, dd MMMM yyyy", {
                                  locale: idLocale,
                                })
                              : "Tanggal tidak tersedia"}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium mb-1">Keperluan</p>
                          <p className="text-sm text-blue-600">{submission?.jenis_surat || "Keperluan tidak tersedia"}</p>
                        </div>
                        <div>
                          <p className="font-medium mb-1">Status Tindak Lanjut</p>
                          <p className="text-sm text-blue-600">{submission?.status_pengajuan || "Status tidak tersedia"}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {submission?.progress?.some(
                          (step) => step.title === "Penerbitan Surat" && step.status === "approved"
                        ) && (
                          <Button disable={`${isDownloadLoading}`} variant="outline" className="rounded-full" onClick={() => handleDownloadSurat(submission.id_pengajuan_surat)}>
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
                    </CardContent>
                    </Card>

                    <CollapsibleContent className="mx-2 py-6 rounded-b-lg px-8 md:px-16 bg-[#d9d9d926] shadow-inner">
                      <div className="space-y-4">
                        {submission?.progress?.map((step, stepIndex) =>
                          step.status !== "pending" ? (
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
                          ) : null
                        )}
                      </div>
                    </CollapsibleContent>

              </Collapsible>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoriPengajuan;
