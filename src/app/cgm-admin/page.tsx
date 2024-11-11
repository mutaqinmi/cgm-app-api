'use client';
import Logo from "@/components/logo";
import TextButton from "@/components/text-button";
import { Bell, CaretRight, ChartBar, Hand, HandCoins, SignOut, User, UserCircle, Users } from "@phosphor-icons/react";
import { create } from "zustand";

interface ComponentState {
    navbarIndex: number;
    setNavbarIndex: (index: number) => void;
}

const useComponent = create<ComponentState>((set) => {
    return {
        navbarIndex: 0,
        setNavbarIndex: (index: number) => set({navbarIndex: index})
    }
})

export default function Page(){
    const component = useComponent();

    return <div className="bg-gray-100">
        <div className="h-screen w-60 bg-white flex flex-col justify-between fixed top-0 left-0">
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
                    <li className={`flex justify-start items-center gap-4 p-3 cursor-pointer rounded-md ${component.navbarIndex === 4 ? 'bg-blue-500 text-white' : 'bg-none text-black'}`} onClick={() => component.setNavbarIndex(4)}>
                        <SignOut size={24}/>
                        <span>Keluar</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="ml-64 p-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <div className="flex flex-row-reverse justify-center items-center gap-4">
                    <Bell size={32}/>
                </div>
            </div>
            <div className="mt-8 flex w-full gap-8">
                <div className="w-full bg-white p-4 flex gap-4 rounded-lg">
                    <Users size={40} className="text-blue-500"/>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Jumlah Warga</span>
                        <span className="text-2xl font-semibold">40</span>
                    </div>
                </div>
                <div className="w-full bg-white p-4 flex gap-4 rounded-lg">
                    <HandCoins size={40} className="text-green-500"/>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Sudah Lunas</span>
                        <span className="text-2xl font-semibold">41</span>
                    </div>
                </div>
                <div className="w-full bg-white p-4 flex gap-4 rounded-lg">
                    <HandCoins size={40} className="text-yellow-500"/>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Menunggu Konfirmasi</span>
                        <span className="text-2xl font-semibold">41</span>
                    </div>
                </div>
                <div className="w-full bg-white p-4 flex gap-4 rounded-lg">
                    <HandCoins size={40} className="text-red-500"/>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Belum Lunas</span>
                        <span className="text-2xl font-semibold">19</span>
                    </div>
                </div>
            </div>
            <div className="mt-8 w-full grid grid-cols-5 gap-8">
                <div className="col-span-3 flex flex-col gap-8">
                    <div className="bg-white p-8 rounded-lg">
                        <div>
                            <h1 className="text-lg font-semibold">Grafik Pembayaran</h1>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-lg">
                        <div className="flex-row flex justify-between items-center">
                            <h1 className="text-lg font-semibold">Daftar Warga</h1>
                            <input type="search" name="search" id="search" className="w-64 h-8 bg-white rounded-lg border-slate-400 border-2"/>
                        </div>
                        <div>
                            {/* Kerja Repat Disini */}
                        </div>
                    </div>
                </div>
                <div className="col-span-2 flex flex-col gap-8">
                    <div className="bg-white p-8 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h1 className="text-lg font-semibold">Rekapan Iuran Bulanan</h1>
                            <TextButton title="Lihat Semua"/>
                        </div>
                        <div className="mt-6 flex flex-col gap-4">
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
                    <div className="bg-white p-8 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h1 className="text-lg font-semibold">Aktivitas Terbaru</h1>
                            <TextButton title="Lihat Semua"/>
                        </div>
                        <div className="">
                            <div className="flex gap-4 bg-yellow-200 items-center">
                                <div className="w-14 h-14 bg-blue-200 rounded-full flex justify-center items-center">
                                    <User size={24} className="text-blue-500"/>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex w-full items-center">
                                        <span className="text-xs">November 2024</span>
                                        <div className="rounded-full bg-yellow-200 px-2 py-1">
                                            <span className="text-yellow-500 text-xs line-clamp-1">Menunggu Kaonfirmasi</span>
                                        </div>
                                    </div>
                                    <span className="text-md font-semibold">Repat Dwi</span>
                                    <span className="text-xs">+62 812 - 3456 - 7890</span>
                                </div>
                                <CaretRight size={14}/>
                            </div>
                            <div className="flex gap-4 bg-yellow-200 items-center">
                                <div className="w-14 h-14 bg-blue-200 rounded-full flex justify-center items-center">
                                    <User size={24} className="text-blue-500"/>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex w-full items-center">
                                        <span className="text-xs">November 2024</span>
                                        <div className="rounded-full bg-green-200 px-2 py-1">
                                            <span className="text-green-500 text-xs line-clamp-1">Lunas</span>
                                        </div>
                                    </div>
                                    <span className="text-md font-semibold">Repat Dwi</span>
                                    <span className="text-xs">+62 812 - 3456 - 7890</span>
                                </div>
                                <CaretRight size={14}/>
                            </div>
                            <div className="flex gap-4 bg-yellow-200 items-center">
                                <div className="w-14 h-14 bg-blue-200 rounded-full flex justify-center items-center">
                                    <User size={24} className="text-blue-500"/>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex w-full items-center">
                                        <span className="text-xs">November 2024</span>
                                        <div className="rounded-full bg-red-200 px-2 py-1">
                                            <span className="text-red-500 text-xs line-clamp-1">Belum Lunas</span>
                                        </div>
                                    </div>
                                    <span className="text-md font-semibold">Repat Dwi</span>
                                    <span className="text-xs">+62 812 - 3456 - 7890</span>
                                </div>
                                <CaretRight size={14}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}