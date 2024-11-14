import axios from "axios";

export const fetchPengajuanTerbaruData = async (setPengajuanTerakhir, idRW) => {
    try {
        const response = await axios.get(
            `/surat/pengajuan/?id_rw=${idRW}&length=2`
        );
        setPengajuanTerakhir(response.data);
        return true
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const fetchPengajuanMasalahData = async (setPendingSurat, idRW) => {
    try {
        const response = await axios.get(`/surat/pending/rw/${idRW}`);
        setPendingSurat(response.data);
        return true
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};