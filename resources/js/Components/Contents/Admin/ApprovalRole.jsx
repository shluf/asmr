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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import PrimaryButton from "@/Components/PrimaryButton";
import { Check, X } from "lucide-react";

const ApprovalRole = () => {
    const [dataWarga, setDataWarga] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [selectedWarga, setSelectedWarga] = useState(null);
    const [loading, setLoading] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(route("approvalRole"));
            setDataWarga(response.data.warga || []); // Memastikan data tidak null
        } catch (error) {
            console.error("Error fetching data:", error);
            setDataWarga([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = async (nik_warga) => {
        try {
            await axios.post(`/approvalRole/approve/${nik_warga}`);
            setIsAlertOpen(true);
            fetchData(); // Refresh data setelah approve
            setLoading((prev) => ({ ...prev, [nik_warga]: false }));
        } catch (error) {
            console.error("Error approving user:", error);
            alert("Terjadi kesalahan saat mengapprove warga.");
        }
    };

    const handleDisapprove = async (nik_warga) => {
        try {
            await axios.post(`/approvalRole/disapprove/${nik_warga}`);
            setIsAlertOpen(true);
            fetchData(); // Refresh data setelah disapprove
            setLoading((prev) => ({ ...prev, [nik_warga]: false }));
        } catch (error) {
            console.error("Error disapproving user:", error);
            alert("Terjadi kesalahan saat mendisapprove warga.");
        }
    };

    return (
        <div className="w-full p-6">
            <Alert
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                title="Berhasil!!"
                message="Status approval user telah diperbarui"
                iconColor="#4CAF50"
            />
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
                            dataWarga.map((warga) => (
                                <TableRow key={warga.nik_warga}>
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
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button 
                                                    onClick={() => setSelectedWarga(warga)}
                                                    className="text-nowrap border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition"
                                                >
                                                    Lihat data
                                                </button>
                                            </DialogTrigger>
                                            {selectedWarga && (
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Data Lengkap Warga</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div><strong>Nama:</strong> {selectedWarga.nama}</div>
                                                        <div><strong>No KK:</strong> {selectedWarga.nomer_kk}</div>
                                                        <div><strong>NIK:</strong> {selectedWarga.nik_warga}</div>
                                                        <div><strong>RT:</strong> {selectedWarga.id_rt}</div>
                                                        <div><strong>RW:</strong> {selectedWarga.id_rw}</div>
                                                        <div><strong>Status:</strong> {selectedWarga.approved ? "Disetujui" : "Ditolak"}</div>
                                                        <div><strong>Alamat:</strong> {selectedWarga.alamat}</div>
                                                        <div><strong>Tanggal Lahir:</strong> {selectedWarga.tempat_dan_tanggal_lahir}</div>
                                                        <div><strong>Jenis Kelamin:</strong> {selectedWarga.jenis_kelamin}</div>
                                                    </div>
                                                    <div className="flex gap-2 justify-end items-center w-full">
                                                        <PrimaryButton
                                                            color="red"
                                                            rounded='full'
                                                            disabled={loading[selectedWarga.nik_warga]}
                                                            onClick={() => handleDisapprove(selectedWarga.nik_warga)}
                                                        >
                                                            <X className="w-4 h-4 mr-2" />
                                                            Tolak
                                                        </PrimaryButton>
                                                        <PrimaryButton
                                                            color="green"
                                                            rounded='full'
                                                            disabled={loading[selectedWarga.nik_warga]}
                                                            onClick={() => handleApprove(selectedWarga.nik_warga)}
                                                        >
                                                            <Check className="w-4 h-4 mr-2" />
                                                            Setujui
                                                        </PrimaryButton>
                                                    </div>
                                                </DialogContent>
                                            )}
                                        </Dialog>
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
