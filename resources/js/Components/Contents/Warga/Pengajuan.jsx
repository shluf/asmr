import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchPengajuanWargaData } from "@/hooks/Warga";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import TextInput from "@/Components/TextInput";
import { Textarea } from "@headlessui/react";
import { AlertWrapper, showAlert } from "@/Components/partials/Alert";

const Pengajuan = () => {
    const [dataWarga, setDataWarga] = useState({});
    const [selectedJenisSurat, setSelectedJenisSurat] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [isLainnya, setIsLainnya] = useState(false)

    useEffect(() => {
        fetchPengajuanWargaData(setDataWarga, setLoading);
    }, []);

    const handleJenisSuratChange = (event) => {
        setSelectedJenisSurat(event.target.value);
        if (event.target.value==="lainnya:") {
            setIsLainnya(true)
        } else {
            setIsLainnya(false)
        }
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPengajuan((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [pengajuan, setPengajuan] = useState({
        id_warga: "",
        nama_pemohon: "",
        nik_pemohon: "",
        jenis_kelamin_pemohon: "",
        tempat_tanggal_lahir_pemohon: "",
        alamat_pemohon: "",
        agama_pemohon: "",
        id_rt: "",
        id_rw: "",
        jenis_surat: "",
        status_pengajuan: "pending",
        deskripsi: "",
    });

    const handleSubmit = async () => {
        try {
            const response = await axios.post(route("pengajuan.store"), {
                ...pengajuan,
                id_warga: dataWarga.nik_warga,
                id_rt: dataWarga.id_rt,
                id_rw: dataWarga.id_rw,
                jenis_surat: selectedJenisSurat,
                deskripsi: description,
            });
            // console.log("Submitting data:", pengajuan);
            showAlert({
                title: "Berhasil",
                desc: "Surat berhasil diajukan",
                message: "Silahkan tunggu status selanjutnya di laman histori pengajuan",
                success: true,
                color: "green",
            });
            setSelectedJenisSurat("");
            setDescription("");
            setPengajuan({
                id_warga: "",
                nama_pemohon: "",
                nik_pemohon: "",
                jenis_kelamin_pemohon: "",
                tempat_tanggal_lahir_pemohon: "",
                alamat_pemohon: "",
                agama_pemohon: "",
                id_rt: "",
                id_rw: "",
                jenis_surat: "",
                status_pengajuan: "pending",
                deskripsi: "",
            });
        } catch (error) {
            console.error("Error submitting pengajuan:", error);
            showAlert({
                title: "Gagal",
                desc: error.response.data.message,
                message: "Silahkan periksa kembali data yang anda berikan",
                success: false,
                color: "red",
            });
        }
    };

    return (
        <div className="w-full  flex justify-center items-start p-3 mb-4">
            <div>
                <AlertWrapper />
            </div>
            <div className="bg-white shadow-lg rounded-lg w-full h-full  p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">
                    Form Pengajuan
                </h2>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className="text-blue-2  md:text-sm text-xs  mt-4">
                    Mohon Isi Formulir dengan Benar untuk Mempercepat Proses
                    Layanan Anda
                </div>
                <div className="text-gray-600 mt-2 md:text-base text-sm">
                    Yang bertanda tangan di bawah ini Ketua {dataWarga.nomor_rt} {dataWarga.nomor_rw} {dataWarga.alamat},
                    memberikan keterangan kepada :
                </div>
                <div className="text-gray-800 mx-2 md:mx-8 mt-4 md:text-base text-sm space-y-1">
                    <div className="flex">
                        <label className="font-semibold w-60">Nama</label>
                        <span className="w-5">:</span>
                        <TextInput
                            color="green"
                            type="text"
                            name="nama_pemohon"
                            value={pengajuan.nama_pemohon}
                            onChange={handleInputChange}
                            className="flex-1 p-2 min-w-60 sm:min-w-80 border rounded"
                        />
                    </div>
                    <div className="flex">
                        <label className="font-semibold w-60">NIK </label>
                        <span className="w-5">:</span>
                        <TextInput
                            color="green"
                            type="text"
                            name="nik_pemohon"
                            value={pengajuan.nik_pemohon}
                            onChange={handleInputChange}
                            className="flex-1 p-2 min-w-60 sm:min-w-80 border rounded"
                        />
                    </div>
                    <div className="flex">
                        <span className="font-semibold w-60">NO.KK</span>
                        <span className="w-5">:</span>
                        <TextInput
                            color="green"
                            type="text"
                            name="nomer_kk"
                            value={dataWarga.nomer_kk || ""}
                            readOnly
                            className="flex-1 min-w-60 sm:min-w-80 p-2 border rounded"
                        />
                    </div>
                    <div className="flex">
                        <label className="font-semibold w-60">
                            Jenis Kelamin
                        </label>
                        <span className="w-5">:</span>
                        <div className="flex-1 min-w-60 sm:min-w-80 ">
                        <Select 
                            onValueChange={(value) => 
                                setPengajuan((prev) => ({ ...prev, jenis_kelamin_pemohon: value }))}
                        >

                        <SelectTrigger  
                            color="green"      
                            id="jenis_kelamin_pemohon"
                            name="jenis_kelamin_pemohon"
                            required>
                            <SelectValue placeholder="Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="L">Laki-laki</SelectItem>
                            <SelectItem value="P">Perempuan</SelectItem>
                        </SelectContent>
                        </Select>
                        </div>

                    </div>
                    <div className="flex">
                        <label className="font-semibold w-60">Agama</label>
                        <span className="w-5">:</span>
                        <div className="flex-1 min-w-60 sm:min-w-80">
                        <Select 
                            onValueChange={(value) => 
                                setPengajuan((prev) => ({ ...prev, agama_pemohon: value }))}
                        >
                        <SelectTrigger  
                            color="green"      
                            id="agama_pemohon"
                            name="agama_pemohon"
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
                        </div>

                    </div>
                    <div className="flex">
                        <label className="font-semibold w-60">
                            Tempat, tanggal lahir
                        </label>
                        <span className="w-5">:</span>
                        <TextInput
                            color="green"
                            type="text"
                            name="tempat_tanggal_lahir_pemohon"
                            value={pengajuan.tempat_tanggal_lahir_pemohon}
                            onChange={handleInputChange}
                            className="flex-1 min-w-60 sm:min-w-80 p-2 border rounded"
                        />
                    </div>
                    <div className="flex">
                        <label className="font-semibold w-60">
                            Alamat/Tempat tinggal
                        </label>
                        <span className="w-5">:</span>
                        <TextInput
                            color="green"
                            type="text"
                            name="alamat_pemohon"
                            value={pengajuan.alamat_pemohon}
                            onChange={handleInputChange}
                            className="flex-1 p-2 min-w-60 sm:min-w-80 border rounded"
                        />
                    </div>
                    </div>

                <div className="mb-6 mt-4 md:text-base text-sm">
                    <div className="text-gray-700">
                        Benar bahwa yang bersangkutan adalah warga {dataWarga.nomor_rt} {dataWarga.nomor_rw} yang beralamat di{" "}
                        {dataWarga.alamat}, dan bermaksud untuk mengurus surat:
                    </div>
                    <div className="mt-4 ml-6 space-y-2">
                        {[
                            "Pengantar KTP",
                            "Pengantar KK",
                            "Pengantar Akta Kelahiran",
                            "Surat Keterangan Kematian",
                            "Surat Domisili Tempat tinggal",
                            "Surat Domisili Usaha",
                            "Surat Keterangan Tidak Mampu",
                            "Surat SKCK",
                            "Surat Ketenagakerjaan",
                            "Surat Pengantar Nikah",
                            "Surat Keterangan Pindah",
                            "lainnya:",
                        ].map((jenis, index) => (
                            <label className="flex items-center" key={index}>
                                <TextInput
                                    color="green"
                                    type="radio"
                                    name="jenis_surat"
                                    value={jenis}
                                    className="form-radio text-green"
                                    checked={selectedJenisSurat === jenis} 
                                    onChange={handleJenisSuratChange}
                                />
                                <span className="ml-2">{jenis}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Deskripsi Keluhan */}
                <div className="mb-6">
                    <Textarea
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
                        rows="4"
                        placeholder="Detail Pengajuan"
                        value={description}
                        disabled={!isLainnya}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Button Ajukan */}
                <button
                    className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition duration-300"
                    onClick={handleSubmit}
                >
                    Ajukan
                </button>
            </div>
        </div>
    );
};

export default Pengajuan;
