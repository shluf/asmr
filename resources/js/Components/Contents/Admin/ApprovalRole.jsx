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

const ApprovalRole = () => {
    const [dataWarga, setDataWarga] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(route("approvalRole"));
            setDataWarga(response.data.warga);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleApprove = async (nik_warga) => {
        try {
            const response = await axios.post(
                `/approvalRole/approve/${nik_warga}`
            );
            alert(response.data.message);
            fetchData(); // Refresh data setelah approve
        } catch (error) {
            console.error("Error approving user:", error);
            alert("Terjadi kesalahan saat mengapprove warga.");
        }
    };

    const handleDisapprove = async (nik_warga) => {
        try {
            const response = await axios.post(
                `/approvalRole/disapprove/${nik_warga}`
            );
            alert(response.data.message);
            fetchData(); // Refresh data setelah disapprove
        } catch (error) {
            console.error("Error disapproving user:", error);
            alert("Terjadi kesalahan saat mendisapprove warga.");
        }
    };
    return (
        <div className="w-full p-6">
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
                            <TableHead>RT</TableHead>
                            <TableHead>RW</TableHead>
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
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleApprove(warga.nik_warga)
                                        }
                                    >
                                        <img
                                            src="/img/check-circle.svg"
                                            alt="Check Circle"
                                        />
                                    </button>
                                </TableCell>
                                <TableCell>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDisapprove(warga.nik_warga)
                                        }
                                    >
                                        <img
                                            src="/img/x-circle.svg"
                                            alt="x Circle"
                                        />
                                    </button>
                                </TableCell>
                                <TableCell>
                                    <button
                                        type="button"
                                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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

export default ApprovalRole;
