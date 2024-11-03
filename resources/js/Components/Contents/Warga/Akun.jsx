import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { useForm } from '@inertiajs/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PenSquare } from 'lucide-react'
import { Card } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'

const Akun = ({ nikWarga }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [focusedField, setFocusedField] = useState("phone");
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
    const fetchData = async () => {
      try {
        const response = await axios.get(`/profile-warga/${nikWarga}`);
        if (response.data.status === 'success') {
          setProfileWarga(response.data.data);
          // Pre-fill form data
          setData({
            phone: response.data.data.phone || "",
            alamat: response.data.data.alamat || "",
            kabupaten: response.data.data.kabupaten || "",
            provinsi: response.data.data.provinsi || "",
            agama: response.data.data.agama || "",
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchData();
  }, [nikWarga]);

  const InputField = ({
    label,
    id,
    type = "text",
    value,
    onChange,
    error,
    ...props
  }) => (
    <div>
      <InputLabel htmlFor={id} value={label} />
      <TextInput
        id={id}
        name={id}
        type={type}
        value={value}
        className="mt-1 block w-full"
        isFocused={focusedField === id}
        onFocus={() => setFocusedField(id)}
        onChange={(e) => onChange(id, e.target.value)}
        {...props}
      />
      <InputError message={error} className="mt-1" />
    </div>
  );

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
      <div className="flex gap-8">
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green">
              <img
                alt="Profile"
                className="w-full h-full object-fit"
                src="/img/profile.png"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-green text-white px-3 py-1 rounded-full text-sm font-medium">
              WARGA
            </div>
            <button className="absolute -right-2 -top-2 bg-white rounded-full p-1.5 shadow-lg border">
              <PenSquare className="w-4 h-4 text-green" />
            </button>
          </div>
        </div>

      {/* {!isEditMode ? ( */}
      <form onSubmit={submit} >
       <Card className="flex-grow p-6">
       <div className="grid grid-cols-2 gap-6">
         <div className="space-y-2">
           <InputLabel htmlFor="nama">Nama</InputLabel>
           <Input id="nama" defaultValue={profileWarga.nama} readOnly={!isEditMode} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="nik">NIK</InputLabel>
           <Input id="nik" defaultValue={profileWarga.nomer_kk} disabled={isEditMode} readOnly={true} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="email">Email</InputLabel>
           <Input id="email" type="email" defaultValue={profileWarga.user.email} disabled={isEditMode} readOnly={true} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="phone">Phone</InputLabel>
           <Input id="phone" type="tel" value={data.phone} onChange={(e) => setData("phone", e.target.value)} readOnly={!isEditMode} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="birthplace">Tempat, tanggal lahir</InputLabel>
           <Input id="birthplace" defaultValue={profileWarga.tempat_dan_tanggal_lahir} disabled={isEditMode} readOnly={true} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="provinsi">Provinsi</InputLabel>
           <Input id="provinsi" value={data.provinsi} onChange={(e) => setData("provinsi", e.target.value)}  readOnly={!isEditMode} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="alamat">Alamat</InputLabel>
           <Input id="alamat" value={data.alamat} onChange={(e) => setData("alamat", e.target.value)} readOnly={!isEditMode} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="kabupaten">Kabupaten</InputLabel>
           <Input id="kabupaten" value={data.kabupaten} onChange={(e) => setData("kabupaten", e.target.value)} readOnly={!isEditMode} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="gender">Jenis kelamin</InputLabel>
           <Input id="gender" defaultValue={profileWarga.jenis_kelamin == 'P' ? 'Perempuan' : 'Laki-laki'} disabled={isEditMode} readOnly={true} />
         </div>
         <div className="grid grid-cols-2 gap-4">
           <div className="space-y-2">
             <InputLabel htmlFor="rt">RT</InputLabel>
             <Input id="rt" defaultValue={profileWarga.id_rt} disabled={isEditMode} readOnly={true} />
           </div>
           <div className="space-y-2">
             <InputLabel htmlFor="rw">RW</InputLabel>
             <Input id="rw" defaultValue={profileWarga.id_rw} disabled={isEditMode} readOnly={true} />
           </div>
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="kk">No. KK</InputLabel>
           <Input id="kk" defaultValue={profileWarga.nomer_kk} disabled={isEditMode} readOnly={true} />
         </div>
         <div className="space-y-2">
           <InputLabel htmlFor="agama">Agama</InputLabel>
           <Input id="agama" onChange={(id, value) => setData(id, value)} defaultValue={profileWarga.agama} disabled={isEditMode} readOnly={true} />
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
      {/* ) : (
        <form onSubmit={submit} className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Edit Data Pribadi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="md:col-span-2">
              <p className="text-gray-600 mb-1">Nama:</p>
              <p className="font-semibold">{profileWarga.nama || "Mengambil data..."}</p>
            </div>
            
            <div>
              <InputField 
                label="Nomor Telp" 
                id="phone" 
                type="tel" 
                pattern="08[0-9]*" 
                value={data.phone} 
                onChange={setData} 
                error={errors.phone} 
                placeholder="08XXXXXXXXX" 
                required 
              />
            </div>
            <div>
              <InputLabel htmlFor="agama" value="Agama" />
              <select
                id="agama"
                name="agama"
                value={data.agama}
                onChange={(e) => setData("agama", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-yellow focus:border-yellow"
                required
              >
                <option value="">Pilih Agama</option>
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Khonghucu">Khonghucu</option>
              </select>
              <InputError message={errors.agama} className="mt-1" />
            </div>
            <div>
              <InputField 
                label="Provinsi" 
                id="provinsi" 
                value={data.provinsi} 
                onChange={setData} 
                error={errors.provinsi} 
                required 
              />
            </div>
            <div>
              <InputField 
                label="Kabupaten" 
                id="kabupaten" 
                value={data.kabupaten} 
                onChange={setData} 
                error={errors.kabupaten} 
                required 
              />
            </div>
            <div className="md:col-span-2">
              <InputField 
                label="Alamat" 
                id="alamat" 
                value={data.alamat} 
                onChange={setData} 
                error={errors.alamat} 
                required 
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-4 mt-6">
            <PrimaryButton
              type="button"
              className="px-6 py-3"
              onClick={() => setIsEditMode(false)}
              color="yellow"
            >
              Batal
            </PrimaryButton>
            <PrimaryButton 
              type="submit" 
              className="px-6 py-3" 
              disabled={processing}
              color="green"
            >
              Simpan
            </PrimaryButton>
          </div>
        </form>
      )} */}
    </div>
    </div>
  );
}

export default Akun;