import React from "react";
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
    const dataWarga = [
        {
            nomerKK: "111111",
            namaWarga: "Agus Waluyo",
            JenisKelamin: "Laki-Laki",
            NIK: "123242526",
            RT: "001",
            RW: "002",
        },
    ];
    const handleApprove = (id) => {
        Inertia.post(
            `/approve-user/${id}`,
            {},
            {
                onSuccess: () => {
                    alert("Akun warga berhasil diaktifkan.");
                },
                onError: () => {
                    alert("Terjadi kesalahan. Silakan coba lagi.");
                },
            }
        );
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
                                        onClick={() => handleApprove(user.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-check-circle"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                        </svg>
                                    </button>
                                </TableCell>
                                <TableCell>
                                    <button type="button">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-x-circle"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </button>
                                </TableCell>
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

export default ApprovalRole;
