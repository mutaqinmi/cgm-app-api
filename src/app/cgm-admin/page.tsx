'use client';
import Chart from "@/components/chart";
import { CaretRight, HandCoins, User, Users, Plus, Funnel, Pencil, Eye, EyeSlash, XCircle, Trash, CheckCircle, DotsThreeVertical, Phone, MapPin, X, List  } from "@phosphor-icons/react";
import { create } from "zustand";
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from "react";
import * as date from "@/lib/date";
import SideBar from "@/components/sidebar";
import LoadingAnimation from "@/components/loading-animation";
import TopBar from "@/components/topbar";
import Card from "@/components/card";
import RegularChoiceChip from "@/components/regular-choice-chip";
import Container from "@/components/container";
import UserListItem from "@/components/user-list-item";
import TableHead from "@/components/table-head";
import VerticalDivider from "@/components/vertical-divider";
import SearchField from "@/components/search-field";
import IconButton from "@/components/icon-button";
import PaginationWidget from "@/components/pagination";
import FeeListItem from "@/components/fee-list-item";
import UserActivityList from "@/components/user-activity-list";
import DropDown from "@/components/dropdown";
import DropDownItem from "@/components/dropdown-item";
import ChoiceChip from "@/components/choice-chip";
import UserListFeeItem from "@/components/user-list-fee-item";
import UnpaidTransaction from "@/components/unpaid-transaction";
import LongFeeChip from "@/components/long-fee-chip";
import axios, { AxiosError, AxiosResponse } from "axios";

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

