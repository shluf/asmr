import axios from "axios";

export const fetchApprovalRoleData = async (setIsLoading, setDataWarga) => {
    setIsLoading(true);
    try {
        const response = await axios.get(route("approvalRole"));
        setDataWarga(response.data.warga || []); 
    } catch (error) {
        console.error("Error fetching data:", error);
        setDataWarga([]);
    } finally {
        setIsLoading(false);
    }
};

export const fetchBiodataUserData = async (setDataRT, setDataRW, setDataWarga, setLoading) => {
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


export const fetchRtRwStats = async (setRtRwStats) => {
    try {
        const response = await axios.get("/CountUser");
        setRtRwStats([
            {
                label: "Populasi Staff ",
                value: response.data.CountRtDanRw,
            },
            {
                label: "Total Pengajuan Surat",
                value: response.data.CountPengajuanSurat,
            },
            {
                label: "Total Pengajuan Dalam Proses",
                value: response.data.CountDataPengajuanPending,
            },
            {
                label: "Total Pengajuan Menunggu Tindakan",
                value: response.data.CountDataPengajuanSelesai,
            },
        ]);
    } catch (error) {
        console.error("Error fetching warga stats:", error);
    }
};

export const fetchWargaStats = async (setWargaStats) => {
    try {
        const response = await axios.get("/CountUser");
        setWargaStats([
            {
                label: "Populasi Warga",
                value: response.data.CountWarga,
            },
            {
                label: "Total Pengajuan Surat",
                value: response.data.CountPengajuanSurat,
            },
            {
                label: "Total Pengajuan Dalam Proses",
                value: response.data.CountDataPengajuanPending,
            },
            {
                label: "Total Pengajuan Menunggu Tindakan",
                value: response.data.CountDataPengajuanSelesai,
            },
        ]);
    } catch (error) {
        console.error("Error fetching warga stats:", error);
    }
};

export const fetchWargaPendingData = async (setDataWarga, setIsLoading) => {
    try {
        const response = await axios.get(route("pendingWarga"));
        setDataWarga(response.data.warga);
        setIsLoading(false)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const fetchRekapPengajuanData = async (setRekapSurat) => {
    try {
        const response = await axios.get(`/surat/pengajuan/`);
        setRekapSurat(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};