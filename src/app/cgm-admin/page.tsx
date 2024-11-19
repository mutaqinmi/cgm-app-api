'use client';
import Chart from "@/components/chart";
import Logo from "@/components/logo";
import { Bell, CaretRight, ChartBar, HandCoins, SignOut, User, Users, Plus, MagnifyingGlass, CaretDown, Funnel, Pencil, ArrowSquareOut, Eye, EyeSlash, CaretLeft, XCircle, Trash, CheckCircle, DotsThreeVertical, Phone, MapPin, X, List  } from "@phosphor-icons/react";
import { create } from "zustand";
import Link from 'next/link';
import { useRef, useState } from "react";
import * as date from "@/lib/date";
import SideBar from "@/components/sidebar";
import LoadingAnimation from "@/components/loading-animation";

interface ComponentState {
    navbarIndex: number,
    filterDataIndex: number,
    showContextMenu: boolean,
    selectedContext: string,
    filterStatusIndex: number,
    showNotification: boolean,
    profileSelectedIndex: number,
    selectedUserID: number,
    showSidebar: boolean,
    isLoading: boolean,
    setNavbarIndex: (index: number) => void,
    setFilterDataIndex: (index: number) => void,
    setShowContextMenu: (show: boolean) => void,
    setSelectedContext: (context: string) => void,
    setFilterStatusIndex: (index: number) => void,
    setShowNotification: (show: boolean) => void,
    setProfileSelectedIndex: (index: number) => void,
    setSelectedUserID: (id: number) => void,
    setShowSidebar: (show: boolean) => void,
    setIsLoading: (loading: boolean) => void,
}

const useComponent = create<ComponentState>((set) => {
    return {
        navbarIndex: 0,
        filterDataIndex: 0,
        showContextMenu: false,
        selectedContext: 'Semua RT',
        filterStatusIndex: 0,
        showNotification: false,
        profileSelectedIndex: 0,
        selectedUserID: 0,
        showSidebar: false,
        isLoading: false,
        setNavbarIndex: (index: number) => set({navbarIndex: index}),
        setFilterDataIndex: (index: number) => set({filterDataIndex: index}),
        setShowContextMenu: (show: boolean) => set({showContextMenu: show}),
        setSelectedContext: (context: string) => set({selectedContext: context}),
        setFilterStatusIndex: (index: number) => set({filterStatusIndex: index}),
        setShowNotification: (show: boolean) => set({showNotification: show}),
        setProfileSelectedIndex: (index: number) => set({profileSelectedIndex: index}),
        setSelectedUserID: (id: number) => set({selectedUserID: id}),
        setShowSidebar: (show: boolean) => set({showSidebar: show}),
        setIsLoading: (loading: boolean) => set({isLoading: loading}),
    }
})

export default function Page(){
    const component = useComponent();

    return component.isLoading ? <LoadingAnimation/> : <div>
        <SideBar sidebarState={component.showSidebar} sidebarController={component.setShowSidebar} navbarState={component.navbarIndex} navbarController={component.setNavbarIndex} loadingController={component.setIsLoading}/>
        <div className="flex w-full py-6 px-4 md:px-8 md:pl-72 z-40 justify-between items-center bg-white fixed top-0">
            <div className="flex items-center gap-4">
                <List size={24} onClick={() => component.setShowSidebar(true)} className="md:hidden"/>
                <h1 className="text-2xl font-semibold">{(() => {
                    if(component.navbarIndex === 0) return 'Dashboard';
                    if(component.navbarIndex === 1) return 'Iuran';
                    if(component.navbarIndex === 2) return 'Warga';
                    if(component.navbarIndex === 3) return 'Tentang Saya';
                })()}</h1>
            </div>
            <div className="flex flex-row-reverse justify-center items-center gap-4">
                <Bell size={32} onClick={() => component.setShowNotification(!component.showNotification)}/>
            </div>
            {component.showNotification ? <div className="bg-white w-80 md:w-96 p-4 rounded-lg shadow-md shadow-gray-300 absolute right-8 -top-0 mt-20 flex flex-col gap-4">
                <div className="flex gap-4 justify-start items-center">
                    <div className="p-3 bg-blue-200 rounded-lg">
                        <Bell className="text-blue-500" size={18}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-400">Senin, 11 November 2024 06.34</span>
                        <span className="text-sm">Aktivitas login terdeteksi, Anda login pada perangkat A-113B. Jika bukan anda, segera amankan akun anda!</span>
                    </div>
                </div>
                <div className="flex gap-4 justify-start items-center">
                    <div className="p-3 bg-blue-200 rounded-lg">
                        <Bell className="text-blue-500" size={18}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-400">Senin, 11 November 2024 06.34</span>
                        <span className="text-sm">Aktivitas login terdeteksi, Anda login pada perangkat A-113B. Jika bukan anda, segera amankan akun anda!</span>
                    </div>
                </div>
                <div className="flex gap-4 justify-start items-center">
                    <div className="p-3 bg-blue-200 rounded-lg">
                        <Bell className="text-blue-500" size={18}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-400">Senin, 11 November 2024 06.34</span>
                        <span className="text-sm">Aktivitas login terdeteksi, Anda login pada perangkat A-113B. Jika bukan anda, segera amankan akun anda!</span>
                    </div>
                </div>
            </div> : null}
        </div>
        <div className="md:ml-64 mt-12 p-4 md:p-8">
            {(() => {
                if(component.navbarIndex === 0){
                    return <Dashboard/>;
                } else if (component.navbarIndex === 1){
                    return <Iuran/>;
                } else if (component.navbarIndex === 2){
                    if(component.selectedUserID !== 0){
                        return <DetailWarga/>;
                    }
                    
                    return <Warga/>;
                } else if (component.navbarIndex === 3){
                    return <Tentang/>;
                }
            })()}
        </div>
    </div>
}

