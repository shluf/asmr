import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

const BiodataUser = () => {
    const [dataRT, setDataRT] = useState([]);
    const [dataRW, setDataRW] = useState([]);
    const [dataWarga, setDataWarga] = useState([]);
    const [selectedWarga, setSelectedWarga] = useState(null)

    useEffect(() => {
        fetchData();
        // console.log(response)
        console.log(dataWarga)
        console.log(dataRW)
        console.log(dataRT)
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(route("biodataUser"));
            setDataRT(response.data.rt);
            setDataRW(response.data.rw);
            setDataWarga(response.data.warga);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="w-full p-6">
            <div>
                <h2 className="font-semibold text-lg mb-4 text-blue-5">
                    Data anggota RW
                </h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Jabatan</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Periode</TableHead>
                            <TableHead>Penangung Jawab</TableHead>
                            <TableHead>Alamat</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataRW.map((RW, index) => (
                            <TableRow key={index}>
                                <TableCell>{RW.nama}</TableCell>
                                <TableCell>{RW.jabatan}</TableCell>
                                <TableCell>{RW.email}</TableCell>
                                <TableCell>{RW.periode}</TableCell>
                                <TableCell>{RW.penanggung_jawab_rw}</TableCell>
                                <TableCell>{RW.alamat}</TableCell>
                                <TableCell className="text-right">
                                    <button
                                        type="button"
                                        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-pencil-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                        </svg>
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-10">
                <h2 className="font-semibold text-lg mb-4 text-blue-5">
                    Data anggota RT
                </h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Jabatan</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Periode</TableHead>
                            <TableHead>Penangung Jawab</TableHead>
                            <TableHead>Alamat</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataRT.map((RT, index) => (
                            <TableRow key={index}>
                                <TableCell>{RT.nama}</TableCell>
                                <TableCell>{RT.jabatan}</TableCell>
                                <TableCell>{RT.email}</TableCell>
                                <TableCell>{RT.periode}</TableCell>
                                <TableCell>{RT.penanggung_jawab_rt}</TableCell>
                                <TableCell>{RT.alamat}</TableCell>
                                <TableCell className="text-right">
                                    <but
                                        ton
                                        type="button"
                                        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-pencil-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                        </svg>
                                    </but>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-10">
                <h2 className="font-semibold text-lg mb-4 text-blue-5">
                    Data Warga
                </h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">
                                Nomer KK
                            </TableHead>
                            <TableHead>NIK Warga</TableHead>
                            <TableHead>Nama Warga</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>nomer telephone</TableHead>
                            <TableHead>Tempat dan Tanggal Lahir</TableHead>
                            <TableHead>Alamat</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataWarga.map((warga, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">
                                    {warga.nomer_kk}
                                </TableCell>
                                <TableCell>{warga.nik_warga}</TableCell>
                                <TableCell>{warga.nama}</TableCell>
                                <TableCell>{warga.jenis_kelamin}</TableCell>
                                <TableCell>{warga.phone}</TableCell>
                                <TableCell>
                                    {warga.tempat_dan_tanggal_lahir}
                                </TableCell>
                                <TableCell>{warga.alamat}</TableCell>
                                <TableCell>
                                <Dialog>
                    <DialogTrigger asChild>
                      <button 
                        onClick={() => setSelectedWarga(warga)}
                        className="border border-blue-500 text-blue-500 md:px-32 py-2 text-nowrap rounded-full hover:bg-blue-500 hover:text-white transition"
                      >
                        Lihat data
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Data Lengkap Warga</DialogTitle>
                      </DialogHeader>
                      {selectedWarga && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-semibold">Nama:</span>
                            <span className="col-span-3">{selectedWarga.nama}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-semibold">No KK:</span>
                            <span className="col-span-3">{selectedWarga.nomer_kk}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-semibold">NIK:</span>
                            <span className="col-span-3">{selectedWarga.nik_warga}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-semibold">RT:</span>
                            <span className="col-span-3">{selectedWarga.id_rt}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-semibold">RW:</span>
                            <span className="col-span-3">{selectedWarga.id_rw}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-semibold">Status:</span>
                            <span className="col-span-3">{selectedWarga.approved == 1 ? "Disetujui" : "Ditolak"}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-semibold">Alamat:</span>
                            <span className="col-span-3">{selectedWarga.alamat}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-semibold">Tanggal Lahir:</span>
                            <span className="col-span-3">{selectedWarga.tempat_dan_tanggal_lahir}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-semibold">Jenis Kelamin:</span>
                            <span className="col-span-3">{selectedWarga.jenis_kelamin}</span>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default BiodataUser;