// Root Component
export default function Page(){
    const component = useComponent();

    return component.isLoading ? <LoadingAnimation/> : <div>
        <SideBar sidebarState={component.showSidebar} sidebarController={component.setShowSidebar} navbarState={component.navbarIndex} navbarController={component.setNavbarIndex} loadingController={component.setIsLoading}/>
        <TopBar navbarState={component.navbarIndex} sidebarController={component.setShowSidebar} notificationState={component.showNotification} notificationController={component.setShowNotification}/>
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

    const currentMonthFeeAPI = useCallback(async () => {
        component.setIsLoading(true);
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        return await axios.get(`${process.env.API_URL}/admin/fees?month=${currentMonth}&year=${currentYear}`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data } = res.data as { data: [] };
                    console.log(data);
                }
            })
            .catch((error: AxiosError) => {
                const { message } = error.response?.data as { message: string };
                console.log(message);
            })
            .finally(() => component.setIsLoading(false));
    }, []);

    useEffect(() => {
        currentMonthFeeAPI();
    }, [currentMonthFeeAPI]);

    return <>
        <div className="mt-8">
            <h1 className="font-semibold text-lg">Iuran Bulan Ini</h1>
        </div>
        <div className="w-full mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <Card color="blue" title="Jumlah Warga" total={40} nominal={1568000} icon={<Users/>}/>
            <Card color="green" title="Sudah Lunas" total={40} nominal={1568000} icon={<HandCoins/>}/>
            <Card color="yellow" title="Menunggu Konfirmasi" total={40} nominal={1568000} icon={<HandCoins/>}/>
            <Card color="red" title="Belum Lunas" total={40} nominal={1568000} icon={<HandCoins/>}/>
        </div>
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="col-span-1 md:col-span-3 flex flex-col gap-8">
                <Container>
                    <div>
                        <h1 className="text-lg font-semibold">Grafik Pembayaran</h1>
                    </div>
                    <div className="flex mt-4">
                        <RegularChoiceChip active={component.filterDataIndex === 0} label="12 Bulan" onClick={() => component.setFilterDataIndex(0)}/>
                        <RegularChoiceChip active={component.filterDataIndex === 1} label="6 Bulan" onClick={() => component.setFilterDataIndex(1)}/>
                        <RegularChoiceChip active={component.filterDataIndex === 2} label="1 Bulan" onClick={() => component.setFilterDataIndex(2)}/>
                    </div>
                    <div className="mt-8">
                        <Chart/>
                    </div>
                </Container>
                <Container>
                    <div className="flex-col md:flex-row flex gap-4 justify-between items-start md:items-center">
                        <h1 className="text-lg font-semibold">Daftar Warga</h1>
                        <div className="flex gap-4 justify-center items-center">
                            <SearchField/>
                            <VerticalDivider/>
                            <IconButton icon={<Plus size={14}/>}/>
                        </div>
                    </div>
                    <div className="mt-8">
                        <table className="w-full">
                            <TableHead title={['Nama', 'No. Telepon', 'Alamat', 'RT']}/>
                            <tbody>
                                <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                                <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                                <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                            </tbody>
                        </table>
                    </div>
                    <PaginationWidget/>
                </Container>
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col gap-8">
                <Container>
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Rekapan Iuran Bulanan</h1>
                        <input type="month" name="month" id="month" className="bg-blue-500 text-white [&::-webkit-calendar-picker-indicator]:invert-[1] outline-none p-2 rounded-md [&::-webkit-datetime-edit]:hidden"/>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        <FeeListItem month="November 2024" title="Iuran Bulan November 2024"/>
                        <FeeListItem month="Oktober 2024" title="Iuran Bulan Oktober 2024"/>
                        <FeeListItem month="September 2024" title="Iuran Bulan September 2024"/>
                    </div>
                    <PaginationWidget/>
                </Container>
                <div className="bg-white p-4 md:p-8 rounded-lg shadow-md shadow-gray-300">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Aktivitas Terbaru</h1>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        <UserActivityList month="November 2024" name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" status="Belum Lunas"/>
                        <UserActivityList month="Oktober 2024" name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" status="Lunas"/>
                        <UserActivityList month="September 2024" name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" status="Lunas"/>
                    </div>
                    <PaginationWidget/>
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
                <DropDown label={component.selectedContext} onClick={() => component.setShowContextMenu(!component.showContextMenu)}/>
                {component.showContextMenu ? <div className="w-full absolute mt-2 flex flex-col justify-center items-center shadow-md shadow-gray-300">
                    <DropDownItem label="Semua RT" onClick={() => {component.setSelectedContext('Semua RT'); component.setShowContextMenu(false)}}/>
                    <DropDownItem label="RT 001" onClick={() => {component.setSelectedContext('RT 001'); component.setShowContextMenu(false)}}/>
                    <DropDownItem label="RT 002" onClick={() => {component.setSelectedContext('RT 002'); component.setShowContextMenu(false)}}/>
                    <DropDownItem label="RT 003" onClick={() => {component.setSelectedContext('RT 003'); component.setShowContextMenu(false)}}/>
                    <DropDownItem label="RT 004" onClick={() => {component.setSelectedContext('RT 004'); component.setShowContextMenu(false)}}/>
                </div> : null}
            </div>
        </div>
        <div className="w-full mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <Card color="blue" title="Jumlah Warga" total={40} nominal={1568000} icon={<Users/>}/>
            <Card color="green" title="Sudah Lunas" total={40} nominal={1568000} icon={<HandCoins/>}/>
            <Card color="yellow" title="Menunggu Konfirmasi" total={40} nominal={1568000} icon={<HandCoins/>}/>
            <Card color="red" title="Belum Lunas" total={40} nominal={1568000} icon={<HandCoins/>}/>
        </div>
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="col-span-1 md:col-span-3 flex flex-col gap-8">
                <Container>
                    <div className="w-full flex-col-reverse md:flex-row flex justify-between items-start md:items-center gap-4">
                        <div className="flex gap-2">
                            <ChoiceChip label="Semua" active={component.filterStatusIndex === 0} onClick={() => component.setFilterStatusIndex(0)}/>
                            <ChoiceChip label="Lunas" active={component.filterStatusIndex === 1} onClick={() => component.setFilterStatusIndex(1)}/>
                            <ChoiceChip label="Belum Lunas" active={component.filterStatusIndex === 2} onClick={() => component.setFilterStatusIndex(2)}/>
                        </div>
                        <SearchField/>
                    </div>
                    <div className="mt-8">
                        <table className="w-full">
                            <TableHead title={['Nama', 'Alamat', 'Status']}/>
                            <tbody>
                                <UserListFeeItem name="Repat Dwi Gunanda" address="Perum CGM, Blok. A 23" status="Lunas"/>
                                <UserListFeeItem name="Repat Dwi Gunanda" address="Perum CGM, Blok. A 23" status="Lunas"/>
                                <UserListFeeItem name="Repat Dwi Gunanda" address="Perum CGM, Blok. A 23" status="Lunas"/>
                                <UserListFeeItem name="Repat Dwi Gunanda" address="Perum CGM, Blok. A 23" status="Lunas"/>
                                <UserListFeeItem name="Repat Dwi Gunanda" address="Perum CGM, Blok. A 23" status="Lunas"/>
                            </tbody>
                        </table>
                    </div>
                    <PaginationWidget/>
                </Container>
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col gap-8">
                <Container>
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Rekapan Iuran Bulanan</h1>
                        <input type="month" name="month" id="month" className="bg-blue-500 text-white [&::-webkit-calendar-picker-indicator]:invert-[1] outline-none p-2 rounded-md [&::-webkit-datetime-edit]:hidden"/>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        <FeeListItem month="November 2024" title="Iuran Bulan November 2024"/>
                        <FeeListItem month="Oktober 2024" title="Iuran Bulan Oktober 2024"/>
                        <FeeListItem month="September 2024" title="Iuran Bulan September 2024"/>
                    </div>
                    <PaginationWidget/>
                </Container>
                <Container>
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Aktivitas Terbaru</h1>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        <UserActivityList month="November 2024" name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" status="Belum Lunas"/>
                        <UserActivityList month="Oktober 2024" name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" status="Lunas"/>
                        <UserActivityList month="September 2024" name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" status="Lunas"/>
                    </div>
                    <PaginationWidget/>
                </Container>
            </div>
        </div>
    </>
}


