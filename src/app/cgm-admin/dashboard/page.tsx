'use client'
import IuranMenu from "@/components/iuran-menu";
import Navbar from "@/components/navbar";
import SingleIuran from "@/components/single-iuran";
import TextButton from "@/components/text-button";
import UserListItem from "@/components/user-list-item";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { create } from "zustand";
import * as schema from "@/database/schema";
import * as controller from "@/app/controllers";

interface ThisMonthIuran {
    data: [schema.feesType],
    setData: (data: [schema.feesType]) => void;
}

const useDataIuran = create<ThisMonthIuran>((set) => {
    return {
        data: [{fee_id: 0, fee_amount: 0, fee_date: ""}],
        setData: (data) => set({data})
    }
})

export default function Page(){
    const {data, setData} = useDataIuran();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            localStorage.clear();
            window.location.href = '/cgm-admin/signin';
        }

        controller.iuran_this_month().then((response) => {
            setData(response.data.data);
        }).catch((error: AxiosError) => {
            const {statusCode} = error.response?.data as {statusCode: number};
            if(statusCode === 401){
                localStorage.clear();
                window.location.href = '/cgm-admin/signin';
            }
        })
    }, [])

    return <>
        <Navbar/>
        <div className="mt-24 px-6">
            <h2 className="font-semibold mb-4">Iuran Bulan Ini</h2>
            <SingleIuran title="Oktober 2024" amount="55000"/>
            <div className="flex justify-between items-center mb-4 mt-8">
                <h2 className="font-semibold">Rekapan Iuran Bulanan</h2>
                <TextButton/>
            </div>
            <div className="flex flex-col gap-4">
                <IuranMenu month="Oktober 2024" title="Iuran Bulanan Oktober"/>
                <IuranMenu month="Oktober 2024" title="Iuran Bulanan Oktober"/>
                <IuranMenu month="Oktober 2024" title="Iuran Bulanan Oktober"/>
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