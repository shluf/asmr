import React, { useState, useEffect } from "react";
import axios from "axios";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const BiodataUser = () => {
    const [dataRT, setDataRT] = useState([]);
    const [dataRW, setDataRW] = useState([]);
    const [dataWarga, setDataWarga] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(route("biodataUser"));
            setDataRT(response.data.dataRT);
            setDataRW(response.data.dataRW);
            setDataWarga(response.data.dataWarga);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="w-full p-6">
            <div>
                <h2 className="font-semibold text-lg mb-4 text-blue-5">
                    Data anggota RT/RW
                </h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Jabatan</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Lingkup Rt</TableHead>
                            <TableHead>Alamat</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataRT.map((RT, index) => (
                            <TableRow key={index}>
                                <TableCell>{RT.nama}</TableCell>
                                <TableCell>{RT.nik}</TableCell>
                                <TableCell>{RT.email}</TableCell>
                                <TableCell>{RT.periode}</TableCell>
                                <TableCell>{RT.penangung_jawab_rt}</TableCell>
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
                    Data Warga
                </h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">
                                Nomer KK
                            </TableHead>
                            <TableHead>Nama Warga</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>NIK</TableHead>
                            <TableHead>RT</TableHead>
                            <TableHead>RW</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataWarga.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">
                                    {user.nomerKK}
                                </TableCell>
                                <TableCell>{user.namaWarga}</TableCell>
                                <TableCell>{user.JenisKelamin}</TableCell>
                                <TableCell>{user.NIK}</TableCell>
                                <TableCell>{user.RT}</TableCell>
                                <TableCell>{user.RW}</TableCell>
                                <TableCell>
                                    <button
                                        type="button"
                                        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        view detail
                                    </button>
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
