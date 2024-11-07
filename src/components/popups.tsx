'use client'
import { MoneyWavy } from "@phosphor-icons/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect } from "react";
import { create } from "zustand";
import * as schema from "@/database/schema";
import LoadingAnimationComp from "./loading-animation-comp";
import * as date from "@/lib/date";
import numberFormatter from "@/lib/formatter";
import FilledButton from "./filled-button";
import OutlinedButton from "./outlined-button";

interface PaymentData {
    dataPayment: [],
    setDataPayment: (dataPayment: []) => void;
}

const usePayment = create<PaymentData>((set) => {
    return {
        dataPayment: [],
        setDataPayment: (dataPayment) => set({dataPayment})
    }
})

export default function Popups(props: {payment_id: number; showPopup: boolean; setShowPopup: (showPopup: boolean) => void; onRefresh: () => void}) {
    const {setDataPayment} = usePayment();
    const dataPayment = usePayment((state) => {
        return state.dataPayment as {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}[];
    });

    const get_payment_api = useCallback(async (payment_id: number) => {
        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/iuran/warga?payment_id=${payment_id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')!
            }
        })
    }, [])

    const update_payment_api = useCallback(async (payment_id: number, payment_status: boolean, payment_description: string) => {
        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.patch(`${host}/admin/iuran/warga?payment_id=${payment_id}`, {
            payment_status,
            payment_description
        }, {
            headers: {
                'Authorization': localStorage.getItem('token')!
            }
        })
    }, [])

    useEffect(() => {
        if(props.showPopup === true){
            setDataPayment([]);
        }

        if(props.payment_id !== 0){
            get_payment_api(props.payment_id).then(response => {
                const {data} = response.data as {data: []};
                setDataPayment(data);
            }).catch((error: AxiosError) => {
                const {message} = error.response?.data as {message: string};
                console.log(message);
            })
        }
    }, [])

    const update_payment = (payment_id: number, payment_status: boolean, payment_description: string) => {
        update_payment_api(payment_id, payment_status, payment_description).then(() => {
            props.onRefresh();
            props.setShowPopup(false);
        }).catch((error: AxiosError) => {
            const {message} = error.response?.data as {message: string};
            console.log(message);
        })
    }

    return <div className="w-screen h-screen fixed top-0 left-0 z-50">
        <div className="bg-black bg-opacity-50 w-full h-full absolute" onClick={() => props.setShowPopup(false)}></div>
        <div className="w-72 shadow-md text-center p-4 rounded-lg bg-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            {!dataPayment.length ? <LoadingAnimationComp/> :
            <div className="flex flex-col justify-between gap-4">
                {dataPayment[0].payments.payment_status ? null : <span className="text-lg font-semibold">Konfirmasi Iuran</span>}
                <div className="flex justify-center my-2">
                    <div className="w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center">
                        <MoneyWavy size={32} className="text-blue-500"/>
                    </div>
                </div>
                <div>
                    <div className="text-xs text-gray-400">
                        <span>{`Iuran Bulan ${date.toString(dataPayment[0].fees.fee_date!)}`}</span>
                    </div>
                    <div className="font-medium">
                        <span>{numberFormatter((dataPayment[0].fees.fee_amount!).toString())}</span>
                    </div>
                </div>
                <div>
                    <div className="text-xs text-gray-400">
                        <span>Warga</span>
                    </div>
                    <div className="font-medium">
                        <span>{dataPayment[0].users.name}</span>
                    </div>
                </div>
                <div>
                    <div className="text-xs text-gray-400">
                        <span>Alamat</span>
                    </div>
                    <div className="font-medium">
                        <span>{dataPayment[0].users.address}</span>
                    </div>
                </div>
                {dataPayment[0].payments.payment_status ? null : <div className="flex flex-col justify-center items-center gap-2 mt-6">
                    <FilledButton type="button" title="Tandai Lunas" onClick={() => update_payment(props.payment_id, true, 'done')}/>
                    <OutlinedButton type="button" title="Tutup" onClick={() => props.setShowPopup(false)}/>
                </div>}
            </div>}
        </div>
    </div>
}
