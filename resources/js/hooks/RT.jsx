import axios from "axios";

export const fetchPengajuanTerbaruData = async (setPengajuanTerakhir, idRT) => {
    try {
        const response = await axios.get(
            `/surat/pengajuan/?id_rt=${idRT}&length=2`
        );
        setPengajuanTerakhir(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
