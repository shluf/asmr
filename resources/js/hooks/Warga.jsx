import axios from "axios";

export const fetchHistoryData = async (setDataPengajuan, nikWarga, setIsLoading) => {
    try {
        const response = await axios.get(`/history-warga/${nikWarga}`);
        // console.log(response.data.pengajuan);
        setDataPengajuan(response.data);
        setIsLoading(false)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const fetchPengajuanData = async (setDataPengajuan, setPengajuanIsLoading) => {
    try {
        const response = await axios.get(route("pengajuan.surat"));
        // console.log(response.data.pengajuan);
        setDataPengajuan(response.data.pengajuan);
        setPengajuanIsLoading(false)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const fetchPengajuanWargaData = async (setDataWarga, setLoading) => {
    try {
        const response = await axios.get(route("pengajuan"));
        setDataWarga(response.data.warga);
        setLoading(false);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const fetchAkunData = async (setProfileWarga, setData, nikWarga) => {
    try {
      const response = await axios.get(`/profile-warga/${nikWarga}`);
      if (response.data.status === 'success') {
        setProfileWarga(response.data.data);
        
        // Pre-fill form data
        setData({
          phone: response.data.data.phone || "",
          alamat: response.data.data.alamat || "",
          kabupaten: response.data.data.kabupaten || "",
          provinsi: response.data.data.provinsi || "",
          agama: response.data.data.agama || "",
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };