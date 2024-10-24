import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export const columns = [
    {
        accessorKey: "nama",
        header: "Nama",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("nama")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "nik",
        header: () => <div className="text-right">NIK</div>,
        cell: ({ row }) => {
            const amount = row.getValue("nik");
            return <div className="text-right font-medium">{amount}</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <button
                    type="button"
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                </button>
            );
        },
    },
];

const DataTable = ({ data, pageSize = 5 }) => {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        pageCount: Math.ceil(data.length / pageSize),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize,
            },
        },
    });

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter emails..."
                    value={table.getColumn("email")?.getFilterValue() ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <div className="flex items-center space-x-1">
                        {Array.from({ length: table.getPageCount() }, (_, i) => (
                            <Button
                                key={i}
                                variant={table.getState().pagination.pageIndex === i ? "default" : "outline"}
                                size="sm"
                                onClick={() => table.setPageIndex(i)}
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

const BiodataUser = () => {
    const [dataRT, setDataRT] = useState([]);
    const [dataRW, setDataRW] = useState([]);
    const [dataWarga, setDataWarga] = useState([]);
    const [selectedWarga, setSelectedWarga] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(route("biodataUser"));
            setDataRT(response.data.rt);
            setDataRW(response.data.rw);
            setDataWarga(response.data.warga);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full p-6">
            <div>
                <h2 className="font-semibold text-lg mb-4 text-blue-5">
                    Data anggota RW
                </h2>
                <DataTable data={dataRW} pageSize={1} />
            </div>

            <div className="mt-10">
                <h2 className="font-semibold text-lg mb-4 text-blue-5">
                    Data anggota RT
                </h2>
                <DataTable data={dataRT} pageSize={5} />
            </div>

            <div className="mt-10">
                <h2 className="font-semibold text-lg mb-4 text-blue-5">
                    Data Warga
                </h2>
                <DataTable data={dataWarga} pageSize={10} />
            </div>

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
        </div>
    );
};

export default BiodataUser;