function Dashboard() {
    const component = useComponent();

    return <>
        <div className="mt-8">
            <h1 className="font-semibold text-lg">Iuran Bulan Ini</h1>
        </div>
        <div className="w-full mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="w-full col-span-1 bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-2 md:p-3 bg-blue-200 rounded-lg">
                    <Users className="text-blue-500 text-lg md:text-4xl"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Jumlah warga</span>
                    <span className="text-2xl font-semibold">40</span>
                    <span className="text-xs md:text-sm text-blue-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div>
            <div className="w-full col-span-1 bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-2 md:p-3 bg-green-200 rounded-lg">
                    <Users className="text-green-500 text-lg md:text-4xl"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Sudah Lunas</span>
                    <span className="text-2xl font-semibold">40</span>
                    <span className="text-xs md:text-sm text-green-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div>
            <div className="w-full col-span-1 bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-2 md:p-3 bg-yellow-200 rounded-lg">
                    <Users className="text-yellow-500 text-lg md:text-4xl"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Menunggu Konfirmasi</span>
                    <span className="text-2xl font-semibold">40</span>
                    <span className="text-xs md:text-sm text-yellow-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div>
            <div className="w-full col-span-1 bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-2 md:p-3 bg-red-200 rounded-lg">
                    <Users className="text-red-500 text-lg md:text-4xl"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Belum Lunas</span>
                    <span className="text-2xl font-semibold">40</span>
                    <span className="text-xs md:text-sm text-red-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div>
        </div>
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="col-span-1 md:col-span-3 flex flex-col gap-8">
                <div className="bg-white p-4 md:p-8 rounded-lg shadow-md shadow-gray-300">
                    <div>
                        <h1 className="text-lg font-semibold">Grafik Pembayaran</h1>
                    </div>
                    <div className="flex mt-4">
                        <button className={`px-4 py-3 rounded-full text-xs md:text-base ${component.filterDataIndex === 0 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} onClick={() => component.setFilterDataIndex(0)}>12 Bulan</button>
                        <button className={`px-4 py-3 rounded-full text-xs md:text-base ${component.filterDataIndex === 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} onClick={() => component.setFilterDataIndex(1)}>6 Bulan</button>
                        <button className={`px-4 py-3 rounded-full text-xs md:text-base ${component.filterDataIndex === 2 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} onClick={() => component.setFilterDataIndex(2)}>1 Bulan</button>
                    </div>
                    <div className="mt-8">
                        <Chart/>
                    </div>
                </div>
                <div className="bg-white p-4 md:p-8 rounded-lg shadow-md shadow-gray-300">
                    <div className="flex-col md:flex-row flex gap-4 justify-between items-start md:items-center">
                        <h1 className="text-lg font-semibold">Daftar Warga</h1>
                        <div className="flex gap-4 justify-center items-center">
                            <div className="relative">
                                <input type="search" name="search" id="search" placeholder="Cari Warga atau Alamat" className="w-full md:w-72 bg-zinc-100 rounded-lg py-3 pl-4 pr-8 border-none outline-none"/>
                                <MagnifyingGlass size={16} className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-4"/>
                            </div>
                            <div className="h-8 w-[0.5px] bg-gray-500 bg-opacity-50"></div>
                            <div className="p-4 bg-blue-500 rounded-md justify-center items-center flex">
                                <Plus size={14} className="text-white"/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <table className="w-full">
                            <thead>
                                <tr className="text-center">
                                    <th>Nama</th>
                                    <th>No. Telepon</th>
                                    <th>Alamat</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">+62 812 - 3456 - 7890</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                </tr>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">+62 812 - 3456 - 7890</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                </tr>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">+62 812 - 3456 - 7890</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                </tr>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">+62 812 - 3456 - 7890</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                </tr>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">+62 812 - 3456 - 7890</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                </tr>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">+62 812 - 3456 - 7890</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <div className="p-1 bg-blue-500 text-white rounded-md">
                            <CaretLeft/>
                        </div>
                        <span className="text-xs text-gray-500">Halaman 1 dari 256</span>
                        <div className="p-1 bg-blue-500 text-white rounded-md">
                            <CaretRight/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col gap-8">
                <div className="bg-white p-4 md:p-8 rounded-lg shadow-md shadow-gray-300">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Rekapan Iuran Bulanan</h1>
                        <input type="month" name="month" id="month" className="bg-blue-500 text-white [&::-webkit-calendar-picker-indicator]:invert-[1] outline-none p-2 rounded-md [&::-webkit-datetime-edit]:hidden"/>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-200 rounded-lg">
                                    <HandCoins className="text-blue-500" size={18}/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs">November 2024</span>
                                    <span className="text-md font-semibold">Iuran Bulan November 2024</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-200 rounded-lg">
                                    <HandCoins className="text-blue-500" size={18}/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs">Oktober 2024</span>
                                    <span className="text-md font-semibold">Iuran Bulan Oktober 2024</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-200 rounded-lg">
                                    <HandCoins className="text-blue-500" size={18}/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs">September 2024</span>
                                    <span className="text-md font-semibold">Iuran Bulan September 2024</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-200 rounded-lg">
                                    <HandCoins className="text-blue-500" size={18}/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs">Agustus 2024</span>
                                    <span className="text-md font-semibold">Iuran Bulan Agustus 2024</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-200 rounded-lg">
                                    <HandCoins className="text-blue-500" size={18}/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs">Juli 2024</span>
                                    <span className="text-md font-semibold">Iuran Bulan Juli 2024</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-200 rounded-lg">
                                    <HandCoins className="text-blue-500" size={18}/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs">Juni 2024</span>
                                    <span className="text-md font-semibold">Iuran Bulan Juni 2024</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <div className="p-1 bg-blue-500 text-white rounded-md">
                            <CaretLeft/>
                        </div>
                        <span className="text-xs text-gray-500">Halaman 1 dari 256</span>
                        <div className="p-1 bg-blue-500 text-white rounded-md">
                            <CaretRight/>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 md:p-8 rounded-lg shadow-md shadow-gray-300">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Aktivitas Terbaru</h1>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        <div className="flex gap-4 justify-between items-center cursor-pointer">
                            <div className="flex gap-4 items-center">
                                <div className="w-14 h-14 bg-blue-200 rounded-full flex justify-center items-center">
                                    <User size={24} className="text-blue-500" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs">November 2024</span>
                                        <span className="leading-none">&#8226;</span>
                                        <span className="rounded-full bg-yellow-200 px-2 py-1 text-yellow-500 text-xs">Menunggu Konfirmasi</span>
                                    </div>
                                    <span className="text-md font-semibold">Repat Dwi Gunanda</span>
                                    <span className="text-xs mt-1">+62 812 - 3456 - 7890</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center cursor-pointer">
                            <div className="flex gap-4 items-center">
                                <div className="w-14 h-14 bg-blue-200 rounded-full flex justify-center items-center">
                                    <User size={24} className="text-blue-500" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs">November 2024</span>
                                        <span className="leading-none">&#8226;</span>
                                        <span className="rounded-full bg-green-200 px-2 py-1 text-green-500 text-xs">Lunas</span>
                                    </div>
                                    <span className="text-md font-semibold">Repat Dwi Gunanda</span>
                                    <span className="text-xs mt-1">+62 812 - 3456 - 7890</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center cursor-pointer">
                            <div className="flex gap-4 items-center">
                                <div className="w-14 h-14 bg-blue-200 rounded-full flex justify-center items-center">
                                    <User size={24} className="text-blue-500" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs">November 2024</span>
                                        <span className="leading-none">&#8226;</span>
                                        <span className="rounded-full bg-red-200 px-2 py-1 text-red-500 text-xs">Belum Lunas</span>
                                    </div>
                                    <span className="text-md font-semibold">Repat Dwi Gunanda</span>
                                    <span className="text-xs mt-1">+62 812 - 3456 - 7890</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <div className="p-1 bg-blue-500 text-white rounded-md">
                            <CaretLeft/>
                        </div>
                        <span className="text-xs text-gray-500">Halaman 1 dari 256</span>
                        <div className="p-1 bg-blue-500 text-white rounded-md">
                            <CaretRight/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

function Iuran() {
    const component = useComponent();
    
    return <>
        <div className="mt-8 flex justify-between items-center">
            <div>
                <span className="text-xs">Iuran Bulan Ini</span>
                <h1 className="font-semibold text-xl md:text-2xl">November 2024</h1>
            </div>
            <div className="relative">
                <button className="py-3 px-4 w-36 bg-blue-500 text-white flex justify-between items-center gap-4 rounded-full" onClick={() => component.setShowContextMenu(!component.showContextMenu)}>
                    <span>{component.selectedContext}</span>
                    <CaretDown size={16} className="text-white"/>
                </button>
                {component.showContextMenu ? <div className="w-full absolute mt-2 flex flex-col justify-center items-center shadow-md shadow-gray-300">
                    <button className="w-full p-2 md:p-3 bg-white hover:bg-gray-100" onClick={() => {component.setSelectedContext('Semua RT'); component.setShowContextMenu(false)}}>Semua RT</button>
                    <button className="w-full p-2 md:p-3 bg-white hover:bg-gray-100" onClick={() => {component.setSelectedContext('RT 001'); component.setShowContextMenu(false)}}>RT 001</button>
                    <button className="w-full p-2 md:p-3 bg-white hover:bg-gray-100" onClick={() => {component.setSelectedContext('RT 002'); component.setShowContextMenu(false)}}>RT 002</button>
                    <button className="w-full p-2 md:p-3 bg-white hover:bg-gray-100" onClick={() => {component.setSelectedContext('RT 003'); component.setShowContextMenu(false)}}>RT 003</button>
                    <button className="w-full p-2 md:p-3 bg-white hover:bg-gray-100" onClick={() => {component.setSelectedContext('RT 004'); component.setShowContextMenu(false)}}>RT 004</button>
                </div> : null}
            </div>
        </div>
        <div className="w-full mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="w-full col-span-1 bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-2 md:p-3 bg-blue-200 rounded-lg">
                    <Users className="text-blue-500 text-lg md:text-4xl"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Jumlah warga</span>
                    <span className="text-2xl font-semibold">40</span>
                    <span className="text-xs md:text-sm text-blue-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div>
            <div className="w-full col-span-1 bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-2 md:p-3 bg-green-200 rounded-lg">
                    <Users className="text-green-500 text-lg md:text-4xl"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Sudah Lunas</span>
                    <span className="text-2xl font-semibold">40</span>
                    <span className="text-xs md:text-sm text-green-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div><div className="w-full col-span-1 bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-2 md:p-3 bg-yellow-200 rounded-lg">
                    <Users className="text-yellow-500 text-lg md:text-4xl"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Menunggu Konfirmasi</span>
                    <span className="text-2xl font-semibold">40</span>
                    <span className="text-xs md:text-sm text-yellow-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div><div className="w-full col-span-1 bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-2 md:p-3 bg-red-200 rounded-lg">
                    <Users className="text-red-500 text-lg md:text-4xl"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Belum Lunas</span>
                    <span className="text-2xl font-semibold">40</span>
                    <span className="text-xs md:text-sm text-red-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div>
        </div>
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="col-span-1 md:col-span-3 flex flex-col gap-8">
                <div className="w-full bg-white p-4 md:p-8 rounded-lg shadow-md shadow-gray-300">
                    <div className="w-full flex-col-reverse md:flex-row flex justify-between items-start md:items-center gap-4">
                        <div className="flex gap-2">
                            <button className={`px-4 py-2 rounded-full border border-blue-500 ${component.filterStatusIndex === 0 ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-500'}`} onClick={() => component.setFilterStatusIndex(0)}>Semua</button>
                            <button className={`px-4 py-2 rounded-full border border-blue-500 ${component.filterStatusIndex === 1 ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-500'}`} onClick={() => component.setFilterStatusIndex(1)}>Lunas</button>
                            <button className={`px-4 py-2 rounded-full border border-blue-500 ${component.filterStatusIndex === 2 ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-500'}`} onClick={() => component.setFilterStatusIndex(2)}>Belum Lunas</button>
                        </div>
                        <div className="w-full md:w-fit relative">  
                            <input type="search" name="search" id="search" placeholder="Cari Warga atau Alamat" className="w-full md:w-64 bg-zinc-100 rounded-lg py-3 pl-4 pr-8 border-none outline-none"/>
                            <MagnifyingGlass size={16} className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-4"/>
                        </div>
                    </div>
                    <div className="mt-8">
                        <table className="w-full">
                            <thead>
                                <tr className="text-center">
                                    <th>Nama</th>
                                    <th>Alamat</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                    <td className="py-3">
                                        <span className="rounded-full bg-red-200 px-2 py-1 text-red-500 text-xs">Menunggu Konfirmasi</span>
                                    </td>
                                </tr>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                    <td className="py-3">
                                        <span className="rounded-full bg-green-200 px-2 py-1 text-green-500 text-xs">Lunas</span>
                                    </td>
                                </tr>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                    <td className="py-3">
                                        <span className="rounded-full bg-red-200 px-2 py-1 text-red-500 text-xs">Menunggu Konfirmasi</span>
                                    </td>
                                </tr>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                    <td className="py-3">
                                        <span className="rounded-full bg-green-200 px-2 py-1 text-green-500 text-xs">Lunas</span>
                                    </td>
                                </tr>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                    <td className="py-3">
                                        <span className="rounded-full bg-red-200 px-2 py-1 text-red-500 text-xs">Menunggu Konfirmasi</span>
                                    </td>
                                </tr>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                    <td className="py-3">
                                        <span className="rounded-full bg-green-200 px-2 py-1 text-green-500 text-xs">Lunas</span>
                                    </td>
                                </tr>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                    <td className="py-3">
                                        <span className="rounded-full bg-green-200 px-2 py-1 text-green-500 text-xs">Lunas</span>
                                    </td>
                                </tr>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                    <td className="py-3">
                                        <span className="rounded-full bg-green-200 px-2 py-1 text-green-500 text-xs">Lunas</span>
                                    </td>
                                </tr>
                                <tr className="text-center border-b border-b-gray-200">
                                    <td className="py-3">Repat Dwi Gunanda</td>
                                    <td className="py-3">Perum CGM, Blok. A 23</td>
                                    <td className="py-3">
                                        <span className="rounded-full bg-green-200 px-2 py-1 text-green-500 text-xs">Lunas</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <div className="p-1 bg-blue-500 text-white rounded-md">
                            <CaretLeft/>
                        </div>
                        <span className="text-xs text-gray-500">Halaman 1 dari 256</span>
                        <div className="p-1 bg-blue-500 text-white rounded-md">
                            <CaretRight/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col gap-8">
                <div className="bg-white p-4 md:p-8 rounded-lg shadow-md shadow-gray-300">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Rekapan Iuran Bulanan</h1>
                        <input type="month" name="month" id="month" className="bg-blue-500 text-white [&::-webkit-calendar-picker-indicator]:invert-[1] outline-none p-2 rounded-md [&::-webkit-datetime-edit]:hidden"/>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-200 rounded-lg">
                                    <HandCoins className="text-blue-500" size={18}/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs">November 2024</span>
                                    <span className="text-md font-semibold">Iuran Bulan November 2024</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-200 rounded-lg">
                                    <HandCoins className="text-blue-500" size={18}/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs">Oktober 2024</span>
                                    <span className="text-md font-semibold">Iuran Bulan Oktober 2024</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-200 rounded-lg">
                                    <HandCoins className="text-blue-500" size={18}/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs">September 2024</span>
                                    <span className="text-md font-semibold">Iuran Bulan September 2024</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-200 rounded-lg">
                                    <HandCoins className="text-blue-500" size={18}/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs">Agustus 2024</span>
                                    <span className="text-md font-semibold">Iuran Bulan Agustus 2024</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-200 rounded-lg">
                                    <HandCoins className="text-blue-500" size={18}/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs">Juli 2024</span>
                                    <span className="text-md font-semibold">Iuran Bulan Juli 2024</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-200 rounded-lg">
                                    <HandCoins className="text-blue-500" size={18}/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs">Juni 2024</span>
                                    <span className="text-md font-semibold">Iuran Bulan Juni 2024</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <div className="p-1 bg-blue-500 text-white rounded-md">
                            <CaretLeft/>
                        </div>
                        <span className="text-xs text-gray-500">Halaman 1 dari 256</span>
                        <div className="p-1 bg-blue-500 text-white rounded-md">
                            <CaretRight/>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 md:p-8 rounded-lg shadow-md shadow-gray-300">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Aktivitas Terbaru</h1>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        <div className="flex gap-4 justify-between items-center cursor-pointer">
                            <div className="flex gap-4 items-center">
                                <div className="w-14 h-14 bg-blue-200 rounded-full flex justify-center items-center">
                                    <User size={24} className="text-blue-500" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs">November 2024</span>
                                        <span className="leading-none">&#8226;</span>
                                        <span className="rounded-full bg-yellow-200 px-2 py-1 text-yellow-500 text-xs">Menunggu Konfirmasi</span>
                                    </div>
                                    <span className="text-md font-semibold">Repat Dwi Gunanda</span>
                                    <span className="text-xs mt-1">+62 812 - 3456 - 7890</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center cursor-pointer">
                            <div className="flex gap-4 items-center">
                                <div className="w-14 h-14 bg-blue-200 rounded-full flex justify-center items-center">
                                    <User size={24} className="text-blue-500" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs">November 2024</span>
                                        <span className="leading-none">&#8226;</span>
                                        <span className="rounded-full bg-green-200 px-2 py-1 text-green-500 text-xs">Lunas</span>
                                    </div>
                                    <span className="text-md font-semibold">Repat Dwi Gunanda</span>
                                    <span className="text-xs mt-1">+62 812 - 3456 - 7890</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center cursor-pointer">
                            <div className="flex gap-4 items-center">
                                <div className="w-14 h-14 bg-blue-200 rounded-full flex justify-center items-center">
                                    <User size={24} className="text-blue-500" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs">November 2024</span>
                                        <span className="leading-none">&#8226;</span>
                                        <span className="rounded-full bg-red-200 px-2 py-1 text-red-500 text-xs">Belum Lunas</span>
                                    </div>
                                    <span className="text-md font-semibold">Repat Dwi Gunanda</span>
                                    <span className="text-xs mt-1">+62 812 - 3456 - 7890</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <div className="p-1 bg-blue-500 text-white rounded-md">
                            <CaretLeft/>
                        </div>
                        <span className="text-xs text-gray-500">Halaman 1 dari 256</span>
                        <div className="p-1 bg-blue-500 text-white rounded-md">
                            <CaretRight/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}


function Warga() {
    const component = useComponent();

    return <>    
        <div className="mt-4 w-full">
            <div className="bg-white p-4 md:p-8 rounded-lg shadow-md shadow-gray-300">
                <div className="flex-col gap-4 md:gap-0 md:flex-row flex justify-between items-start md:items-center">
                    <h1 className="text-lg font-semibold">Daftar Warga</h1>
                    <div className="flex gap-4 justify-center items-center">
                        <div className="relative">
                            <input type="search" name="search" id="search" placeholder="Cari Warga atau Alamat" className="w-full md:w-72 bg-zinc-100 rounded-lg py-3 pl-4 pr-8 border-none outline-none"/>
                            <MagnifyingGlass size={16} className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-4"/>
                        </div>
                        <div className="h-8 w-[0.5px] bg-gray-500 bg-opacity-50 hidden md:flex"></div>
                        <div className="p-4 bg-blue-500 rounded-md justify-center items-center flex">
                            <Funnel size={14} className="text-white" />
                        </div>
                        <div className="p-4 bg-blue-500 rounded-md justify-center items-center flex">
                            <Plus size={14} className="text-white"/>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <table className="w-full">
                        <thead>
                            <tr className="text-center">
                                <th>Nama</th>
                                <th>No. Telepon</th>
                                <th>Alamat</th>
                                <th>RT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center border-b border-b-gray-200">
                                <td className="py-3">Repat Dwi Gunanda</td>
                                <td className="py-3">+62 812 - 3456 - 7890</td>
                                <td className="py-3">Perum CGM, Blok. A 23</td>
                                <td className="py-3">01</td>
                                <td className="py-1"><CaretRight size={14}/></td>
                            </tr>
                            <tr className="text-center border-b border-b-gray-200">
                                <td className="py-3">Repat Dwi Gunanda</td>
                                <td className="py-3">+62 812 - 3456 - 7890</td>
                                <td className="py-3">Perum CGM, Blok. A 23</td>
                                <td className="py-3">02</td>
                                <td className="py-1"><CaretRight size={14}/></td>
                            </tr>
                            <tr className="text-center border-b border-b-gray-200">
                                <td className="py-3">Repat Dwi Gunanda</td>
                                <td className="py-3">+62 812 - 3456 - 7890</td>
                                <td className="py-3">Perum CGM, Blok. A 23</td>
                                <td className="py-3">03</td>
                                <td className="py-1"><CaretRight size={14}/></td>
                            </tr>
                            <tr className="text-center border-b border-b-gray-200">
                                <td className="py-3">Repat Dwi Gunanda</td>
                                <td className="py-3">+62 812 - 3456 - 7890</td>
                                <td className="py-3">Perum CGM, Blok. A 23</td>
                                <td className="py-3">04</td>
                                <td className="py-1"><CaretRight size={14}/></td>
                            </tr>
                            <tr className="text-center border-b border-b-gray-200">
                                <td className="py-3">Repat Dwi Gunanda</td>
                                <td className="py-3">+62 812 - 3456 - 7890</td>
                                <td className="py-3">Perum CGM, Blok. A 23</td>
                                <td className="py-3">01</td>
                                <td className="py-1"><CaretRight size={14}/></td>
                            </tr>
                            <tr className="text-center border-b border-b-gray-200">
                                <td className="py-3">Repat Dwi Gunanda</td>
                                <td className="py-3">+62 812 - 3456 - 7890</td>
                                <td className="py-3">Perum CGM, Blok. A 23</td>
                                <td className="py-3">01</td>
                                <td className="py-1"><CaretRight size={14}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center gap-2 mt-8">
                    <div className="p-1 bg-blue-500 text-white rounded-md">
                        <CaretLeft/>
                    </div>
                    <span className="text-xs text-gray-500">Halaman 1 dari 256</span>
                    <div className="p-1 bg-blue-500 text-white rounded-md">
                        <CaretRight/>
                    </div>
                </div>
            </div>
        </div>
    </>
}

function Tentang(){
    const component = useComponent();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return <>
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 flex flex-col gap-8 shadow-gray-300 shadow-md rounded-lg p-4 h-fit">
                <ul>
                    <li className={`flex justify-between items-center gap-4 p-3 cursor-pointer ${component.profileSelectedIndex === 0 ? 'font-semibold' : 'font-normal'}`} onClick={() => component.setProfileSelectedIndex(0)}>
                        <span>Profil</span>
                        {component.profileSelectedIndex === 0 ? <CaretRight/> : null}
                    </li>
                    <li className={`flex justify-between items-center gap-4 p-3 cursor-pointer ${component.profileSelectedIndex === 1 ? 'font-semibold' : 'font-normal'}`} onClick={() => component.setProfileSelectedIndex(1)}>
                        <span>Ubah Kata Sandi</span>
                        {component.profileSelectedIndex === 1 ? <CaretRight/> : null}
                    </li>
                </ul>
            </div>
            <div className="col-span-1 md:col-span-3 p-4 h-fit bg-white shadow-md shadow-gray-300 flex flex-col gap-4">
                {component.profileSelectedIndex === 0 ? <>
                    <h1 className="text-2xl font-semibold">Profil</h1>
                    <div>
                        <h2 className="font-semibold">Nama</h2>
                        <span>Muhammad Azka Fakhri Fairuz</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold">No. Telepon</h2>
                        <span className="text-xs text-gray-500">Nomor telepon anda diatur sebagai nomor <Link href={""} className="text-blue-500 underline">WhatsApp</Link> utama untuk pengaduan warga</span>
                        <div className="flex gap-2 items-center">
                            <span>+62 812 - 3456 - 7890</span>
                            <button className="p-2 bg-blue-500 text-white rounded-lg flex gap-2 items-center">
                                <span className="text-xs">Edit</span>
                                <Pencil/>
                            </button>
                        </div>
                    </div>
                </> : <>
                    <h1 className="text-2xl font-semibold">Ubah Kata Sandi</h1>
                    <div className="relative">
                        <input type={showOldPassword ? 'text' : 'password'} name="old_password" id="old_password" placeholder="Masukkan Kata Sandi Lama" className="w-full px-3 p-2 border border-slate-400 outline-none rounded-lg" />
                        {showOldPassword ? <Eye className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => setShowOldPassword(false)}/> : <EyeSlash className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => setShowOldPassword(true)}/>}
                    </div>
                    <div className="w-full h-[0.5px] bg-gray-500 bg-opacity-50 my-2"></div>
                    <div className="relative">
                        <input type={showNewPassword ? 'text' : 'password'} name="new_password" id="new_password" placeholder="Masukkan Kata Sandi Baru" className="w-full px-3 p-2 border border-slate-400 outline-none rounded-lg" />
                        {showNewPassword ? <Eye className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => setShowNewPassword(false)}/> : <EyeSlash className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => setShowNewPassword(true)}/>}
                    </div>
                    <div className="relative">
                        <input type={showConfirmPassword ? 'text' : 'password'} name="confirm_password" id="confirm_password" placeholder="Konfirmasi Kata Sandi" className="w-full px-3 p-2 border border-slate-400 outline-none rounded-lg" />
                        {showConfirmPassword ? <Eye className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => setShowConfirmPassword(false)}/> : <EyeSlash className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => setShowConfirmPassword(true)}/>}
                    </div>
                    <button className="p-3 bg-blue-500 text-white rounded-lg">Ubah Kata Sandi</button>
                </>}
            </div>
        </div>
    </>
}