function Warga() {
    const component = useComponent();

    return <>    
        <div className="mt-4 w-full">
            <Container>
                <div className="flex-col gap-4 md:gap-0 md:flex-row flex justify-between items-start md:items-center">
                    <h1 className="text-lg font-semibold">Daftar Warga</h1>
                    <div className="flex gap-4 justify-center items-center">
                        <SearchField/>
                        <VerticalDivider/>
                        <IconButton icon={<Funnel size={14}/>}/>
                        <IconButton icon={<Plus size={14}/>}/>
                    </div>
                </div>
                <div className="mt-8">
                    <table className="w-full">
                        <TableHead title={['Nama', 'No. Telepon', 'Alamat', 'RT']}/>
                        <tbody>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                        </tbody>
                    </table>
                </div>
                <PaginationWidget/>
            </Container>
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
                <Container>
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
                </Container>
                <Container>
                    <h1 className="text-lg font-semibold">Riwayat Iuran</h1>
                    <div className="flex gap-2 my-4">
                        <ChoiceChip label="Semua" active={component.filterStatusIndex === 0} onClick={() => component.setFilterStatusIndex(0)}/>
                        <ChoiceChip label="Lunas" active={component.filterStatusIndex === 1} onClick={() => component.setFilterStatusIndex(1)}/>
                        <ChoiceChip label="Belum Lunas" active={component.filterStatusIndex === 2} onClick={() => component.setFilterStatusIndex(2)}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FeeListItem month="November" title="Iuran Bulan November 2024"/>
                        <FeeListItem month="Oktober" title="Iuran Bulan Oktober 2024"/>
                        <FeeListItem month="September" title="Iuran Bulan September 2024"/>
                    </div>
                </Container>
            </div>
            <div className="col-span-2 flex flex-col gap-8">
                <Container>
                    <h1 className="font-semibold text-lg">Iuran Belum Lunas</h1>
                    <div className="w-full flex justify-center font-bold text-3xl items-center mt-4 gap-1">
                        <span>Rp. </span>
                        <span>110.000</span>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        <UnpaidTransaction month="November 2024" title="Iuran Bulan November 2024" status="Belum Lunas"/>
                        <UnpaidTransaction month="Oktober 2024" title="Iuran Bulan Oktober 2024" status="Belum Lunas"/>
                    </div>
                </Container>
                <Container>
                    <div className="flex justify-between items-center">
                        <h1 className="font-semibold text-lg">Iuran Jangka Panjang</h1>
                        {monthList.length ? <Trash size={24} className="text-red-500" onClick={resetDate}/> : null}
                    </div>
                    <div className="w-full h-fit flex gap-2 flex-wrap mt-4">
                        {monthList.map((item: string, index: number) => {
                            return <LongFeeChip key={index} item={item}/>
                        })}
                        <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full flex justify-center items-center gap-2" onClick={add_month}>
                            <Plus/>
                            <span>Tambah Bulan</span>
                        </button>
                    </div>
                    {monthList.length ? <button className="bg-blue-500 p-3 text-white rounded-lg mt-8 w-full">Tandai Lunas</button> : null}
                </Container>
            </div>
        </div>
    </>
}