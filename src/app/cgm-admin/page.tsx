'use client';
import { CaretRight, HandCoins, User, Users, Plus, Funnel, Pencil, Eye, EyeSlash, XCircle, Trash, CheckCircle, DotsThreeVertical, Phone, MapPin, X, List, ArrowRight  } from "@phosphor-icons/react";
import { create } from "zustand";
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from "react";
import * as convertDate from "@/lib/date-converter";
import SideBar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import Card from "@/components/card";
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
import FilledButton from "@/components/filled-button";
import Form from "next/form";
import { useRouter } from "next/navigation";
import * as schema from "@/database/schema";
import * as dateConvert from "@/lib/date-converter";

interface ComponentState {
    navbarIndex: number,
    filterDataIndex: number,
    showContextMenu: boolean,
    selectedContext: string,
    filterStatusIndex: number,
    showNotification: boolean,
    profileSelectedIndex: number,
    selectedFeeID: number,
    selectedUserID: number,
    showSidebar: boolean,
    isLoading: boolean,
    showSetFeePopup: boolean,
    showAddUserPopup: boolean,
    setNavbarIndex: (index: number) => void,
    setFilterDataIndex: (index: number) => void,
    setShowContextMenu: (show: boolean) => void,
    setSelectedContext: (context: string) => void,
    setFilterStatusIndex: (index: number) => void,
    setShowNotification: (show: boolean) => void,
    setProfileSelectedIndex: (index: number) => void,
    setSelectedFeeID: (id: number) => void,
    setSelectedUserID: (id: number) => void,
    setShowSidebar: (show: boolean) => void,
    setIsLoading: (loading: boolean) => void,
    setShowSetFeePopup: (show: boolean) => void,
    setShowAddUserPopup: (show: boolean) => void,
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
        selectedFeeID: 0,
        selectedUserID: 0,
        showSidebar: false,
        isLoading: false,
        showSetFeePopup: false,
        showAddUserPopup: false,
        setNavbarIndex: (index: number) => set({navbarIndex: index}),
        setFilterDataIndex: (index: number) => set({filterDataIndex: index}),
        setShowContextMenu: (show: boolean) => set({showContextMenu: show}),
        setSelectedContext: (context: string) => set({selectedContext: context}),
        setFilterStatusIndex: (index: number) => set({filterStatusIndex: index}),
        setShowNotification: (show: boolean) => set({showNotification: show}),
        setProfileSelectedIndex: (index: number) => set({profileSelectedIndex: index}),
        setSelectedFeeID: (id: number) => set({selectedFeeID: id}),
        setSelectedUserID: (id: number) => set({selectedUserID: id}),
        setShowSidebar: (show: boolean) => set({showSidebar: show}),
        setIsLoading: (loading: boolean) => set({isLoading: loading}),
        setShowSetFeePopup: (show: boolean) => set({showSetFeePopup: show}),
        setShowAddUserPopup: (show: boolean) => set({showAddUserPopup: show}),
    }
})

// Root Component
export default function Page(){
    return <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center">
        <h1 className="text-3xl font-semibold">Selamat Datang di CGM Admin</h1>
        <span className="text-sm">Lihat semua perkembangan tentang Perum Cipta Graha Mandiri. <Link href={'/cgm-admin/dashboard'} className="underline">Masuk ke Dashboard</Link></span>
    </div>
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