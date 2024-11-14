import React, { useEffect, useState } from "react";
import axios from "axios";

const Pengajuan = () => {
    const [dataWarga, setDataWarga] = useState({});
    const [selectedJenisSurat, setSelectedJenisSurat] = useState(""); // Ganti nama state di sini
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(route("pengajuan"));
            setDataWarga(response.data.warga);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleJenisSuratChange = (event) => {
        setSelectedJenisSurat(event.target.value);
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPengajuan((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // useEffect(() => {
    //     // Set `pengajuan` state setelah `dataWarga` diperbarui
    //     if (dataWarga && dataWarga.id) {
    //         setPengajuan((prev) => ({
    //             ...prev,
    //             id_warga: dataWarga.id,
    //             id_rt: dataWarga.id_rt,
    //             id_rw: dataWarga.id_rw,
    //         }));
    //     }
    // }, [dataWarga]);
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
            console.log("Submitting data:", pengajuan);
            alert("Pengajuan berhasil diajukan!");
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
        }
    };

    return (
        <div className="w-full  flex justify-center items-start p-3">
            <div className="bg-white shadow-lg rounded-lg w-full h-full  p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">
                    Form Pengajuan
                </h2>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <p className="text-blue-2    mt-4">
                    Mohon Isi Formulir dengan Benar untuk Mempercepat Proses
                    Layanan Anda
                </p>
                <p className="text-gray-600 mt-2">
                    Yang bertanda tangan di bawah ini Ketua RT 0
                    {dataWarga.id_rt} RW 0{dataWarga.id_rw} {dataWarga.alamat},
                    memberikan keterangan kepada :
                </p>
                <div className="text-gray-800 mt-4 space-y-1">
                    <p className="flex">
                        <label className="font-semibold w-60">Nama</label>
                        <span className="w-5">:</span>
                        <input
                            type="text"
                            name="nama_pemohon"
                            value={pengajuan.nama_pemohon}
                            onChange={handleInputChange}
                            className="flex-1 p-2 border rounded"
                        />
                    </p>
                    <p className="flex">
                        <label className="font-semibold w-60">NIK </label>
                        <span className="w-5">:</span>
                        <input
                            type="text"
                            name="nik_pemohon"
                            value={pengajuan.nik_pemohon}
                            onChange={handleInputChange}
                            className="flex-1 p-2 border rounded"
                        />
                    </p>
                    <p className="flex">
                        <span className="font-semibold w-60">NO.KK</span>
                        <span className="w-5">:</span>
                        <input
                            type="text"
                            name="nomer_kk"
                            value={dataWarga.nomer_kk || ""}
                            readOnly
                            className="flex-1 p-2 border rounded"
                        />
                    </p>
                    <p className="flex">
                        <label className="font-semibold w-60">
                            Jenis Kelamin
                        </label>
                        <span className="w-5">:</span>
                        <input
                            type="text"
                            name="jenis_kelamin_pemohon"
                            value={pengajuan.jenis_kelamin_pemohon}
                            onChange={handleInputChange}
                            className="flex-1 p-2 border rounded"
                        />
                    </p>
                    <p className="flex">
                        <label className="font-semibold w-60">Agama</label>
                        <span className="w-5">:</span>
                        <input
                            type="text"
                            name="agama_pemohon"
                            value={pengajuan.agama_pemohon}
                            onChange={handleInputChange}
                            className="flex-1 p-2 border rounded"
                        />
                    </p>
                    <p className="flex">
                        <label className="font-semibold w-60">
                            Tempat, tanggal lahir
                        </label>
                        <span className="w-5">:</span>
                        <input
                            type="text"
                            name="tempat_tanggal_lahir_pemohon"
                            value={pengajuan.tempat_tanggal_lahir_pemohon}
                            onChange={handleInputChange}
                            className="flex-1 p-2 border rounded"
                        />
                    </p>
                    <p className="flex">
                        <label className="font-semibold w-60">
                            Alamat/Tempat tinggal
                        </label>
                        <span className="w-5">:</span>
                        <input
                            type="text"
                            name="alamat_pemohon"
                            value={pengajuan.alamat_pemohon}
                            onChange={handleInputChange}
                            className="flex-1 p-2 border rounded"
                        />
                    </p>
                </div>

                {/* Pilihan Pengajuan Surat */}
                <div className="mb-6">
                    <p className="text-gray-700">
                        Benar bahwa yang bersangkutan adalah warga RT.
                        {dataWarga.id_rt} RW.{dataWarga.id_rw} yang beralamat di{" "}
                        {dataWarga.alamat}, dan bermaksud untuk mengurus surat:
                    </p>
                    <div className="mt-4 space-y-2">
                        {[
                            "Pengantar KTP/KK",
                            "Pengantar Akta Kelahiran",
                            "Surat Keterangan Kematian",
                            "Surat Domisili Tempat tinggal",
                            "Surat Domisili Usaha",
                            "Surat Keterangan Tidak Mampu",
                            "Surat SKCK",
                            "Surat Ketenagakerjaan",
                            "Surat pengantar nikah",
                            "Surat Keterangan Pindah",
                            "lainnya:",
                        ].map((jenis, index) => (
                            <label className="flex items-center" key={index}>
                                <input
                                    type="radio"
                                    name="jenis_surat"
                                    value={jenis}
                                    className="form-radio text-blue-600"
                                    checked={selectedJenisSurat === jenis} // Ganti SetSelectedJenisSurat dengan selectedJenisSurat
                                    onChange={handleJenisSuratChange}
                                />
                                <span className="ml-2">{jenis}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Deskripsi Keluhan */}
                <div className="mb-6">
                    <textarea
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Detail Pengajuan"
                        value={description}
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
