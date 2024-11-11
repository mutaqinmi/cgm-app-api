'use client'
import Navbar from "@/components/navbar";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { create } from "zustand";
import * as schema from "@/database/schema";
import numberFormatter from "@/lib/formatter";
import * as date from "@/lib/date";
import LoadingAnimation from "@/components/loading-animation";
import IuranMenuOnUser from "@/components/iuran-menu-on-user";
import Popups from "@/components/popups";

interface ComponentState {
    isLoading: boolean,
    showPopup: boolean,
    paymentID: number,
    setIsLoading: (isLoading: boolean) => void,
    setShowPopup: (showPopup: boolean) => void,
    setPaymentID: (paymentID: number) => void,
}

interface UserData {
    data: [],
    setData: (data: []) => void,
}

const useComponentState = create<ComponentState>(set => ({
    isLoading: false,
    showPopup: false,
    paymentID: 0,
    setIsLoading: (isLoading: boolean) => set({isLoading}),
    setShowPopup: (showPopup: boolean) => set({showPopup}),
    setPaymentID: (paymentID: number) => set({paymentID}),
}))

const useUserData = create<UserData>(set => ({
    data: [],
    setData: (data: []) => set({data}),
}))

export default function Page(){
    const searchParams = useSearchParams();
    const {isLoading, showPopup, paymentID, setIsLoading, setShowPopup, setPaymentID} = useComponentState();
    const {setData} = useUserData();
    const data = useUserData(state => state.data as {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}[]);

    const get_payment_api = useCallback(async (user_id: string) => {
        setIsLoading(true);

        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/users?user_id=${user_id}&filtered=true`, {
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

    const refresh = useCallback(() => {
        const user_id = searchParams.get('user_id');
        if(user_id){
            get_payment_api(user_id);
        }
    }, [searchParams])

    useEffect(() => {
        const user_id = searchParams.get('user_id');
        if(user_id){
            get_payment_api(user_id);
        }
    }, [searchParams])

    return isLoading ? <LoadingAnimation/> : <>
        <Navbar/>
        <div className="my-24 px-6">
            <div className="flex flex-col gap-3 justify-center items-center">
                <span className="text-gray-500">Jumlah Iuran Tersisa</span>
                <h1 className="text-4xl font-semibold">{numberFormatter((data[0] ? data.reduce((total: number, item: {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}) => total + (item.fees.fee_amount || 0 * (Array.isArray(item.users) ? item.users.length : 0)), 0)! : 0).toString())}</h1>
            </div>
            <div className="my-8 flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Daftar Iuran</h2>
                {!data.length ? <span className="w-full my-4 text-center text-gray-500 italic flex justify-center">Semua Iuran Sudah Lunas.</span> : data.map((data: {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}) => {
                    return <IuranMenuOnUser key={data.fees.fee_id} month={date.toString(data.fees.fee_date!)} title={`Iuran Bulanan ${date.toString(data.fees.fee_date!).split(' ')[0]}`} state={data.payments.payment_status!} state_desc={data.payments.payment_description!} onClick={() => {setPaymentID(data.payments.payment_id); setShowPopup(true)}}/>
                })}
            </div>
        </div>
        {showPopup ? <Popups payment_id={paymentID} showPopup={showPopup} setShowPopup={setShowPopup} onRefresh={refresh}/> : null}
    </>
}