function DetailWarga(){
    const [monthList, setMonthList] = useState<string[]>([]);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const component = useComponent();
    const month_inc = useRef(1);
    const currentDate = useRef({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    })

    const add_month = () => {
        let month = currentDate.current.month + month_inc.current;
        let year = currentDate.current.year;

        if (month > 12) {
            month = 1;
            year += 1;
        }

        const formattedDate: string = `${year}-${month.toString().padStart(2, "0")}`;
        const updatedList = [...monthList, formattedDate];
        setMonthList(updatedList);

        currentDate.current.month = month;
        currentDate.current.year = year;
        month_inc.current = 1;
    }

    const resetDate = () => {
        currentDate.current = {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
        };

        month_inc.current = 1;
        setMonthList([]);
    };
        
    return <>
        <div className="mt-8 grid grid-cols-5 gap-8">
            <div className="col-span-3 flex flex-col gap-8">
                <div className="bg-white shadow-md shadow-gray-300 p-4 rounded-lg">
                    <div className="flex gap-4 justify-between">
                        <div className="flex gap-4 items-center">
                            <div className="w-20 h-20 bg-blue-200 rounded-full flex justify-center items-center">
                                <User size={32} className="text-blue-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">Repat Dwi Gunanda</span>
                                <div className="flex gap-2 text-xs mt-1 items-center">
                                    <Phone size={18}/>
                                    <span className="">+62 812 - 3456 - 7890</span>
                                </div>
                                <div className="flex gap-2 text-xs mt-1 items-center">
                                    <MapPin size={18}/> 
                                    <span>Perum CGM, Blok A. 23</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <DotsThreeVertical size={24} className="cursor-pointer" onClick={() => setShowContextMenu(!showContextMenu)}/>
                            {showContextMenu ? <div className="w-36 bg-white shadow-md shadow-gray-300 absolute -top-0 right-0 mt-8 flex flex-col">
                                <button className="w-full p-2 hover:bg-gray-100">Edit Warga</button>
                                <button className="w-full p-2 hover:bg-gray-100 text-red-500">Hapus Warga</button>
                            </div> : null}
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md shadow-gray-300 p-4 rounded-lg">
                    <h1 className="text-lg font-semibold">Riwayat Iuran</h1>
                    <div className="flex gap-2 mt-4">
                        <button className={`px-4 py-2 rounded-full border border-blue-500 ${component.filterStatusIndex === 0 ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-500'}`} onClick={() => component.setFilterStatusIndex(0)}>Semua</button>
                        <button className={`px-4 py-2 rounded-full border border-blue-500 ${component.filterStatusIndex === 1 ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-500'}`} onClick={() => component.setFilterStatusIndex(1)}>Lunas</button>
                        <button className={`px-4 py-2 rounded-full border border-blue-500 ${component.filterStatusIndex === 2 ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-500'}`} onClick={() => component.setFilterStatusIndex(2)}>Belum Lunas</button>
                    </div>
                    <h1 className="text-sm mt-8">2024</h1>
                    <div className="flex gap-4 items-center mt-2">
                        <div className="p-3 bg-blue-200 rounded-lg">
                            <CheckCircle className="text-blue-500" size={24}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex gap-2 items-center">
                                <span className="text-xs">September 2024</span>
                                <span className="leading-none">&#8226;</span>
                                <span className="rounded-full bg-green-200 px-2 py-1 text-green-500 text-xs">Lunas</span>
                            </div>
                            <span className="text-md font-semibold">Iuran Bulan September</span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center mt-4">
                        <div className="p-3 bg-blue-200 rounded-lg">
                            <CheckCircle className="text-blue-500" size={24}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex gap-2 items-center">
                                <span className="text-xs">Oktober 2024</span>
                                <span className="leading-none">&#8226;</span>
                                <span className="rounded-full bg-green-200 px-2 py-1 text-green-500 text-xs">Lunas</span>
                            </div>
                            <span className="text-md font-semibold">Iuran Bulan Oktober</span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center mt-4">
                        <div className="p-3 bg-blue-200 rounded-lg">
                            <CheckCircle className="text-blue-500" size={24}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex gap-2 items-center">
                                <span className="text-xs">November 2024</span>
                                <span className="leading-none">&#8226;</span>
                                <span className="rounded-full bg-green-200 px-2 py-1 text-green-500 text-xs">Lunas</span>
                            </div>
                            <span className="text-md font-semibold">Iuran Bulan November</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2 flex flex-col gap-8">
                <div className="bg-white shadow-md shadow-gray-300 p-4 rounded-lg">
                    <h1 className="font-semibold text-lg">Iuran Belum Lunas</h1>
                    <div className="w-full flex justify-center font-bold text-3xl items-center mt-4 gap-1">
                        <span>Rp. </span>
                        <span>110.000</span>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-red-200 rounded-lg">
                                    <XCircle className="text-red-500" size={24}/>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs">November 2024</span>
                                        <span className="rounded-full bg-red-200 px-2 py-1 text-red-500 text-xs">Belum Lunas</span>
                                    </div>
                                    <span className="text-md font-semibold">Iuran Bulan November 2024</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex gap-4">
                                <div className="p-3 bg-red-200 rounded-lg">
                                    <XCircle  className="text-red-500" size={24}/>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs">November 2024</span>
                                        <span className="rounded-full bg-red-200 px-2 py-1 text-red-500 text-xs">Belum Lunas</span>
                                    </div>
                                    <span className="text-md font-semibold">Iuran Bulan November 2024</span>
                                </div>
                            </div>
                            <CaretRight  size={14}/>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md shadow-gray-300 p-4 flex flex-col gap-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <h1 className="font-semibold text-lg">Iuran Jangka Panjang</h1>
                        {monthList.length ? <Trash size={24} className="text-red-500" onClick={resetDate}/> : null}
                    </div>
                    <div className="w-full flex gap-2 flex-wrap">
                        {monthList.map((item: string, index: number) => {
                            return <div key={index} className="px-4 py-2 bg-blue-500 text-white rounded-full">
                                <span>{date.toString(item)}</span>
                            </div>
                        })}
                        <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full flex justify-center items-center gap-2" onClick={add_month}>
                            <Plus/>
                            <span>Tambah Bulan</span>
                        </button>
                    </div>
                    {monthList.length ? <button className="bg-blue-500 p-3 text-white rounded-lg mt-4">Tandai Lunas</button> : null}
                </div>
            </div>
        </div>
    </>
}