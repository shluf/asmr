import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { UserFilled } from "@/utility/svg-icons";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import axios from "axios";
import { Link } from "@inertiajs/react";
import { ca, id as idLocale } from "date-fns/locale";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, CirclePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CircleMinus, Pencil } from "lucide-react";

const DashboardContent = ({ idRW }) => {
    const [dataProker, setDataProker] = useState([]);
    const [pengajuanTerakhir, setPengajuanTerakhir] = useState([]);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editProker, setEditProker] = useState({
        tanggal: "",
        waktu: "",
        jenis_kegiatan: "",
        tempat: "",
        penanggung_jawab: "",
    });

    useEffect(() => {
        fetchDataProker();
    }, []);
    const fetchDataProker = async () => {
        try {
            const response = await axios.get(route("program-kerja.show"));
            console.log(response.data.proker);
            setDataProker(response.data.proker);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/surat/pengajuan/?id_rw=${idRW}&length=2`
            );
            setPengajuanTerakhir(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleEditChange = (e) => {
        setEditProker({ ...editProker, [e.target.name]: e.target.value });
    };
    //handle edit
    const handleEditApprove = async (Proker) => {
        setEditProker(Proker);
        setShowEditDialog(true);
    };
    //handle delete
    const DeletehandleApprove = async (id) => {
        try {
            const response = await axios.delete(`/program-kerja/delete/${id}`);
            console.log(response);
            fetchDataProker();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    //handle sumbit edit
    const handleSubmitEdit = async () => {
        try {
            const response = await axios.put(
                `/program-kerja/update/${editProker.id_program_kerja}`,
                editProker
            );
            console.log(response);
            fetchDataProker();
            setShowEditDialog(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    //handle submit tambah
    const handleSubmitTambah = async () => {
        try {
            const response = await axios.post(
                `/program-kerja/store`,
                tambahProker
            );
            console.log(response);
            fetchDataProker();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    //Tambah proker
    const [tambahProker, setTambahProker] = useState({
        tanggal: "",
        waktu: "",
        jenis_kegiatan: "",
        tempat: "",
        penanggung_jawab: "",
    });
    const handleTambahChange = (e) => {
        setTambahProker({ ...tambahProker, [e.target.name]: e.target.value });
    };
    //date picker
    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        setTambahProker({
            ...tambahProker,
            tanggal: format(selectedDate, "yyyy-MM-dd"),
        });
    };
    const [date, setDate] = useState();

    return (
        <div className="space-y-8 overflow-hidden w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Kegiatan RT/RW
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Hari/tanggal</TableHead>
                                <TableHead>Waktu</TableHead>
                                <TableHead>Kegiatan</TableHead>
                                <TableHead>Tempat</TableHead>
                                <TableHead>Penanggung jawab</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataProker.map((Proker, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium text-blue-600">
                                        {Proker.tanggal}
                                    </TableCell>
                                    <TableCell className="text-blue-600">
                                        {Proker.waktu}
                                    </TableCell>

                                    <TableCell circle-minus>
                                        {Proker.jenis_kegiatan}
                                    </TableCell>
                                    <TableCell className="text-blue-600">
                                        {Proker.tempat}
                                    </TableCell>
                                    <TableCell>
                                        {Proker.penanggung_jawab}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="rounded-full mt-2"
                                                onClick={() =>
                                                    handleEditApprove(Proker)
                                                }
                                            >
                                                <Pencil size={12} />
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="rounded-full mt-2"
                                                onClick={() =>
                                                    DeletehandleApprove(
                                                        Proker.id_program_kerja
                                                    )
                                                }
                                            >
                                                <CircleMinus size={12} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Hari/tanggal</TableHead>
                                <TableHead>Waktu</TableHead>
                                <TableHead>Kegiatan</TableHead>
                                <TableHead>Tempat</TableHead>
                                <TableHead>Penanggung jawab</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] justify-start text-left font-normal",
                                                    !date &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="m-2" />
                                                {date ? (
                                                    format(date, "PPP")
                                                ) : (
                                                    <span className="m-5">
                                                        Pick a date
                                                    </span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={handleDateChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        placeholder="waktu"
                                        name="waktu"
                                        value={tambahProker.waktu}
                                        onChange={handleTambahChange}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        placeholder="kegiatan"
                                        name="jenis_kegiatan"
                                        value={tambahProker.jenis_kegiatan}
                                        onChange={handleTambahChange}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        placeholder="tempat"
                                        name="tempat"
                                        value={tambahProker.tempat}
                                        onChange={handleTambahChange}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        placeholder="penanggung jawab"
                                        name="penanggung_jawab"
                                        value={tambahProker.penanggung_jawab}
                                        onChange={handleTambahChange}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-full mt-2"
                                        onClick={handleSubmitTambah}
                                    >
                                        <CirclePlus size={12} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Pengajuan Surat Terakhir
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!pengajuanTerakhir.data ? (
                        <>Loading</>
                    ) : !pengajuanTerakhir.data.length > 0 ? (
                        <Alert>
                            <AlertTitle>Tidak ada surat pending</AlertTitle>
                            <AlertDescription>
                                Semua pengajuan surat telah diproses
                            </AlertDescription>
                        </Alert>
                    ) : (
                        pengajuanTerakhir.data.map((submission, index) => (
                            <Card key={index}>
                                <CardContent className="flex items-center p-6">
                                    <div className="w-12 h-12 bg-green-3 rounded-[12px] flex items-center justify-center text-2xl">
                                        <UserFilled size={6} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 md:gap-4 ml-4 w-full justify-center items-center">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 justify-center">
                                            <div>
                                                <p className="font-medium mt-2 text-left">
                                                    Tanggal pengajuan
                                                </p>
                                                <p className="font-medium text-sm text-blue-600 text-left">
                                                    {format(
                                                        new Date(
                                                            submission.created_at
                                                        ),
                                                        "EEEE, dd MMMM yyyy",
                                                        {
                                                            locale: idLocale,
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-medium mt-2 text-left">
                                                    Keperluan
                                                </p>
                                                <p className="font-medium text-sm text-blue-600 text-left">
                                                    {submission.jenis_surat}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 justify-center">
                                            <div>
                                                <p className="font-medium mt-2 text-left">
                                                    Status tindak lanjut
                                                </p>
                                                <p className="font-medium text-sm text-blue-600 text-left">
                                                    {submission.status_approval}
                                                </p>
                                            </div>
                                            <Link href="/dashboard/rekapPengajuan">
                                                <Button
                                                    variant="outline"
                                                    className="rounded-full mt-2"
                                                >
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </CardContent>
            </Card>

            {/* Dialog for Editing */}
            {showEditDialog && (
                <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Program Kerja</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <input
                                type="date"
                                name="tanggal"
                                value={editProker.tanggal}
                                onChange={handleEditChange}
                                className="w-full border p-2"
                            />
                            <input
                                type="text"
                                name="waktu"
                                value={editProker.waktu}
                                onChange={handleEditChange}
                                className="w-full border p-2"
                                placeholder="Waktu"
                            />
                            <input
                                type="text"
                                name="jenis_kegiatan"
                                value={editProker.jenis_kegiatan}
                                onChange={handleEditChange}
                                className="w-full border p-2"
                                placeholder="Jenis Kegiatan"
                            />
                            <input
                                type="text"
                                name="tempat"
                                value={editProker.tempat}
                                onChange={handleEditChange}
                                className="w-full border p-2"
                                placeholder="Tempat"
                            />
                            <input
                                type="text"
                                name="penanggung_jawab"
                                value={editProker.penanggung_jawab}
                                onChange={handleEditChange}
                                className="w-full border p-2"
                                placeholder="Penanggung Jawab"
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setShowEditDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleSubmitEdit}>
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default DashboardContent;
