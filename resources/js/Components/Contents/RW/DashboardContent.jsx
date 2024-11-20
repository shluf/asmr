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
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, CirclePlus, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { CircleMinus, Pencil } from "lucide-react";
import { fetchProkerData } from "@/hooks/Common";
import { fetchPengajuanTerbaruData } from "@/hooks/RW";
import PrimaryButton from "@/Components/PrimaryButton";
import { Skeleton } from "@/Components/ui/skeleton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

const DashboardContent = ({ idRW }) => {
    const [dataProker, setDataProker] = useState([]);
    const [pengajuanTerakhir, setPengajuanTerakhir] = useState([]);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [prokerIsLoading, setProkerIsLoading] = useState(true);
    const [editProker, setEditProker] = useState({
        tanggal: "",
        waktu: "",
        jenis_kegiatan: "",
        tempat: "",
        penanggung_jawab: "",
    });

    useEffect(() => {
        fetchProkerData(setDataProker, setProkerIsLoading);
        fetchPengajuanTerbaruData(setPengajuanTerakhir, idRW);
    }, []);

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
            // console.log(response);
            fetchProkerData(setDataProker);
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
            // console.log(response);
            fetchProkerData(setDataProker);
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
            // console.log(response);
            fetchProkerData(setDataProker);
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
                            {prokerIsLoading
                                ? [...Array(3)].map((_, index) => (
                                      <TableRow key={`skeleton-${index}`}>
                                          <TableCell>
                                              <Skeleton className="h-6 w-24" />
                                          </TableCell>
                                          <TableCell>
                                              <Skeleton className="h-6 w-16" />
                                          </TableCell>
                                          <TableCell>
                                              <Skeleton className="h-6 w-32" />
                                          </TableCell>
                                          <TableCell>
                                              <Skeleton className="h-6 w-24" />
                                          </TableCell>
                                          <TableCell>
                                              <Skeleton className="h-6 w-28" />
                                          </TableCell>
                                          <TableCell>
                                              <div className="flex space-x-2">
                                                  <Skeleton className="h-8 w-8 rounded-full" />
                                                  <Skeleton className="h-8 w-8 rounded-full" />
                                              </div>
                                          </TableCell>
                                      </TableRow>
                                  ))
                                : dataProker.map((Proker, index) => (
                                      <TableRow key={index}>
                                          <TableCell className="font-medium text-blue-600">
                                              {Proker.tanggal}
                                          </TableCell>
                                          <TableCell className="text-blue-600">
                                              {Proker.waktu}
                                          </TableCell>
                                          <TableCell>
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
                                                          handleEditApprove(
                                                              Proker
                                                          )
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
                        {/* <TableHeader>
                            <TableRow>
                                <TableHead>Hari/tanggal</TableHead>
                                <TableHead>Waktu</TableHead>
                                <TableHead>Kegiatan</TableHead>
                                <TableHead>Tempat</TableHead>
                                <TableHead>Penanggung jawab</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader> */}
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <InputLabel htmlFor="calendar-button" className="mb-2">Hari/Tanggal</InputLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="calendar-button"
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] justify-start text-left font-normal rounded-full",
                                                    !date &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="m-2" />
                                                {date ? (
                                                    format(date, "PPP")
                                                ) : (
                                                    <span className="m-5">
                                                        --Tambahkan--
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
                                    <InputLabel htmlFor="waktu" className="mb-2">Waktu</InputLabel>
                                    <Input
                                        type="text"
                                        placeholder="--Tambahkan--"
                                        name="waktu"
                                        className="rounded-full"
                                        value={tambahProker.waktu}
                                        onChange={handleTambahChange}
                                    />
                                </TableCell>
                                <TableCell>
                                    <InputLabel htmlFor="jenis_kegiatan" className="mb-2">Kegiatan</InputLabel>
                                    <Input
                                        type="text"
                                        placeholder="--Tambahkan--"
                                        name="jenis_kegiatan"
                                        className="rounded-full"
                                        value={tambahProker.jenis_kegiatan}
                                        onChange={handleTambahChange}
                                    />
                                </TableCell>
                                <TableCell>
                                    <InputLabel htmlFor="tempat" className="mb-2">Tempat</InputLabel>
                                    <Input
                                        type="text"
                                        placeholder="--Tambahkan--"
                                        name="tempat"
                                        className="rounded-full"
                                        value={tambahProker.tempat}
                                        onChange={handleTambahChange}
                                    />
                                </TableCell>
                                <TableCell>
                                    <InputLabel htmlFor="penanggung_jawab" className="mb-2 text-nowrap">Penanggung Jawab</InputLabel>
                                    <Input
                                        type="text"
                                        placeholder="--Tambahkan--"
                                        name="penanggung_jawab"
                                        className="rounded-full"
                                        value={tambahProker.penanggung_jawab}
                                        onChange={handleTambahChange}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-full h-12 w-12 mt-2"
                                        onClick={handleSubmitTambah}
                                    >
                                        <CirclePlus className="w-full h-full" />
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
                        <>
                            {[...Array(2)].map((_, index) => (
                                <Card key={index}>
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                                {[...Array(6)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex flex-col h-full justify-between"
                                                    >
                                                        <Skeleton className="h-4 w-24 mb-2" />
                                                        <Skeleton className="h-4 w-32" />
                                                    </div>
                                                ))}
                                            </div>
                                            <Skeleton className="h-10 w-32 rounded-full" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    ) : !pengajuanTerakhir.data.length > 0 ? (
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                        <ShieldCheck className="h-6 w-6 text-orange" />
                                    </div>
                                    <div className="flex flex-col h-full justify-between">
                                        <p className="font-medium flex items-center h-1/2">
                                            Tidak ada surat pending
                                        </p>
                                        <p className="text-sm flex h-1/2 text-orange">
                                            Semua pengajuan surat telah diproses
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
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
                            <TextInput
                                color="orange"
                                type="date"
                                name="tanggal"
                                value={editProker.tanggal}
                                onChange={handleEditChange}
                                className="w-full border p-2"
                            />
                            <TextInput
                                color="orange"
                                type="text"
                                name="waktu"
                                value={editProker.waktu}
                                onChange={handleEditChange}
                                className="w-full border p-2"
                                placeholder="Waktu"
                            />
                            <TextInput
                                color="orange"
                                type="text"
                                name="jenis_kegiatan"
                                value={editProker.jenis_kegiatan}
                                onChange={handleEditChange}
                                className="w-full border p-2"
                                placeholder="Jenis Kegiatan"
                            />
                            <TextInput
                                color="orange"
                                type="text"
                                name="tempat"
                                value={editProker.tempat}
                                onChange={handleEditChange}
                                className="w-full border p-2"
                                placeholder="Tempat"
                            />
                            <TextInput
                                color="orange"
                                type="text"
                                name="penanggung_jawab"
                                value={editProker.penanggung_jawab}
                                onChange={handleEditChange}
                                className="w-full border p-2"
                                placeholder="Penanggung Jawab"
                            />
                        </div>
                        <DialogFooter>
                            <PrimaryButton
                                color={"yellow"}
                                onClick={() => setShowEditDialog(false)}
                            >
                                Cancel
                            </PrimaryButton>
                            <PrimaryButton
                                color={"green"}
                                onClick={handleSubmitEdit}
                            >
                                Save Changes
                            </PrimaryButton>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default DashboardContent;
