'use client'
import Navbar from "@/components/navbar";
import Summary from "@/components/summary";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react";
import { create } from "zustand";
import * as schema from "@/database/schema";
import LoadingAnimation from "@/components/loading-animation";
import SearchField from "@/components/search-field";
import Chip from "@/components/chip";
import UserListItem from "@/components/user-list-item";
import Popups from "@/components/popups";

interface Iuran {
    iuran: [],
    setIuran: (iuran: []) => void;
}

interface ChipIndex {
    index: number;
    setIndex: (index: number) => void;
}

interface ShowPopups {
    showPopup: boolean,
    setShowPopup: (showPopup: boolean) => void;
}

const useIuran = create<Iuran>((set) => {
    return {
        iuran: [],
        setIuran: (iuran) => set({iuran})
    }
})

const useChipIndex = create<ChipIndex>((set) => {
    return {
        index: 0,
        setIndex: (index) => set({index})
    }
})

const useShowPopup = create<ShowPopups>((set) => {
    return {
        showPopup: false,
        setShowPopup: (showPopup) => set({showPopup})
    }
})

export default function Page(){
    const searchParams = useSearchParams();
    const {index, setIndex} = useChipIndex();
    const {showPopup, setShowPopup} = useShowPopup();
    const [userPaymentID, setUserPaymentID] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {setIuran} = useIuran();
    const iuran = useIuran((state) => {
        return state.iuran as {payments: schema.paymentsType, users: schema.usersType, fees: schema.feesType}[];
    });

    const iuran_api = useCallback( async (fee_id: string) => {
        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        setIsLoading(true);
        return await axios.get(`${host}/admin/iuran?fee_id=${fee_id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res: AxiosResponse) => {
            const { data } = res.data as {data: []};
            setIuran(data);
        }).catch((error: AxiosError) => {
            const { message } = error.response?.data as {message: string};
            console.log(message);
        }).finally(() => setIsLoading(false));
    }, [])

    const filter_iuran_api = useCallback(async (fee_id: number, filter: string) => {
        setIsLoading(true);
        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/iuran?fee_id=${fee_id}&filter=${filter}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res: AxiosResponse) => {
            const { data } = res.data as {data: []};
            console.log(data);
            setIuran(data);
        }).catch((error: AxiosError) => {
            const { message } = error.response?.data as {message: string};
            console.log(message);
        }).finally(() => setIsLoading(false));
    }, [])

    const filter = (fee_id: number, index: number) => {
        let filter = "";
        if(index === 0){
            filter = "";
        } else if(index === 1){
            filter = "done"
        } else if(index === 2){
            filter = "undone"
        };

        filter_iuran_api(fee_id, filter)
    }

    useEffect(() => {
        const fee_id = searchParams.get('fee_id');
        if(fee_id){
            iuran_api(fee_id);
        }
    }, [iuran_api, searchParams]);
    
    return isLoading ? <LoadingAnimation/> : <>
        <Navbar/>
        <div className="mt-24 px-6">
            <Summary datetime={iuran[0]?.fees?.fee_date || ""} amount={iuran[0]?.fees?.fee_amount || 0}/>
            <SearchField className="mt-8 mb-4"/>
            <Chip index={index} setIndex={setIndex} onClick={(index: number) => filter(parseInt(searchParams.get('fee_id')!), index)}/>
            <div className="my-4">
                {iuran.map((data: {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}) => {
                    return <UserListItem key={data.payments.payment_id} address={data.users.address!} name={data.users.name!} phone={data.users.phone!} state={data.payments.payment_description!} onClick={() => {setUserPaymentID(data.payments.payment_id); setShowPopup(true)}}/>
                })}
            </div>
        </div>
        {showPopup ? <Popups payment_id={userPaymentID} showPopup={showPopup} setShowPopup={setShowPopup} setData={setIuran} fee_id={iuran[0].fees.fee_id.toString()}/> : null}
    </>
}