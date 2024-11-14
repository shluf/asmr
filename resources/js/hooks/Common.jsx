import axios from "axios";

export const fetchProkerData = async (setDataProker, setProkerIsLoading) => {
    try {
        const response = await axios.get(route("program-kerja.show"));
        // console.log(response.data.proker);
        setDataProker(response.data.proker);
        setProkerIsLoading(false)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};