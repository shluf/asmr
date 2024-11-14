import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "@/Components/partials/DataTable";
import { columnsRT } from "./data/columnsRT";
import { columnsRW } from "./data/columnsRW";
import { columnsWarga } from "./data/columnsWarga";

const BiodataUser = () => {
    const [dataRT, setDataRT] = useState([]);
    const [dataRW, setDataRW] = useState([]);
    const [dataWarga, setDataWarga] = useState([]);
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
            console.log(response.data)
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    return (
        <div className="w-full p-6">
            <div>
                <h2 className="font-semibold text-lg mb-4 text-blue-5">
                    Data anggota RW
                </h2>
                <DataTable data={dataRW} columns={columnsRW} pageSize={4} isLoading={loading} />
            </div>

            <div className="mt-10">
                <h2 className="font-semibold text-lg mb-4 text-blue-5">
                    Data anggota RT
                </h2>
                <DataTable data={dataRT} columns={columnsRT} pageSize={4} isLoading={loading} />
            </div>

            <div className="mt-10">
                <h2 className="font-semibold text-lg mb-4 text-blue-5">
                    Data Warga
                </h2>
                <DataTable data={dataWarga} columns={columnsWarga} pageSize={10} isLoading={loading} />
            </div>

        </div>
    );
};

export default BiodataUser;