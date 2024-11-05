'use client'
import IuranMenu from "@/components/iuran-menu";
import Navbar from "@/components/navbar";
import SingleIuran from "@/components/single-iuran";
import TextButton from "@/components/text-button";
import UserListItem from "@/components/user-list-item";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { create } from "zustand";
import * as schema from "@/database/schema";
import * as date from "@/lib/date";
import IuranNotSet from "@/components/iuran-not-set";
import ModalBottomSheet from "@/components/modal-bottom-sheet";
import RegularInputField from "@/components/regular-input-field";
import FilledButton from "@/components/filled-button";
import Form from "next/form";
import LoadingAnimation from "@/components/loading-animation";
import Popups from "@/components/popups";
import { useRouter } from "next/navigation";

interface Iuran {
    allIuranData: [],
    thisMonthData: [schema.feesType],
    paymentHistory: [],
    iuranField: string,
    setAllIuranData: (data: []) => void;
    setThisMonthData: (data: [schema.feesType]) => void;
    setPaymentHistory: (data: []) => void;
    setIuranField: (data: string) => void;
}

interface ShowComponent {
    showModal: boolean,
    showPopup: boolean,
    setShowModal: (showModal: boolean) => void;
    setShowPopup: (showPopup: boolean) => void;
}

const useIuran = create<Iuran>((set) => {
    return {
        allIuranData: [],
        thisMonthData: [{fee_id: 0, fee_amount: 0, fee_date: ""}],
        paymentHistory: [],
        iuranField: "",
        setThisMonthData: (thisMonthData) => set({thisMonthData}),
        setAllIuranData: (allIuranData) => set({allIuranData}),
        setPaymentHistory: (paymentHistory) => set({paymentHistory}),
        setIuranField: (iuranField) => set({iuranField})
    }
})

const useShow = create<ShowComponent>((set) => {
    return {
        showModal: false,
        showPopup: false,
        setShowModal: (showModal) => set({showModal}),
        setShowPopup: (showPopup) => set({showPopup}),
    }
})

export default function Page(){
    const route = useRouter();
    const {thisMonthData, allIuranData, paymentHistory, iuranField, setThisMonthData, setAllIuranData, setPaymentHistory, setIuranField} = useIuran();
    const {showModal, showPopup, setShowModal, setShowPopup} = useShow();
    const [userPaymentID, setUserPaymentID] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
 
    const iuran_this_month_api = useCallback(async () => {
        setIsLoading(true);

        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/iuran?month=${month}&year=${year}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response: AxiosResponse) => {
            const { data } = response.data as {data: [schema.feesType]};
            setThisMonthData(data);
        }).catch((error: AxiosError) => {
            const {message} = error.response?.data as {message: string};
            console.log(message);
        }).finally(() => setIsLoading(false));
    }, [])

    const all_iuran_api = useCallback(async () => {
        setIsLoading(true);

        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/iuran`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response: AxiosResponse) => {
            const { data } = response.data as {data: []};
            setAllIuranData(data);
        }).catch((error: AxiosError) => {
            const {message} = error.response?.data as {message: string};
            console.log(message);
        }).finally(() => setIsLoading(false));
    }, [])

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

    const set_iuran_api = useCallback(async (amount: string) => {
        setIsLoading(true);
        
        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.post(`${host}/admin/iuran`, {
            amount
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response: AxiosResponse) => {
            setShowModal(false);
            iuran_this_month_api();
        }).catch((error: AxiosError) => {
            const {message} = error.response?.data as {message: string};
            console.log(message);
        }).finally(() => setIsLoading(false));
    }, [])

    const set_iuran = (event: FormEvent<HTMLFormElement>) : void => {
        event.preventDefault();
        set_iuran_api(iuranField)
    }
    
    useEffect(() => {
        iuran_this_month_api()
        all_iuran_api()
        payment_history_api()
    }, [iuran_this_month_api, all_iuran_api, payment_history_api])

    return isLoading ? <LoadingAnimation/> : <>
        <Navbar/>
        <div className="mt-24 px-6">
            <h2 className="font-semibold mb-4">Iuran Bulan Ini</h2>
            {thisMonthData.length < 1 ? <IuranNotSet date={`${new Date().getMonth() + 1}-${new Date().getFullYear()}`} setShowModal={setShowModal}/> : <SingleIuran title={date.toString(thisMonthData[0].fee_date as string)} amount={thisMonthData[0].fee_amount as number} onClick={() => route.push(`/cgm-admin/dashboard/iuran?fee_id=${thisMonthData[0].fee_id}`)}/>}
            <div className="flex justify-between items-center mb-4 mt-8">
                <h2 className="font-semibold">Rekapan Iuran Bulanan</h2>
                <TextButton title="Lainnya"/>
            </div>
            <div className="flex flex-col gap-4">
                {allIuranData.map((data: schema.feesType) => {
                    return <IuranMenu key={data.fee_id} month={date.toString(data.fee_date!)} title={`Iuran Bulanan ${date.toString(data.fee_date!).split(' ')[0]}`} onClick={() => route.push(`/cgm-admin/dashboard/iuran?fee_id=${data.fee_id}`)}/>
                })}
            </div>
            <div className="flex justify-between items-center mb-4 mt-8">
                <h2 className="font-semibold">Aktivitas Terbaru</h2>
                <TextButton title="Lainnya"/>
            </div>
            <div className="flex flex-col gap-2 mb-12">
                {paymentHistory.map((data: {payments: schema.paymentsType, users: schema.usersType}) => {
                    return <UserListItem key={data.payments.payment_id} address={data.users.address!} name={data.users.name!} phone={data.users.phone!} state={data.payments.payment_description!} onClick={() => {setUserPaymentID(data.payments.payment_id); setShowPopup(true)}}/>
                })}
            </div>
            {showModal ? <ModalBottomSheet setShowModal={setShowModal} title={`Atur Iuran ${date.toString((new Date().getMonth() + 1).toString() + '-' + (new Date().getFullYear()).toString())}`}>
                <Form action={""} formMethod="POST" onSubmit={set_iuran}>
                    <RegularInputField title="Nominal Iuran" value={iuranField} setValue={setIuranField} className="my-6"/>
                    <FilledButton type="submit" title="Atur Iuran"/>
                </Form>
            </ModalBottomSheet> : null}
            {showPopup ? <Popups payment_id={userPaymentID} showPopup={showPopup} setShowPopup={setShowPopup} setData={setPaymentHistory} isDashboard/> : null}
        </div>
    </>
}