import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { useForm } from '@inertiajs/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PenSquare, User2, UserCircle } from 'lucide-react'
import { Card } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { fetchAkunData } from '@/hooks/Warga'

const Akun = ({ nikWarga }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileWarga, setProfileWarga] = useState({
    user: {}
  });
  
  const { data, setData, processing, errors, reset } = useForm({
    phone: "",
    alamat: "",
    kabupaten: "",
    provinsi: "",
    agama: "",
  });

  useEffect(() => {
    fetchAkunData(setProfileWarga, setData, nikWarga);
  }, [nikWarga]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/profile-warga/${nikWarga}`, data);
      if (response.data.status === 'success') {
        setProfileWarga({
          user: {}
        })
        setProfileWarga(response.data.data);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex flex-col justify-center items-center md:items-start md:flex-row gap-8">
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green p-6 text-green">
              <User2 className='w-full h h-full' />
            </div>
            <div className="absolute bottom-0 right-0 bg-green text-white px-3 py-1 rounded-full text-sm font-medium">
              WARGA
            </div>
            <button onClick={() => setIsEditMode(!isEditMode)} className="absolute -right-2 -top-2 bg-white rounded-full p-1.5 shadow-lg border">
              <PenSquare className="w-4 h-4 text-green" />
            </button>
          </div>
        </div>

      <form onSubmit={submit} >
       <Card className="flex-grow p-6">
       <div className="grid grid-cols-2 gap-6">
         <div className="space-y-2">
           <InputLabel htmlFor="nama">Nama</InputLabel>
           <Input className="focus:ring-green focus:border-green active:ring-green focus:ring-2" id="nama" defaultValue={profileWarga.nama} readOnly={!isEditMode} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="nik">NIK</InputLabel>
           <Input className="focus:ring-green focus:border-green active:ring-green focus:ring-2" id="nik" defaultValue={profileWarga.nomer_kk} disabled={isEditMode} readOnly={true} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="email">Email</InputLabel>
           <Input className="focus:ring-green focus:border-green active:ring-green focus:ring-2" id="email" type="email" defaultValue={profileWarga.user.email} disabled={isEditMode} readOnly={true} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="phone">Phone</InputLabel>
           <Input className="focus:ring-green focus:border-green active:ring-green focus:ring-2" id="phone" type="tel" value={data.phone} onChange={(e) => setData("phone", e.target.value)} readOnly={!isEditMode} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="birthplace">Tempat, tanggal lahir</InputLabel>
           <Input className="focus:ring-green focus:border-green active:ring-green focus:ring-2" id="birthplace" defaultValue={profileWarga.tempat_dan_tanggal_lahir} disabled={isEditMode} readOnly={true} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="provinsi">Provinsi</InputLabel>
           <Input className="focus:ring-green focus:border-green active:ring-green focus:ring-2" id="provinsi" value={data.provinsi} onChange={(e) => setData("provinsi", e.target.value)}  readOnly={!isEditMode} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="alamat">Alamat</InputLabel>
           <Input className="focus:ring-green focus:border-green active:ring-green focus:ring-2" id="alamat" value={data.alamat} onChange={(e) => setData("alamat", e.target.value)} readOnly={!isEditMode} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="kabupaten">Kabupaten</InputLabel>
           <Input className="focus:ring-green focus:border-green active:ring-green focus:ring-2" id="kabupaten" value={data.kabupaten} onChange={(e) => setData("kabupaten", e.target.value)} readOnly={!isEditMode} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="gender">Jenis kelamin</InputLabel>
           <Input className="focus:ring-green focus:border-green active:ring-green focus:ring-2" id="gender" defaultValue={profileWarga.jenis_kelamin == 'P' ? 'Perempuan' : 'Laki-laki'} disabled={isEditMode} readOnly={true} />
         </div>
         <div className="grid grid-cols-2 gap-4">
           <div className="space-y-2">
             <InputLabel htmlFor="rt">RT</InputLabel>
             <Input className="focus:ring-green focus:border-green active:ring-green focus:ring-2" id="rt" defaultValue={profileWarga.id_rt} disabled={isEditMode} readOnly={true} />
           </div>
           <div className="space-y-2">
             <InputLabel htmlFor="rw">RW</InputLabel>
             <Input className="focus:ring-green focus:border-green active:ring-green focus:ring-2" id="rw" defaultValue={profileWarga.id_rw} disabled={isEditMode} readOnly={true} />
           </div>
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="kk">No. KK</InputLabel>
           <Input className="focus:ring-green focus:border-green active:ring-green focus:ring-2" id="kk" defaultValue={profileWarga.nomer_kk} disabled={isEditMode} readOnly={true} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="agama">Agama</InputLabel>
           <Input className="focus:ring-green focus:border-green active:ring-green focus:ring-2" id="agama" onChange={(id, value) => setData(id, value)} defaultValue={profileWarga.agama} disabled={isEditMode} readOnly={true} />
         </div>
       </div>

       <div className="flex justify-end gap-4 mt-8">
         {!isEditMode ? (
         <PrimaryButton
            type="button"
            className="px-6 py-3"
            color="yellow"
           onClick={() => setIsEditMode(true)}
         >
           Edit
         </PrimaryButton>
         ) : (
          <>
         <PrimaryButton
            type="button"
            className="px-6 py-3"
            color="yellow"
           onClick={() => setIsEditMode(false)}
         >
           Cancel
         </PrimaryButton>
         <PrimaryButton
          type="submit" 
          className="px-6 py-3" 
          disabled={processing}
          color="green"
          >
           Save
         </PrimaryButton>
           </>
         )}
       </div>
     </Card>
     </form>
    </div>
    </div>
  );
}

export default Akun;