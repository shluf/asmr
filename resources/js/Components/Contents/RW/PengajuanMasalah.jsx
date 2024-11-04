import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { Check, X, ShieldCheck } from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  Alert,
  AlertDescription,
  AlertTitle 
} from '@/components/ui/alert';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';

const PengajuanMasalah = ({ idRW }) => {
  const [openItems, setOpenItems] = useState({});
  const [pendingSurat, setPendingSurat] = useState([]);
  const [loading, setLoading] = useState({});

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
      try {
          const response = await axios.get(`/surat/pending/rw/${idRW}`);
          setPendingSurat(response.data);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  // Handle approval/rejection
  const handleAction = async (id_pengajuan_surat, status) => {
    setLoading({ ...loading, [id_pengajuan_surat]: true });
    
    try {
      await axios.put(`/surat/approval/${id_pengajuan_surat}`, {
        status_approval: status,
        approver_type: 'rw',
        id_approver: idRW
      });

      fetchData();
      
    } catch (error) {
      console.error('Error updating status:', error);
    }
    
    setLoading({ ...loading, [id_pengajuan_surat]: false });
  };

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Surat Menunggu Persetujuan RW</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!pendingSurat.data ? (<>Loading</>) : !pendingSurat.data.length > 0 ? (
            <Alert>
              <AlertTitle>Tidak ada surat pending</AlertTitle>
              <AlertDescription>
                Semua pengajuan surat telah diproses
              </AlertDescription>
            </Alert>
          ) : (
            pendingSurat.data.map((surat, index) => (
              <Collapsible
                key={surat.id_pengajuan_surat}
                open={openItems[index]}
                onOpenChange={(isOpen) => 
                  setOpenItems({ ...openItems, [index]: isOpen })
                }
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      {/* Icon */}
                      {/* <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <ShieldCheck className="h-6 w-6 text-blue-600" />
                      </div> */}

                      {/* Surat Info */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div>
                          <p className="font-medium">Tanggal Pengajuan</p>
                          <p className="text-sm text-blue-600">
                            {format(new Date(surat.created_at), "EEEE, dd MMMM yyyy", {
                              locale: idLocale,
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Nama Pemohon</p>
                          <p className="text-sm text-blue-600">{surat.nama}</p>
                        </div>
                        <div>
                          <p className="font-medium">Status Tindak Lanjut</p>
                          <p className="text-sm text-blue-600">{surat.status_approval}</p>
                        </div>
                        <div>
                          <p className="font-medium">Penanggung Jawab</p>
                          <p className="text-sm text-blue-600">{surat.penanggung_jawab_rw}</p>
                        </div>
                        <div>
                          <p className="font-medium">Keperluan</p>
                          <p className="text-sm text-blue-600">{surat.jenis_surat}</p>
                        </div>
                        <div>
                          <p className="font-medium">NIK</p>
                          <p className="text-sm text-blue-600">{surat.nik_warga}</p>
                        </div>
                      </div>

                        <CollapsibleTrigger asChild>
                          <Button variant="outline" className="rounded-full">
                            {openItems[index] ? "Sembunyikan" : "Detail Pengajuan"}
                          </Button>
                        </CollapsibleTrigger>
                    </div>

                    {/* Collapsible Content */}
                    <CollapsibleContent>
                      <div className="mt-6 space-y-4">
                        <p className="text-gray-600">
                          Yang bertanda tangan di bawah ini Ketua RT 0{surat.id_rt} RW 0{surat.id_rw} {surat.alamat},
                          memberikan keterangan kepada:
                        </p>
                        <div className="text-gray-800 space-y-2">
                          <p className="flex">
                            <span className="font-semibold w-60">Nama</span>
                            <span className="w-5">:</span>
                            <span className="flex-1">{surat.nama}</span>
                          </p>
                          <p className="flex">
                            <span className="font-semibold w-60">NIK</span>
                            <span className="w-5">:</span>
                            <span className="flex-1">{surat.nik_warga}</span>
                          </p>
                          <p className="flex">
                            <span className="font-semibold w-60">NO.KK</span>
                            <span className="w-5">:</span>
                            <span className="flex-1">{surat.nomer_kk}</span>
                          </p>
                          <p className="flex">
                            <span className="font-semibold w-60">Jenis Kelamin</span>
                            <span className="w-5">:</span>
                            <span className="flex-1">{surat.jenis_kelamin}</span>
                          </p>
                          <p className="flex">
                            <span className="font-semibold w-60">Agama</span>
                            <span className="w-5">:</span>
                            <span className="flex-1">{surat.agama}</span>
                          </p>
                          <p className="flex">
                            <span className="font-semibold w-60">Tempat, tanggal lahir</span>
                            <span className="w-5">:</span>
                            <span className="flex-1">{surat.tempat_dan_tanggal_lahir}</span>
                          </p>
                          <p className="flex">
                            <span className="font-semibold w-60">Alamat</span>
                            <span className="w-5">:</span>
                            <span className="flex-1">{surat.alamat}</span>
                          </p>
                        </div>

                        <div className="mt-4">
                          <p className="font-semibold mb-2">Deskripsi Pengajuan:</p>
                          <p className="text-gray-700">{surat.deskripsi}</p>
                        </div>
                      </div>
                      {/* Action Buttons */}
                      <div className="flex gap-2 justify-end items-center w-full">
                        <PrimaryButton
                          color="red"
                          rounded='full'
                          disabled={loading[surat.id_pengajuan_surat]}
                          onClick={() => handleAction(surat.id_pengajuan_surat, 'rejected')}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Tolak
                        </PrimaryButton>
                        <PrimaryButton
                          color="green"
                          rounded='full'
                          disabled={loading[surat.id_pengajuan_surat]}
                          onClick={() => handleAction(surat.id_pengajuan_surat, 'approved')}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Setujui
                        </PrimaryButton>
                      </div>
                    </CollapsibleContent>
                  </CardContent>
                </Card>
              </Collapsible>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PengajuanMasalah;