import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import RtRwSelects from "./Partials/RtRwSelects";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";

export default function Register({ rtRwData }) {
    const [focusedField, setFocusedField] = useState("nama");
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
                color="yellow"
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

        // console.log(data);

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
                                label="NIK"
                                id="nik_warga"
                                type="number"
                                value={data.nik_warga}
                                onChange={setData}
                                error={errors.nik_warga}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <InputField
                                label="Nomor KK"
                                id="nomer_kk"
                                type="number"
                                value={data.nomer_kk}
                                onChange={setData}
                                error={errors.nomer_kk}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <InputField
                                label="Tempat, tgl lahir"
                                id="tempat_dan_tanggal_lahir"
                                value={data.tempat_dan_tanggal_lahir}
                                onChange={setData}
                                error={errors.tempat_dan_tanggal_lahir}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel
                                htmlFor="gender"
                                value="Jenis Kelamin"
                            />
                            <Select onValueChange={(value) => setData("jenis_kelamin", value)}>
                                <SelectTrigger
                                    color="yellow"
                                    id="jenis_kelamin"
                                    name="jenis_kelamin"
                                    required
                                >
                                    <SelectValue placeholder="Jenis Kelamin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="L">Laki-laki</SelectItem>
                                    <SelectItem value="P">Perempuan</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.jenis_kelamin}
                                className="mt-1"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="agama" value="Agama" />
                            <Select onValueChange={(e) =>
                                    setData("agama", e)
                                    }>
                            <SelectTrigger  
                                color="yellow"      
                                id="agama"
                                name="agama"
                                required>
                                <SelectValue placeholder="Agama" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Islam">Islam</SelectItem>
                                <SelectItem value="Kristen">Kristen</SelectItem>
                                <SelectItem value="Katolik">Katolik</SelectItem>
                                <SelectItem value="Hindu">Hindu</SelectItem>
                                <SelectItem value="Buddha">Buddha</SelectItem>
                                <SelectItem value="Khonghucu">Khonghucu</SelectItem>
                            </SelectContent>
                            </Select>
                            <InputError
                                message={errors.agama}
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
                        <div className="md:col-span-2 md:grid-cols-2 gap-6">
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
                        </div>
                        <div className="md:col-span-2">
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

                    <div className="grid grid-cols-1 w-full gap-6 max-w-2xl">
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
