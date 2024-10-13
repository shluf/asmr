import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Register() {
    const [focusedField, setFocusedField] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        nik_warga: "",
        email: "",
        password: "",
        password_confirmation: "",
        id_rt: "",
        id_rw: "",
        nama: "",
        nomer_kk: "",
        jenis_kelamin: "",
        phone: "",
        tempat_dan_tanggal_lahir: "",
        alamat: "",
        kabupaten: "",
        provinsi: "",
        agama: "",
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

        console.log(data)

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout button={"login"} title={"Registrasi"} wide>
            <Head title="Register" />

            <form
                onSubmit={submit}
                className="space-y-6 flex flex-col justify-center items-center"
            >
                <div className="flex flex-col md:flex-row gap-6 justify-around items-center w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-md">
                        <InputField
                            label="Nama"
                            id="nama"
                            value={data.nama}
                            onChange={setData}
                            error={errors.nama}
                            required
                        />
                        <InputField
                            label="NIK"
                            id="nik_warga"
                            type="number"
                            value={data.nik_warga}
                            onChange={setData}
                            error={errors.nik_warga}
                            required
                        />
                        <InputField
                            label="Nomor KK"
                            id="nomer_kk"
                            type="number"
                            value={data.nomer_kk}
                            onChange={setData}
                            error={errors.nomer_kk}
                            required
                        />
                        <InputField
                            label="Tempat, tgl lahir"
                            id="tempat_dan_tanggal_lahir"
                            value={data.tempat_dan_tanggal_lahir}
                            onChange={setData}
                            error={errors.tempat_dan_tanggal_lahir}
                            required
                        />
                        <div>
                            <InputLabel
                                htmlFor="gender"
                                value="Jenis Kelamin"
                            />
                            <select
                                id="jenis_kelamin"
                                name="jenis_kelamin"
                                value={data.jenis_kelamin}
                                onChange={(e) =>
                                    setData("jenis_kelamin", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            >
                                <option value=""></option>
                                <option value="laki-laki">Laki-laki</option>
                                <option value="perempuan">Perempuan</option>
                            </select>
                            <InputError
                                message={errors.jenis_kelamin}
                                className="mt-1"
                            />
                        </div>
                        <InputField
                            label="Agama"
                            id="agama"
                            value={data.agama}
                            onChange={setData}
                            error={errors.agama}
                            required
                        />
                        <InputField
                            label="Provinsi"
                            id="provinsi"
                            value={data.provinsi}
                            onChange={setData}
                            error={errors.provinsi}
                            required
                        />
                        <InputField
                            label="Kabupaten"
                            id="kabupaten"
                            value={data.kabupaten}
                            onChange={setData}
                            error={errors.kabupaten}
                            required
                        />
                        <div className="grid grid-cols-2 gap-4 col-span-1">
                            <InputField
                                label="RT"
                                id="id_rt"
                                type="number"
                                value={data.id_rt}
                                onChange={setData}
                                error={errors.id_rt}
                                required
                            />
                            <InputField
                                label="RW"
                                id="id_rw"
                                type="number"
                                value={data.id_rw}
                                onChange={setData}
                                error={errors.id_rw}
                                required
                            />
                        </div>
                        <div className="md:col-span-3">
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

                    <div className="grid grid-cols-1 w-full gap-6 max-w-md">
                        <InputField
                            label="Email"
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={setData}
                            error={errors.email}
                            required
                        />
                        <InputField
                            label="Nomor Telp"
                            id="phone"
                            type="tel"
                            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                            value={data.phone}
                            onChange={setData}
                            error={errors.phone}
                            required
                        />
                        <InputField
                            label="Password"
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={setData}
                            error={errors.password}
                            required
                        />
                        <InputField
                            label="Konfirmasi Password"
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={setData}
                            error={errors.password_confirmation}
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center mt-6">
                    <PrimaryButton
                        className="w-full md:w-auto px-6 py-3"
                        disabled={processing}
                        color={"yellow"}
                    >
                        Registrasi
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
