'use client';
import Chart from "@/components/chart";
import Logo from "@/components/logo";
import TextButton from "@/components/text-button";
import { Bell, CaretRight, ChartBar, Hand, HandCoins, SignOut, User, UserCircle, Users, Plus, MagnifyingGlass, CaretDown, Funnel } from "@phosphor-icons/react";
import { create } from "zustand";

interface ComponentState {
    navbarIndex: number,
    filterDataIndex: number,
    showContextMenu: boolean,
    selectedContext: string,
    filterStatusIndex: number,
    showNotification: boolean,
    setNavbarIndex: (index: number) => void,
    setFilterDataIndex: (index: number) => void,
    setShowContextMenu: (show: boolean) => void,
    setSelectedContext: (context: string) => void,
    setFilterStatusIndex: (index: number) => void,
    setShowNotification: (show: boolean) => void,
}

const useComponent = create<ComponentState>((set) => {
    return {
        navbarIndex: 3,
        filterDataIndex: 0,
        showContextMenu: false,
        selectedContext: 'Semua RT',
        filterStatusIndex: 0,
        showNotification: false,
        setNavbarIndex: (index: number) => set({navbarIndex: index}),
        setFilterDataIndex: (index: number) => set({filterDataIndex: index}),
        setShowContextMenu: (show: boolean) => set({showContextMenu: show}),
        setSelectedContext: (context: string) => set({selectedContext: context}),
        setFilterStatusIndex: (index: number) => set({filterStatusIndex: index}),
        setShowNotification: (show: boolean) => set({showNotification: show}),
    }
})

