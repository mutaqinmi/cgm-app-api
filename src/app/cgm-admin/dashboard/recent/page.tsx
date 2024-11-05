'use client'
import Navbar from "@/components/navbar";
import UserListItem from "@/components/user-list-item";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { create } from "zustand";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import * as schema from "@/database/schema";
import LoadingAnimation from "@/components/loading-animation";
import Popups from "@/components/popups";

interface Iuran {
    paymentHistory: [],
    setPaymentHistory: (data: []) => void;
}

interface ShowComponent {
    showPopup: boolean,
    setShowPopup: (showPopup: boolean) => void;
}

const useIuran = create<Iuran>((set) => {
    return {
        paymentHistory: [],
        setPaymentHistory: (paymentHistory) => set({paymentHistory}),
    }
})

const useShow = create<ShowComponent>((set) => {
    return {
        showPopup: false,
        setShowPopup: (showPopup) => set({showPopup}),
    }
})

export default function Page(){
    const route = useRouter();
    const {paymentHistory, setPaymentHistory} = useIuran();
    const {showPopup, setShowPopup} = useShow();
    const [userPaymentID, setUserPaymentID] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const payment_history_api = useCallback(async () => {
        setIsLoading(true);

        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/iuran/history`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response: AxiosResponse) => {
            const { data } = response.data as {data: []};
            setPaymentHistory(data);
        }).catch((error: AxiosError) => {
            const {message} = error.response?.data as {message: string};
            console.log(message);
        }).finally(() => setIsLoading(false));
    }, [])

    useEffect(() => {
        payment_history_api()
    }, [payment_history_api])

    return isLoading ? <LoadingAnimation/> : <>
        <Navbar/>
        <div className="mt-24 px-6">
            <div className="flex flex-col gap-4 mb-12">
                {paymentHistory.map((data: {payments: schema.paymentsType, users: schema.usersType}) => {
                    return <UserListItem key={data.payments.payment_id} address={data.users.address!} name={data.users.name!} phone={data.users.phone!} state={data.payments.payment_description!} onClick={() => {setUserPaymentID(data.payments.payment_id); setShowPopup(true)}}/>
                })}
            </div>
        </div>
        {showPopup ? <Popups payment_id={userPaymentID} showPopup={showPopup} setShowPopup={setShowPopup} setData={setPaymentHistory}/> : null}
    </>
}