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

    const handleSubmit = async () => {
        console.log("Submitting data:", {
            id_warga: dataWarga.id,
            id_rt: dataWarga.id_rt,
            id_rw: dataWarga.id_rw,
            jenis_surat: selectedJenisSurat,
            status_pengajuan: "pending",

            deskripsi: description,
        });
        try {
            const response = await axios.post(route("pengajuan.store"), {
                id_warga: dataWarga.id,
                id_rt: dataWarga.id_rt,
                id_rw: dataWarga.id_rw,
                jenis_surat: selectedJenisSurat,
                status_pengajuan: "pending",
                deskripsi: description,
            });
            alert("Pengajuan berhasil diajukan!");
        } catch (error) {
            console.error("Error submitting pengajuan:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">
                    Form Pengajuan
                </h2>
                <p className="text-gray-600 mb-4">
                    Mohon Isi Formulir dengan Benar untuk Mempercepat Proses
                    Layanan Anda
                </p>

                {/* Informasi Warga */}
                <div className="mb-6">
                    <p className="text-gray-700">
                        Yang bertanda tangan di bawah ini Ketua RT. 02 RW. 01,
                        Kelurahan Belian, Kecamatan Batam Kota, memberikan
                        keterangan kepada:
                    </p>
                    <div className="text-gray-800 mt-4 space-y-1">
                        <p>
                            <span className="font-semibold">Nama:</span>{" "}
                            {dataWarga.nama}
                        </p>
                        <p>
                            <span className="font-semibold">NIK:</span>{" "}
                            {dataWarga.nik_warga}
                        </p>
                        <p>
                            <span className="font-semibold">NO.KK:</span>{" "}
                            {dataWarga.nomer_kk}
                        </p>
                        <p>
                            <span className="font-semibold">
                                Jenis Kelamin:
                            </span>{" "}
                            {dataWarga.jenis_kelamin}
                        </p>
                        <p>
                            <span className="font-semibold">Agama:</span>{" "}
                            {dataWarga.agama}
                        </p>
                        <p>
                            <span className="font-semibold">
                                Tempat, tanggal lahir:
                            </span>{" "}
                            {dataWarga.tempat_dan_tanggal_lahir}
                        </p>
                        <p>
                            <span className="font-semibold">
                                Alamat/Tempat tinggal:
                            </span>{" "}
                            {dataWarga.alamat}
                        </p>
                    </div>
                </div>

                {/* Pilihan Pengajuan Surat */}
                <div className="mb-6">
                    <p className="text-gray-700">
                        Benar bahwa yang bersangkutan adalah warga RT.02 RW.01
                        Kelurahan Belian Kecamatan Batam Kota, dan bermaksud
                        untuk mengurus surat:
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
                        placeholder="Deskripsi keluhan"
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
