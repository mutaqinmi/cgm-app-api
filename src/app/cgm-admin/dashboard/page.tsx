'use client'
import IuranMenu from "@/components/iuran-menu";
import Navbar from "@/components/navbar";
import SingleIuran from "@/components/single-iuran";
import TextButton from "@/components/text-button";
import UserListItem from "@/components/user-list-item";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FormEvent, useCallback, useEffect } from "react";
import { create } from "zustand";
import * as schema from "@/database/schema";
import * as date from "@/lib/date";
import IuranNotSet from "@/components/iuran-not-set";
import ModalBottomSheet from "@/components/modal-bottom-sheet";
import RegularInputField from "@/components/regular-input-field";
import FilledButton from "@/components/filled-button";
import Form from "next/form";
import LoadingAnimation from "@/components/loading-animation";

interface ThisMonthIuran {
    thisMonthData: [schema.feesType],
    setThisMonthData: (data: [schema.feesType]) => void;
}

interface AllIuran {
    allIuranData: [],
    setAllIuranData: (data: []) => void;
}

interface PaymentHistory {
    paymentHistory: [],
    setPaymentHistory: (data: []) => void;
}

interface ModalBottomSheet {
    showModal: boolean,
    setShowModal: (showModal: boolean) => void;
}

interface IuranField {
    value: string,
    setValue: (value: string) => void;
}

const useThisMonthDataIuran = create<ThisMonthIuran>((set) => {
    return {
        thisMonthData: [{fee_id: 0, fee_amount: 0, fee_date: ""}],
        setThisMonthData: (thisMonthData) => set({thisMonthData})
    }
})

const useAllIuranData = create<AllIuran>((set) => {
    return {
        allIuranData: [],
        setAllIuranData: (allIuranData) => set({allIuranData})
    }
})

const usePaymentHistory = create<PaymentHistory>((set) => {
    return {
        paymentHistory: [],
        setPaymentHistory: (paymentHistory) => set({paymentHistory})
    }
})

const useModalBottomSheet = create<ModalBottomSheet>((set) => {
    return {
        showModal: false,
        setShowModal: (showModal) => set({showModal})
    }
})

const useIuranField = create<IuranField>((set) => {
    return {
        value: "",
        setValue: (value) => set({value})
    }
})

export default function Page(){
    const {thisMonthData, setThisMonthData} = useThisMonthDataIuran();
    const {allIuranData, setAllIuranData} = useAllIuranData();
    const {paymentHistory, setPaymentHistory} = usePaymentHistory();
    const {showModal, setShowModal} = useModalBottomSheet();
    const {value, setValue} = useIuranField();

    const iuran_this_month_api = useCallback(async () => {
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/iuran?month=${month}&year=${year}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, [])

    const all_iuran_api = useCallback(async () => {
        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/iuran`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, [])

    const payment_history_api = useCallback(async () => {
        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/iuran/history`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, [])

    const set_iuran_api = useCallback(async (amount: string) => {
        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.post(`${host}/admin/iuran`, {
            amount
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, [])

    useEffect(() => {
        iuran_this_month_api().then((response: AxiosResponse) => {
            const { data } = response.data as {data: [schema.feesType]};
            setThisMonthData(data);
        }).catch((error: AxiosError) => {
            const {message} = error.response?.data as {message: string};
            console.log(message);
        })

        all_iuran_api().then((response: AxiosResponse) => {
            const { data } = response.data as {data: []};
            setAllIuranData(data);
        }).catch((error: AxiosError) => {
            const {message} = error.response?.data as {message: string};
            console.log(message);
        })

        payment_history_api().then((response: AxiosResponse) => {
            const { data } = response.data as {data: []};
            setPaymentHistory(data);
        }).catch((error: AxiosError) => {
            const {message} = error.response?.data as {message: string};
            console.log(message);
        })
    }, [])

    const set_iuran = (event: FormEvent<HTMLFormElement>) : void => {
        event.preventDefault();
        set_iuran_api(value).then((response) => {
            setShowModal(false);
            iuran_this_month_api().then((response: AxiosResponse) => {
                const { data } = response.data as {data: [schema.feesType]};
                setThisMonthData(data);
            }).catch((error: AxiosError) => {
                const {message} = error.response?.data as {message: string};
                console.log(message);
            })
        }).catch((error: AxiosError) => {
            const {message} = error.response?.data as {message: string};
            console.log(message);
        })
    }

    return <>
        {thisMonthData[0].fee_id === 0 && allIuranData.length < 1 && paymentHistory.length < 1 ? <LoadingAnimation/> : null}
        <Navbar/>
        <div className="mt-24 px-6">
            <h2 className="font-semibold mb-4">Iuran Bulan Ini</h2>
            {thisMonthData.length < 1 ? <IuranNotSet date={`${new Date().getMonth() + 1}-${new Date().getFullYear()}`} setShowModal={setShowModal}/> : <SingleIuran title={date.toString(thisMonthData[0].fee_date as string)} amount={thisMonthData[0].fee_amount as number}/>}
            <div className="flex justify-between items-center mb-4 mt-8">
                <h2 className="font-semibold">Rekapan Iuran Bulanan</h2>
                <TextButton title="Lainnya"/>
            </div>
            <div className="flex flex-col gap-4">
                {allIuranData.map((data: {payments: schema.paymentsType, fees: schema.feesType}) => {
                    return <IuranMenu key={data.fees.fee_id} month={date.toString(data.fees.fee_date as string)} title={`Iuran Bulanan ${date.toString(data.fees.fee_date as string).split(' ')[0]}`}/>
                })}
            </div>
            <div className="flex justify-between items-center mb-4 mt-8">
                <h2 className="font-semibold">Aktivitas Terbaru</h2>
                <TextButton title="Lainnya"/>
            </div>
            <div className="flex flex-col gap-4">
                {paymentHistory.map((data: {payments: schema.paymentsType, users: schema.usersType}) => {
                    return <UserListItem key={data.payments.payment_id} address={data.users.address!} name={data.users.name!} phone={data.users.phone!} state={data.payments.payment_description!}/>
                })}
            </div>
            {showModal ? <ModalBottomSheet setShowModal={setShowModal} title={`Atur Iuran ${date.toString((new Date().getMonth() + 1).toString() + '-' + (new Date().getFullYear()).toString())}`}>
                <Form action={""} formMethod="POST" onSubmit={set_iuran}>
                    <RegularInputField title="Nominal Iuran" value={value} setValue={setValue} className="my-6"/>
                    <FilledButton type="submit" title="Atur Iuran"/>
                </Form>
            </ModalBottomSheet> : null}
        </div>
    </>
}