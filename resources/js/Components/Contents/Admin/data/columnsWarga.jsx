import { Button } from "@/Components/ui/button";
import { ArrowUpDown, Check, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import axios from "axios";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";

export const columnsWarga = [
    {
        accessorKey: "nomer_kk",
        header: () => <div className="text-center">Nomor KK</div>,
        cell: ({ row }) => {
            return <div className="text-left font-medium">{row.getValue("nomer_kk")}</div>;
        },
    },
    {
        accessorKey: "nama",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("nama")}</div>
        ),
    },
    {
        accessorKey: "jenis_kelamin",
        header: () => <div className="text-center">Jenis Kelamin</div>,
        cell: ({ row }) => {
            return <div className="text-left font-medium">{row.getValue("jenis_kelamin") === "L" ? "Laki-laki" : "Perempuan"}</div>;
        },
    },
    {
        accessorKey: "nik_warga",
        header: () => <div className="text-center">NIK</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("nik_warga")}</div>;
        },
    },
    {
        accessorKey: "id_rt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    RT
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div className="text-center font-medium">{row.getValue("id_rt")}</div>;
        },
    },
    {
        accessorKey: "id_rw",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    RW
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div className="text-center font-medium">{row.getValue("id_rw")}</div>;
        },
    },
    {
        accessorKey: "phone",
        header: () => <div className="text-left">Nomor Telp</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("phone")}</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div className="text-center">Action</div>,
        cell: ({ row }) => {
            const nikWarga = row.getValue("nik_warga");
            const [loading, setLoading] = useState({});

            const handleApprove = async (nik_warga) => {
                setLoading((prev) => ({ ...prev, [nik_warga]: true }));
                try {
                    await axios.post(`/approvalRole/approve/${nik_warga}`);
                    setLoading((prev) => ({ ...prev, [nik_warga]: false }));
                } catch (error) {
                    console.error("Error approving user:", error);
                    alert("Terjadi kesalahan saat mengapprove warga.");
                    setLoading((prev) => ({ ...prev, [nik_warga]: false }));
                }
            };

            const handleDisapprove = async (nik_warga) => {
                setLoading((prev) => ({ ...prev, [nik_warga]: true }));
                try {
                    await axios.post(`/approvalRole/disapprove/${nik_warga}`);
                    setLoading((prev) => ({ ...prev, [nik_warga]: false }));
                } catch (error) {
                    console.error("Error disapproving user:", error);
                    alert("Terjadi kesalahan saat mendisapprove warga.");
                    setLoading((prev) => ({ ...prev, [nik_warga]: false }));
                }
            };

            return (
                <div className="text-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button 
                                className="text-nowrap border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition"
                            >
                                Lihat data
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Data Lengkap Warga</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <DataField label="Nama" value={row.getValue("nama")} />
                                <DataField label="No KK" value={row.getValue("nomer_kk")} />
                                <DataField label="NIK" value={row.getValue("nik_warga")} />
                                <DataField label="RT" value={row.getValue("id_rt")} />
                                <DataField label="RW" value={row.getValue("id_rw")} />
                                <DataField 
                                    label="Status" 
                                    value={row.getValue("approved") === 1 ? "Disetujui" : "Ditolak"} 
                                />
                                <DataField label="Alamat" value={row.getValue("alamat")} />
                                <DataField 
                                    label="Tanggal Lahir" 
                                    value={row.getValue("tempat_dan_tanggal_lahir")} 
                                />
                                <DataField 
                                    label="Jenis Kelamin" 
                                    value={row.getValue("jenis_kelamin")} 
                                />
                                <div className="flex gap-2 justify-end items-center w-full">
                                    <PrimaryButton
                                        color="red"
                                        rounded='full'
                                        disabled={loading[nikWarga]}
                                        onClick={() => handleDisapprove(nikWarga)}
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Tolak
                                    </PrimaryButton>
                                    <PrimaryButton
                                        color="green"
                                        rounded='full'
                                        disabled={loading[nikWarga]}
                                        onClick={() => handleApprove(nikWarga)}
                                    >
                                        <Check className="w-4 h-4 mr-2" />
                                        Setujui
                                    </PrimaryButton>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        },
    },
];

const DataField = ({ label, value }) => (
    <div className="grid grid-cols-4 items-center gap-4">
        <span className="font-semibold">{label}:</span>
        <span className="col-span-3">{value}</span>
    </div>
);
