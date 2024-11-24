import React, { useState, useEffect } from "react";
import DataTable from "@/Components/partials/DataTable";
import { columnsRT } from "./data/columnsRT";
import { columnsRW } from "./data/columnsRW";
import { columnsWarga } from "./data/columnsWarga";
import { fetchBiodataUserData } from "@/hooks/Admin";

const BiodataUser = () => {
    const [dataRT, setDataRT] = useState([]);
    const [dataRW, setDataRW] = useState([]);
    const [dataWarga, setDataWarga] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBiodataUserData(setDataRT, setDataRW, setDataWarga, setLoading);
    }, []);

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
                <DataTable data={dataWarga} columns={columnsWarga} setDataWarga={setDataWarga} pageSize={10} hide={{tempat_dan_tanggal_lahir: false, approval: false, alamat: false }} isLoading={loading} />
            </div>

        </div>
    );
};

export default BiodataUser;