export default function Page(){
    const component = useComponent();

    return <div className="">
        <div className="h-screen w-60 bg-white flex flex-col justify-between fixed top-0 left-0 shadow-md shadow-gray-300 z-50">
            <div>
                <div className="w-full flex justify-center items-center p-8">
                    <Logo/>
                </div>
                <div className="mt-4 p-4">
                    <ul>
                        <li className={`flex justify-start items-center gap-4 p-3 cursor-pointer rounded-md ${component.navbarIndex === 0 ? 'bg-blue-500 text-white' : 'bg-none text-black'}`} onClick={() => component.setNavbarIndex(0)}>
                            <ChartBar size={24}/>
                            <span>Dashboard</span>
                        </li>
                        <li className={`flex justify-start items-center gap-4 p-3 cursor-pointer rounded-md ${component.navbarIndex === 1 ? 'bg-blue-500 text-white' : 'bg-none text-black'}`} onClick={() => component.setNavbarIndex(1)}>
                            <HandCoins size={24}/>
                            <span>Iuran</span>
                        </li>
                        <li className={`flex justify-start items-center gap-4 p-3 cursor-pointer rounded-md ${component.navbarIndex === 2 ? 'bg-blue-500 text-white' : 'bg-none text-black'}`} onClick={() => component.setNavbarIndex(2)}>
                            <Users size={24}/>
                            <span>Warga</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="p-4">
                <ul>
                    <li className={`flex justify-start items-center gap-4 p-3 cursor-pointer rounded-md ${component.navbarIndex === 3 ? 'bg-blue-500 text-white' : 'bg-none text-black'}`} onClick={() => component.setNavbarIndex(3)}>
                        <User size={24}/>
                        <span>Tentang Saya</span>
                    </li>
                    <li>
                        <div className="w-full h-[0.5px] bg-gray-500 bg-opacity-50 my-2"></div>
                    </li>
                    <li className={`flex justify-start items-center gap-4 p-3 cursor-pointer rounded-md`}>
                        <SignOut size={24}/>
                        <span>Keluar</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="flex w-full py-6 px-8 pl-72 z-40 justify-between items-center bg-white fixed top-0">
            <h1 className="text-2xl font-semibold">{(() => {
                if(component.navbarIndex === 0) return 'Dashboard';
                if(component.navbarIndex === 1) return 'Iuran';
                if(component.navbarIndex === 2) return 'Warga';
                if(component.navbarIndex === 3) return 'Tentang Saya';
            })()}</h1>
            <div className="flex flex-row-reverse justify-center items-center gap-4">
                <Bell size={32} onClick={() => component.setShowNotification(!component.showNotification)}/>
            </div>
            {component.showNotification ? <div className="bg-white w-96 p-4 rounded-lg shadow-md shadow-gray-300 absolute right-8 -top-0 mt-20 flex flex-col gap-4">
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
        <div className="ml-64 mt-12 p-8">
            {component.navbarIndex === 0 ? <Dashboard/> : null}
            {component.navbarIndex === 1 ? <Iuran/> : null}
            {component.navbarIndex === 2 ? <Warga/> : null}
            {component.navbarIndex === 3 ? <Tentang/> : null}
        </div>
    </div>
}

function Dashboard() {
    const component = useComponent();

    return <>
        <div className="mt-8">
            <h1 className="font-semibold text-lg">Iuran Bulan Ini</h1>
        </div>
        <div className="mt-4 flex w-full gap-8">
            <div className="w-full bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-3 bg-blue-200 rounded-lg">
                    <Users size={40} className="text-blue-500"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Jumlah Warga</span>
                    <span className="text-2xl font-semibold">40</span>
                    <span className="text-sm text-blue-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div>
            <div className="w-full bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-3 bg-green-200 rounded-lg">
                    <HandCoins size={40} className="text-green-500"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Sudah Lunas</span>
                    <span className="text-2xl font-semibold">41</span>
                    <span className="text-sm text-green-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div>
            <div className="w-full bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
            <div className="p-3 bg-yellow-200 rounded-lg">
                    <HandCoins size={40} className="text-yellow-500"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Menunggu Konfirmasi</span>
                    <span className="text-2xl font-semibold">41</span>
                    <span className="text-sm text-yellow-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div>
            <div className="w-full bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-3 bg-red-200 rounded-lg">
                    <HandCoins size={40} className="text-red-500"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Belum Lunas</span>
                    <span className="text-2xl font-semibold">19</span>
                    <span className="text-sm text-red-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div>
        </div>
        <div className="mt-8 w-full grid grid-cols-5 gap-8">
            <div className="col-span-3 flex flex-col gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md shadow-gray-300">
                    <div>
                        <h1 className="text-lg font-semibold">Grafik Pembayaran</h1>
                    </div>
                    <div className="flex mt-4">
                        <button className={`px-4 py-3 rounded-full ${component.filterDataIndex === 0 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} onClick={() => component.setFilterDataIndex(0)}>12 Bulan</button>
                        <button className={`px-4 py-3 rounded-full ${component.filterDataIndex === 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} onClick={() => component.setFilterDataIndex(1)}>6 Bulan</button>
                        <button className={`px-4 py-3 rounded-full ${component.filterDataIndex === 2 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} onClick={() => component.setFilterDataIndex(2)}>1 Bulan</button>
                    </div>
                    <div className="mt-8">
                        <Chart/>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md shadow-gray-300">
                    <div className="flex-row flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Daftar Warga</h1>
                        <div className="flex gap-4 justify-center items-center">
                            <div className="relative">
                                <input type="search" name="search" id="search" placeholder="Cari Warga atau Alamat" className="w-72 bg-zinc-100 rounded-lg py-3 pl-4 pr-8 border-none outline-none"/>
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
                </div>
            </div>
            <div className="col-span-2 flex flex-col gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md shadow-gray-300">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Rekapan Iuran Bulanan</h1>
                        <TextButton title="Lihat Semua"/>
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
                                    <span className="text-xs">Desember 2024</span>
                                    <span className="text-md font-semibold">Iuran Bulan Desember 2024</span>
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
                                    <span className="text-xs">Januari 2025</span>
                                    <span className="text-md font-semibold">Iuran Bulan Januari 2025</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md shadow-gray-300">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Aktivitas Terbaru</h1>
                        <TextButton title="Lihat Semua"/>
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
                <h1 className="font-semibold text-2xl">November 2024</h1>
            </div>
            <div className="relative">
                <button className="py-3 px-4 w-36 bg-blue-500 text-white flex justify-between items-center gap-4 rounded-full" onClick={() => component.setShowContextMenu(!component.showContextMenu)}>
                    <span>{component.selectedContext}</span>
                    <CaretDown size={16} className="text-white"/>
                </button>
                {component.showContextMenu ? <div className="w-full absolute mt-2 flex flex-col justify-center items-center shadow-md shadow-gray-300">
                    <button className="w-full p-3 bg-white hover:bg-gray-100" onClick={() => {component.setSelectedContext('Semua RT'); component.setShowContextMenu(false)}}>Semua RT</button>
                    <button className="w-full p-3 bg-white hover:bg-gray-100" onClick={() => {component.setSelectedContext('RT 001'); component.setShowContextMenu(false)}}>RT 001</button>
                    <button className="w-full p-3 bg-white hover:bg-gray-100" onClick={() => {component.setSelectedContext('RT 002'); component.setShowContextMenu(false)}}>RT 002</button>
                    <button className="w-full p-3 bg-white hover:bg-gray-100" onClick={() => {component.setSelectedContext('RT 003'); component.setShowContextMenu(false)}}>RT 003</button>
                    <button className="w-full p-3 bg-white hover:bg-gray-100" onClick={() => {component.setSelectedContext('RT 004'); component.setShowContextMenu(false)}}>RT 004</button>
                </div> : null}
            </div>
        </div>
        <div className="mt-8 flex w-full gap-8">
            <div className="w-full bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-3 bg-blue-200 rounded-lg">
                    <Users size={40} className="text-blue-500"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Jumlah Warga</span>
                    <span className="text-2xl font-semibold">40</span>
                    <span className="text-sm text-blue-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div>
            <div className="w-full bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-3 bg-green-200 rounded-lg">
                    <HandCoins size={40} className="text-green-500"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Sudah Lunas</span>
                    <span className="text-2xl font-semibold">41</span>
                    <span className="text-sm text-green-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div>
            <div className="w-full bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-3 bg-yellow-200 rounded-lg">
                    <HandCoins size={40} className="text-yellow-500"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Menunggu Konfirmasi</span>
                    <span className="text-2xl font-semibold">41</span>
                    <span className="text-sm text-yellow-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div>
            <div className="w-full bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
                <div className="p-3 bg-red-200 rounded-lg">
                    <HandCoins size={40} className="text-red-500"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Belum Lunas</span>
                    <span className="text-2xl font-semibold">19</span>
                    <span className="text-sm text-red-500 mt-1">( Rp. 1.568.000 )</span>
                </div>
            </div>
        </div>
        <div className="mt-8 w-full grid grid-cols-5 gap-8">
            <div className="col-span-3 flex flex-col gap-8">
                <div className="bg-white p-8 rounded-lg  shadow-md shadow-gray-300">
                    <div className="flex-row flex justify-between items-center">
                        <div className="flex gap-2">
                            <button className={`px-4 py-2 rounded-full border border-blue-500 ${component.filterStatusIndex === 0 ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-500'}`} onClick={() => component.setFilterStatusIndex(0)}>Semua</button>
                            <button className={`px-4 py-2 rounded-full border border-blue-500 ${component.filterStatusIndex === 1 ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-500'}`} onClick={() => component.setFilterStatusIndex(1)}>Lunas</button>
                            <button className={`px-4 py-2 rounded-full border border-blue-500 ${component.filterStatusIndex === 2 ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-500'}`} onClick={() => component.setFilterStatusIndex(2)}>Belum Lunas</button>
                        </div>
                        <div className="relative">  
                            <input type="search" name="search" id="search" placeholder="Cari Warga atau Alamat" className="w-64 bg-zinc-100 rounded-lg py-3 pl-4 pr-8 border-none outline-none"/>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="col-span-2 flex flex-col gap-8">
                <div className="bg-white p-8 rounded-lg  shadow-md shadow-gray-300">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Rekapan Iuran Bulanan</h1>
                        <TextButton title="Lihat Semua"/>
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
                                    <span className="text-xs">Desember 2024</span>
                                    <span className="text-md font-semibold">Iuran Bulan Desember 2024</span>
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
                                    <span className="text-xs">Januari 2025</span>
                                    <span className="text-md font-semibold">Iuran Bulan Januari 2025</span>
                                </div>
                            </div>
                            <CaretRight size={14}/>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md shadow-gray-300">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Aktivitas Terbaru</h1>
                        <TextButton title="Lihat Semua"/>
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
                </div>
            </div>
        </div>
    </>
}


function Warga() {
    const component = useComponent();

    return <>    
        <div className="mt-4 w-full">
            <div className="bg-white p-8 rounded-lg shadow-md shadow-gray-300">
                <div className="flex-row flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Daftar Warga</h1>
                    <div className="flex gap-4 justify-center items-center">
                        <div className="relative">
                            <input type="search" name="search" id="search" placeholder="Cari Warga atau Alamat" className="w-72 bg-zinc-100 rounded-lg py-3 pl-4 pr-8 border-none outline-none"/>
                            <MagnifyingGlass size={16} className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-4"/>
                        </div>
                        <div className="h-8 w-[0.5px] bg-gray-500 bg-opacity-50"></div>
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
            </div>
        </div>
    </>
}

function Tentang(){
    const component = useComponent();

    return <>
        <div className="mt-8 w-full grid grid-cols-4 gap-8">
            <div className="col-span-1 flex flex-col gap-8 shadow-gray-300 shadow-md rounded-lg p-4 h-fit">
                <ul>
                    <li className="flex justify-start items-center gap-4 p-3 cursor-pointer rounded-">
                        <span>Profil</span>
                    </li>
                    <li className="flex justify-start items-center gap-4 p-3 cursor-pointer rounded-">
                        <span>Ubah Kata Sandi</span>
                    </li>
                </ul>
            </div>
        </div>
    </>
}