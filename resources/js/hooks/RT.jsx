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

export const fetchRekapRTData = async (idRT, setPendingSurat) => {
    try {
        const response = await axios.get(`/surat/pengajuan/?id_rt=${idRT}`);
        setPendingSurat(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const fetchPendingRTData = async (idRT, setPendingSurat) => {
    try {
        const response = await axios.get(`/surat/pending/rt/${idRT}`);
        setPendingSurat(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const handleApprovalPengajuan = async (id_pengajuan_surat, status, loading, setLoading, idRT, setPendingSurat) => {
    setLoading({ ...loading, [id_pengajuan_surat]: true });

    try {
        await axios.put(`/surat/approval/${id_pengajuan_surat}`, {
        status_approval: status,
        approver_type: 'rt',
        id_approver: idRT
        });

        fetchPendingRTData(idRT, setPendingSurat);
        
    } catch (error) {
        console.error('Error updating status:', error);
    }

    setLoading({ ...loading, [id_pengajuan_surat]: false });
};
