'use client'
import LoadingAnimation from "@/components/loading-animation";
import Navbar from "@/components/navbar";
import { Coins, HandCoins, Plus, User } from "@phosphor-icons/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { create } from "zustand";
import * as  schema from "@/database/schema";
import IconButton from "@/components/icon-button";
import * as date from "@/lib/date";
import IuranMenuOnUser from "@/components/iuran-menu-on-user";
import Popups from "@/components/popups";
import ModalBottomSheet from "@/components/modal-bottom-sheet";
import NonEditedField from "@/components/non-edited-field";
import FilledButton from "@/components/filled-button";

interface ComponentState {
    isLoading: boolean,
    showPopup: boolean,
    paymentID: number,
    showModal: boolean,
    setIsLoading: (isLoading: boolean) => void,
    setShowPopup: (showPopup: boolean) => void,
    setPaymentID: (paymentID: number) => void,
    setShowModal: (showModal: boolean) => void,
}

interface UserData {
    data: [],
    month_list: string[],
    setData: (data: []) => void,
    setMonthList: (month_list: string[]) => void,
}

const useComponentState = create<ComponentState>(set => ({
    isLoading: false,
    showPopup: false,
    paymentID: 0,
    showModal: false,
    setIsLoading: (isLoading: boolean) => set({isLoading}),
    setShowPopup: (showPopup: boolean) => set({showPopup}),
    setPaymentID: (paymentID: number) => set({paymentID}),
    setShowModal: (showModal: boolean) => set({showModal}),
}))

const useUserData = create<UserData>(set => ({
    data: [],
    month_list: [],
    setData: (data: []) => set({data}),
    setMonthList: (month_list: string[]) => set({month_list}),
}))

export default function Page(){
    const searchParams = useSearchParams();
    const month_inc = useRef(1);
    const currentDate = useRef({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    })
    const route = useRouter();
    const {isLoading, showPopup, paymentID, showModal, setIsLoading, setShowPopup, setPaymentID, setShowModal} = useComponentState();
    const {month_list, setMonthList, setData} = useUserData();
    const data = useUserData(state => state.data as {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}[]);

    const groupByYear = (data: {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}[]) => {
        return data.reduce((acc, item) => {
            const year = item.fees.fee_date!.split('-')[0];
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(item);
            return acc;
        }, {} as { [key: string]: {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}[] });
    };

    const get_user_api = useCallback(async (user_id: string) => {
        setIsLoading(true);

        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/users?user_id=${user_id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res: AxiosResponse) => {
            const { data } = res.data as {data: []};
            setData(data);
        }).catch((error: AxiosError) => {
            const { message } = error.response?.data as {message: string};
            console.log(message);
        }).finally(() => setIsLoading(false));
    }, [])

    const set_multiple_iuran_api = useCallback(async (user_id: number, month_list: string[]) => {
        setIsLoading(true);

        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.post(`${host}/admin/iuran/multiple`, {
            user_id,
            date: month_list
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res: AxiosResponse) => {
            refresh();
            resetDate();
            setShowModal(false);
        }).catch((error: AxiosError) => {
            const { message } = error.response?.data as {message: string};
            console.log(message);
        }).finally(() => setIsLoading(false));
    }, [])

    const refresh = useCallback(() => {
        const user_id = searchParams.get('user_id');
        if(user_id){
            get_user_api(user_id);
        }
    }, [searchParams])

    const add_month = () => {
        let month = currentDate.current.month + month_inc.current;
        let year = currentDate.current.year;

        if (month > 12) {
            month = 1;
            year += 1;
        }

        const formattedDate: string = `${year}-${month.toString().padStart(2, "0")}`;
        const updatedList = [...month_list, formattedDate];
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

    useEffect(() => {
        const user_id = searchParams.get('user_id');
        if(user_id){
            get_user_api(user_id);
        }
    }, [searchParams])

    const groupData = groupByYear(data);

    return isLoading ? <LoadingAnimation/> : <>
        <Navbar/>
        <div className="my-24 px-6">
            <div className="flex flex-col justify-center items-center gap-4">
                <div className="w-32 h-32 bg-blue-300 text-blue-500 rounded-full flex justify-center items-center"><User size={45}/></div>
                <div className="flex flex-col justify-center items-center gap-1">
                    <span className="text-sm">{data[0] ? data[0].users.address! : ""}</span>
                    <h1 className="text-xl font-semibold">{data[0] ? data[0].users.name! : ""}</h1>
                    <span className="text-sm">{data[0] ? data[0].users.phone! : ""}</span>
                </div>
                <div className="w-full my-4 flex justify-evenly items-start">
                    <IconButton icon={<HandCoins/>} title="Bayar Iuran" onClick={() => route.push(`/cgm-admin/users/detail/iuran?user_id=${data[0].users.user_id}`)}/>
                    <IconButton icon={<Coins/>} title="Iuran Jangka Panjang" onClick={() => setShowModal(true)}/>
                </div>
            </div>
            <div className="flex flex-col mt-4 gap-4">
                <h2 className="font-semibold text-lg">Riwayat Iuran</h2>
                <div className="flex flex-col-reverse gap-4">
                    {Object.keys(groupData).map((year) => (
                        <div key={year}>
                            <h2 className="text-lg font-semibold mb-2 text-gray-500">{year}</h2>
                            <div className="flex flex-col gap-4">
                                {groupData[year].map((data: {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}) => {
                                    return <IuranMenuOnUser key={data.fees.fee_id} month={date.toString(data.fees.fee_date!)} title={`Iuran Bulanan ${date.toString(data.fees.fee_date!).split(' ')[0]}`} state={data.payments.payment_status!} state_desc={data.payments.payment_description!} onClick={() => {setPaymentID(data.payments.payment_id); setShowPopup(true)}}/>
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        {showPopup ? <Popups payment_id={paymentID} showPopup={showPopup} setShowPopup={setShowPopup} onRefresh={refresh}/> : null}
        {showModal ? <ModalBottomSheet setShowModal={setShowModal} title="Iuran Jangka Panjang" onClosed={resetDate}>
            <div className="flex flex-col gap-4 my-2">
                <NonEditedField title="Nama Warga" description={data[0].users.name!}/>
                <NonEditedField title="Alamat" description={data[0].users.address!}/>
            </div>
            <div className="flex flex-col gap-4 my-4">
                <span className="text-black">Iuran untuk</span>
                <div className="w-full flex gap-2 flex-wrap">
                    {month_list.map((item: string, index: number) => {
                        return <div key={index} className="px-4 py-2 bg-blue-500 text-white rounded-full">
                            <span>{date.toString(item)}</span>
                        </div>
                    })}
                    <div className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full flex justify-center items-center gap-2" onClick={add_month}>
                        <Plus/>
                        <span>Tambah Bulan</span>
                    </div>
                </div>
            </div>
            <FilledButton type="button" title="Tandai Lunas" className="mt-8" onClick={() => set_multiple_iuran_api(data[0].users.user_id!, month_list)}/>
        </ModalBottomSheet> : null}
    </>
}