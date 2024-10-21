import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/Components/ui/tabs";
import FileUpload from '@/Components/ui/file-upload';
import axios from 'axios';
import { router } from '@inertiajs/react';

const TambahRTRW = () => {
  const [focusedField, setFocusedField] = useState("nama");
  const [rwOptions, setRwOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { data, setData, post, processing, errors, reset } = useForm({
    nama: "",
    username: "",
    jabatan: "",
    nomor: "",
    password: "",
    nik: "",
    periode: "",
    id_rw: "",
    alamat: "",
    ttd: null,
  });

  // Fetch RW list on component mount
  useEffect(() => {
    fetchRWList();
  }, []);

  const fetchRWList = async () => {
    try {
      const response = await axios.get(route('rw.list'));
      setRwOptions(response.data);
    } catch (error) {
      console.error('Error fetching RW list:', error);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== '') {
        formData.append(key, data[key]);
      }
    });

    try {
      await router.post(route('rt-rw.store'), formData, {
        onSuccess: () => {
          reset();
          alert('Data berhasil ditambahkan');
          if (data.jabatan === 'RW') {
            fetchRWList(); // Refresh RW list after adding new RW
          }
        },
        onError: (errors) => {
          console.error('Error submitting form:', errors);
          alert('Terjadi kesalahan saat menambahkan data');
        },
        onFinish: () => {
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert('File terlalu besar. Maksimal ukuran file adalah 2MB');
        e.target.value = '';
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Format file tidak didukung. Gunakan format JPG atau PNG');
        e.target.value = '';
        return;
      }
      setData('ttd', file);
    }
  };

  const handleRwChange = (selectedRw) => {
    setData('id_rw', selectedRw);
  };

  return (
    <div className="p-6">
      <Tabs defaultValue="rtTab" className="max-w-2xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rtTab">RT</TabsTrigger>
          <TabsTrigger value="rwTab">RW</TabsTrigger>
        </TabsList>

        <TabsContent value="rtTab">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="col-span-2">
                <InputField
                  label="Nama Lengkap"
                  id="nama"
                  value={data.nama}
                  onChange={(id, value) => setData(id, value)}
                  error={errors.nama}
                  required
                />
              </div>

              <div>
                <InputField
                  label="NIK"
                  id="nik"
                  value={data.nik}
                  onChange={(id, value) => setData(id, value)}
                  error={errors.nik}
                  required
                />
              </div>

              <div>
                <InputField
                  label="Periode"
                  id="periode"
                  placeholder="contoh: 2024-2029"
                  value={data.periode}
                  onChange={(id, value) => setData(id, value)}
                  error={errors.periode}
                  required
                />
              </div>

              <div>
                <InputLabel htmlFor="jabatan" value="Jabatan" />
                <Select 
                  onValueChange={(value) => setData('jabatan', value)}
                  value={data.jabatan}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jabatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RT">RT</SelectItem>
                  </SelectContent>
                </Select>
                <InputError message={errors.jabatan} className="mt-1" />
              </div>

              <div>
                <InputField
                  label="Nomor RT"
                  id="nomor"
                  value={data.nomor}
                  onChange={(id, value) => setData(id, value)}
                  error={errors.nomor}
                  required
                />
              </div>

              <div>
                <InputLabel htmlFor="id_rw" value="RW" />
                <Select onValueChange={handleRwChange} value={data.id_rw}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih RW" />
                  </SelectTrigger>
                  <SelectContent>
                    {rwOptions.map((rw) => (
                      <SelectItem key={rw.id_rw} value={rw.id_rw.toString()}>
                         {rw.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <InputError message={errors.id_rw} className="mt-1" />
              </div>

              <div className="col-span-2">
                <InputField
                  label="Alamat"
                  id="alamat"
                  value={data.alamat}
                  onChange={(id, value) => setData(id, value)}
                  error={errors.alamat}
                  required
                />
              </div>

              <div>
                <InputField
                  label="Username"
                  id="username"
                  value={data.username}
                  onChange={(id, value) => setData(id, value)}
                  error={errors.username}
                  required
                />
              </div>

              <div>
                <InputField
                  label="Password"
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(id, value) => setData(id, value)}
                  error={errors.password}
                  required
                />
              </div>

              <div className="col-span-2">
                <FileUpload
                  id="ttd"
                  accept="image/jpeg,image/png"
                  setData={setData}
                  className="mt-1"
                  errors={errors.ttd}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <PrimaryButton
                color="green"
                className="px-6 py-2"
                disabled={processing || isLoading}
              >
                {isLoading ? 'Menyimpan...' : 'Tambah RT'}
              </PrimaryButton>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="rwTab">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="col-span-2">
                <InputField
                  label="Nama Lengkap"
                  id="nama"
                  value={data.nama}
                  onChange={(id, value) => setData(id, value)}
                  error={errors.nama}
                  required
                />
              </div>

              <div>
                <InputField
                  label="NIK"
                  id="nik"
                  value={data.nik}
                  onChange={(id, value) => setData(id, value)}
                  error={errors.nik}
                  required
                />
              </div>

              <div>
                <InputField
                  label="Periode"
                  id="periode"
                  placeholder="contoh: 2024-2029"
                  value={data.periode}
                  onChange={(id, value) => setData(id, value)}
                  error={errors.periode}
                  required
                />
              </div>

              <div>
                <InputLabel htmlFor="jabatan" value="Jabatan" />
                <Select 
                  onValueChange={(value) => setData('jabatan', value)}
                  value={data.jabatan}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jabatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RW">RW</SelectItem>
                  </SelectContent>
                </Select>
                <InputError message={errors.jabatan} className="mt-1" />
              </div>

              <div>
                <InputField
                  label="Nomor RW"
                  id="nomor"
                  value={data.nomor}
                  onChange={(id, value) => setData(id, value)}
                  error={errors.nomor}
                  required
                />
              </div>

              <div className="col-span-2">
                <InputField
                  label="Alamat"
                  id="alamat"
                  value={data.alamat}
                  onChange={(id, value) => setData(id, value)}
                  error={errors.alamat}
                  required
                />
              </div>

              <div>
                <InputField
                  label="Username"
                  id="username"
                  value={data.username}
                  onChange={(id, value) => setData(id, value)}
                  error={errors.username}
                  required
                />
              </div>

              <div>
                <InputField
                  label="Password"
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(id, value) => setData(id, value)}
                  error={errors.password}
                  required
                />
              </div>

              <div className="col-span-2">
                <FileUpload
                  id="ttd"
                  setData={setData}
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  className="mt-1"
                  errors={errors.ttd}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <PrimaryButton
                color="green"
                className="px-6 py-2"
                disabled={processing || isLoading}
              >
                {isLoading ? 'Menyimpan...' : 'Tambah RW'}
              </PrimaryButton>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TambahRTRW;