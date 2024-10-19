import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react'

const TambahRTRW = () => {

  const [focusedField, setFocusedField] = useState("nama");
  const { data, setData, post, processing, errors, reset } = useForm({
      email: "",
      password: "",
      password_confirmation: "",
      id_rt: "",
      id_rw: "",
      nama: "",
      alamat: "",
      jabatan: "",
      ttd: "",
  });

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
              color="blue"
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

  const submit = (e) => {
      e.preventDefault();

      console.log(data);

      // post(route("register"), {
      //     onFinish: () => reset("password", "password_confirmation"),
      // });
  };

  return (
    <form
    onSubmit={submit}
    className="space-y-6 flex flex-col justify-center items-center"
>
    <div className="flex flex-col gap-6 justify-around items-center w-full">
        <div className="grid grid-cols-1 gap-6 w-full max-w-2xl md:grid-cols-4">
            <div className="md:col-span-2">
                <InputField
                    label="Nama"
                    id="nama"
                    value={data.nama}
                    onChange={setData}
                    error={errors.nama}
                    required
                />
            </div>
            <div className="md:col-span-2">
                <InputField
                    label="Username"
                    id="username"
                    value={data.username}
                    onChange={setData}
                    error={errors.username}
                    required
                />
            </div>
            <div className="md:col-span-2">
                <InputLabel
                    htmlFor="jabatan"
                    value="Jabatan"
                />

                <Select>
                  <SelectTrigger                 
                  id="jabatan"
                  name="jabatan"
                  value={data.jabatan}
                  onChange={(e) =>
                      setData("jabatan", e.target.value)
                  }
                  required>
                    <SelectValue placeholder="Jabatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RT">RT</SelectItem>
                    <SelectItem value="RW">RW</SelectItem>
                  </SelectContent>
                </Select>

                <InputError
                    message={errors.jabatan}
                    className="mt-1"
                />
            </div>
            <div className="md:col-span-2">
                <InputField
                    label="Provinsi"
                    id="provinsi"
                    value={data.provinsi}
                    onChange={setData}
                    error={errors.provinsi}
                    required
                />
            </div>
            <div className="md:col-span-2">
                <InputField
                    label="Kabupaten"
                    id="kabupaten"
                    value={data.kabupaten}
                    onChange={setData}
                    error={errors.kabupaten}
                    required
                />
            </div>
            {/* <div className="md:col-span-2 md:grid-cols-2 gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <RtRwSelects
                        data={data}
                        setData={(field, value) =>
                            setData((prev) => ({
                                ...prev,
                                [field]: value,
                            }))
                        }
                        errors={errors}
                        rtRwData={rtRwData}
                        />
                </div>
            </div> */}
            <div className="md:col-span-4">
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


    </div>

    <div className="flex items-center justify-center mt-6">
        <PrimaryButton
            className="w-full md:w-auto px-6 py-3"
            disabled={processing}
            color={"green"}
        >
            Tambahkan
        </PrimaryButton>
    </div>
</form>
  )
}

export default TambahRTRW