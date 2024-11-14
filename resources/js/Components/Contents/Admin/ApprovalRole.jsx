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
import { Skeleton } from "@/Components/ui/skeleton";
import Alert from "@/Components/partials/Alert";

const ApprovalRole = () => {
    const [dataWarga, setDataWarga] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(route("approvalRole"));
            setDataWarga(response.data.warga);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleApprove = async (nik_warga) => {
        try {
            const response = await axios.post(`/approvalRole/approve/${nik_warga}`);
            setIsAlertOpen(true)
            fetchData(); // Refresh data setelah approve
        } catch (error) {
            console.error("Error approving user:", error);
            alert("Terjadi kesalahan saat mengapprove warga.");
        }
    };

    const handleDisapprove = async (nik_warga) => {
        try {
            const response = await axios.post(`/approvalRole/disapprove/${nik_warga}`);
            setIsAlertOpen(true)
            fetchData(); // Refresh data setelah disapprove
        } catch (error) {
            console.error("Error disapproving user:", error);
            alert("Terjadi kesalahan saat mendisapprove warga.");
        }
    };

    return (
        <div className="w-full p-6">
            <div>
                <Alert
                    isOpen={isAlertOpen}
                    onClose={() => setIsAlertOpen(false)}
                    title="Berhasil!!"
                    message="Status approval user telah diperbarui"
                    iconColor="#4CAF50"
                />
            </div>
            <div className="mt-10">
                <h2 className="font-semibold text-lg mb-4">
                    Permintaan Role
                </h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nomor KK</TableHead>
                            <TableHead>NIK Warga</TableHead>
                            <TableHead>Nama Warga</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>Nomor Telepon</TableHead>
                            <TableHead>Tempat dan Tanggal Lahir</TableHead>
                            <TableHead>Alamat</TableHead>
                            <TableHead>Approval</TableHead>
                            <TableHead className="text-center">Aksi</TableHead>
                            <TableHead className="text-center">Detail</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array(5).fill(null).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Skeleton className="h-6 w-6 rounded-full" />
                                            <Skeleton className="h-6 w-6 rounded-full" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            dataWarga.map((warga, index) => (
                                <TableRow key={warga.nik_warga || index}>
                                    <TableCell className="font-medium">{warga.nomer_kk}</TableCell>
                                    <TableCell>{warga.nik_warga}</TableCell>
                                    <TableCell>{warga.nama}</TableCell>
                                    <TableCell>{warga.jenis_kelamin}</TableCell>
                                    <TableCell>{warga.phone}</TableCell>
                                    <TableCell>{warga.tempat_dan_tanggal_lahir}</TableCell>
                                    <TableCell>{warga.alamat}</TableCell>
                                    <TableCell>{warga.approved ? "Approved" : "Not Approved"}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => handleApprove(warga.nik_warga)}
                                                aria-label="Approve Warga"
                                                className="w-10 h-10"
                                            >
                                                <img className="w-6 h-6" src="/img/check-circle.svg" alt="Approve" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDisapprove(warga.nik_warga)}
                                                aria-label="Disapprove Warga"
                                                className="w-10 h-10"
                                            >
                                                <img className="w-6 h-6" src="/img/x-circle.svg" alt="Disapprove" />
                                            </button>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <button
                                            type="button"
                                            className="text-nowrap py-2.5 px-5 mt-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                            >
                                            View Detail
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ApprovalRole;
