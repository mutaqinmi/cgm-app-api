'use client'
import IuranMenu from "@/components/iuran-menu";
import Navbar from "@/components/navbar";
import SingleIuran from "@/components/single-iuran";
import TextButton from "@/components/text-button";
import UserListItem from "@/components/user-list-item";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect } from "react";
import { create } from "zustand";
import * as schema from "@/database/schema";
import * as date from "@/lib/date";

interface ThisMonthIuran {
    thisMonthData: [schema.feesType],
    setThisMonthData: (data: [schema.feesType]) => void;
}

interface AllIuran {
    allIuranData: [],
    setAllIuranData: (data: []) => void;
}

const useThisMonthDataIuran = create<ThisMonthIuran>((set) => {
    return {
        thisMonthData: [{fee_id: 0, fee_amount: 0, fee_date: ""}],
        setThisMonthData: (thisMonthData) => set({thisMonthData})
    }
})

const useAllIuranData = create<AllIuran>((set) => {
    return {
        allIuranData: [],
        setAllIuranData: (allIuranData) => set({allIuranData})
    }
})

export default function Page(){
    const {thisMonthData, setThisMonthData} = useThisMonthDataIuran();
    const {allIuranData, setAllIuranData} = useAllIuranData();

    const iuran_this_month_api = useCallback(async () => {
        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/iuran?month=10&year=2024`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, [])

    const all_iuran_api = useCallback(async () => {
        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/iuran`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, [])

    useEffect(() => {
        iuran_this_month_api().then((response: AxiosResponse) => {
            const { data } = response.data as {data: [schema.feesType]};
            setThisMonthData(data);
        }).catch((error: AxiosError) => {
            const {message} = error.response?.data as {message: string};
            console.log(message);
        })

        all_iuran_api().then((response: AxiosResponse) => {
            const { data } = response.data as {data: []};
            setAllIuranData(data);
        }).catch((error: AxiosError) => {
            const {message} = error.response?.data as {message: string};
            console.log(message);
        })
    }, [])

    return <>
        <Navbar/>
        <div className="mt-24 px-6">
            <h2 className="font-semibold mb-4">Iuran Bulan Ini</h2>
            <SingleIuran title={date.toString(thisMonthData[0].fee_date as string)} amount={thisMonthData[0].fee_amount as number}/>
            <div className="flex justify-between items-center mb-4 mt-8">
                <h2 className="font-semibold">Rekapan Iuran Bulanan</h2>
                <TextButton/>
            </div>
            <div className="flex flex-col gap-4">
                {allIuranData.map((data: {payments: schema.paymentsType, fees: schema.feesType}) => {
                    return <IuranMenu key={data.fees.fee_id} month={date.toString(data.fees.fee_date as string)} title={`Iuran Bulanan ${date.toString(data.fees.fee_date as string).split(' ')[0]}`}/>
                })}
            </div>
            <div className="flex justify-between items-center mb-4 mt-8">
                <h2 className="font-semibold">Aktivitas Terbaru</h2>
                <TextButton/>
            </div>
            <div className="flex flex-col gap-4">
                <UserListItem address="Perum CGM, Blok A. 23" name="Repat Dwi Gunanda" phone="08123456789" state="waiting"/>
                <UserListItem address="Perum CGM, Blok A. 23" name="Repat Dwi Gunanda" phone="08123456789" state="done"/>
                <UserListItem address="Perum CGM, Blok A. 23" name="Repat Dwi Gunanda" phone="08123456789" state="undone"/>
            </div>
        </div>
    </>
}