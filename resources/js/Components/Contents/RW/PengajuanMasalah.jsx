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
import { fetchPengajuanMasalahData } from '@/hooks/RW';
import { Skeleton } from '@/Components/ui/skeleton';

const PengajuanMasalah = ({ idRW }) => {
  const [openItems, setOpenItems] = useState({});
  const [pendingSurat, setPendingSurat] = useState([]);
  const [loading, setLoading] = useState({});

  useEffect(() => {
    fetchPengajuanMasalahData(setPendingSurat);
  }, []);

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
          {!pendingSurat.data ? (
            <>
              {[...Array(3)].map((_, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className='flex flex-col h-full justify-between'>
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        ))}
                      </div>
                      <Skeleton className="h-10 w-32" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
            ) : !pendingSurat.data.length > 0 ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-orange" />
                </div>               
                <div className='flex flex-col h-full justify-between'>
                  <p className="font-medium flex items-center h-1/2">Tidak ada surat pending</p>
                  <p className="text-sm flex h-1/2 text-orange">Semua pengajuan surat telah diproses</p>
                </div>
              </div>
              </CardContent>
            </Card>
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

                      {/* Surat Info */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className='flex flex-col h-full justify-between'>
                          <p className="font-medium flex items-center h-1/2">Tanggal Pengajuan</p>
                          <p className="text-sm flex h-1/2 text-blue-600">
                            {format(new Date(surat.created_at), "EEEE, dd MMMM yyyy", { locale: idLocale })}
                          </p>
                        </div>
                        <div className='flex flex-col h-full justify-between'>
                          <p className="font-medium flex items-center h-1/2">Nama Pemohon</p>
                          <p className="text-sm flex h-1/2 text-blue-600">{surat.nama}</p>
                        </div>
                        <div className='flex flex-col h-full justify-between'>
                          <p className="font-medium flex items-center h-1/2">Status Tindak Lanjut</p>
                          <p className="text-sm flex h-1/2 text-blue-600">{surat.status_approval}</p>
                        </div>
                        <div className='flex flex-col h-full justify-between'>
                          <p className="font-medium flex items-center h-1/2">Penanggung Jawab</p>
                          <p className="text-sm flex h-1/2 text-blue-600">{surat.penanggung_jawab_rw}</p>
                        </div>
                        <div className='flex flex-col h-full justify-between'>
                          <p className="font-medium flex items-center h-1/2">Keperluan</p>
                          <p className="text-sm flex h-1/2 text-blue-600">{surat.jenis_surat}</p>
                        </div>
                        <div className='flex flex-col h-full justify-between'>
                          <p className="font-medium flex items-center h-1/2">NIK</p>
                          <p className="text-sm flex h-1/2 text-blue-600">{surat.nik_warga}</p>
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