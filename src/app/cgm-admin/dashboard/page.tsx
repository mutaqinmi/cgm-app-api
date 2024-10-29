'use client'
import IuranMenu from "@/components/iuran-menu";
import Navbar from "@/components/navbar";
import SingleIuran from "@/components/single-iuran";
import TextButton from "@/components/text-button";
import UserListItem from "@/components/user-list-item";

export default function Page(){
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
                <UserListItem address="Perum CGM, Blok A. 23" name="Repat Dwi Gunanda" phone="08123456789"/>
            </div>
        </div>
    </>
}