'use client'
import IuranMenu from "@/components/iuran-menu";
import Navbar from "@/components/navbar";
import { useCallback, useEffect, useState } from "react";
import { create } from "zustand";
import * as schema from "@/database/schema";
import { useRouter } from "next/navigation";
import axios, { AxiosError, AxiosResponse } from "axios";
import * as date from "@/lib/date";
import LoadingAnimation from "@/components/loading-animation";

interface Iuran {
    allIuranData: [],
    setAllIuranData: (data: []) => void;
}

const useIuran = create<Iuran>((set) => {
    return {
        allIuranData: [],
        setAllIuranData: (allIuranData) => set({allIuranData}),
    }
})

export default function Page(){
    const route = useRouter();
    const {allIuranData, setAllIuranData} = useIuran();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const groupByYear = (data: schema.feesType[]) => {
        return data.reduce((acc, item) => {
            const year = item.fee_date!.split('-')[0];
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(item);
            return acc;
        }, {} as { [key: string]: schema.feesType[] });
    };

    const all_iuran_api = useCallback(async () => {
        setIsLoading(true);

        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/iuran`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response: AxiosResponse) => {
            const { data } = response.data as {data: []};
            setAllIuranData(data);
        }).catch((error: AxiosError) => {
            const {message} = error.response?.data as {message: string};
            console.log(message);
        }).finally(() => setIsLoading(false));
    }, [])

    useEffect(() => {
        all_iuran_api()
    }, [all_iuran_api])

    const groupData = groupByYear(allIuranData);

    return isLoading ? <LoadingAnimation/> : <>
        <Navbar/>
        <div className="my-24 px-6">
            <div className="flex flex-col-reverse gap-4">
                {Object.keys(groupData).map((year) => (
                    <div key={year}>
                        <h2 className="text-lg font-semibold mb-2 text-gray-500">{year}</h2>
                        <div className="flex flex-col gap-4">
                            {groupData[year].map((data: schema.feesType) => (
                                <IuranMenu key={data.fee_id} month={date.toString(data.fee_date!)} title={`Iuran Bulanan ${date.toString(data.fee_date!).split(' ')[0]}`} onClick={() => route.push(`/cgm-admin/iuran?fee_id=${data.fee_id}`)}/>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
}