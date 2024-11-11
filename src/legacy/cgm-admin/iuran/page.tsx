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
import Form from "next/form";

interface Iuran {
    iuran: [],
    filteredData: [],
    setIuran: (iuran: []) => void,
    setFilteredData: (filteredData: []) => void,
}

interface ComponentsState {
    chipIndex: number,
    showPopup: boolean,
    userPaymentID: number,
    isLoading: boolean,
    search: string,
    setChipIndex: (chipIndex: number) => void,
    setShowPopup: (showPopup: boolean) => void,
    setUserPaymentID: (userPaymentID: number) => void,
    setIsLoading: (isLoading: boolean) => void,
    setSearch: (search: string) => void,
}

const useIuran = create<Iuran>((set) => {
    return {
        iuran: [],
        filteredData: [],
        setIuran: (iuran) => set({iuran}),
        setFilteredData: (filteredData) => set({filteredData})
    }
})

const useComponentsState = create<ComponentsState>((set) => {
    return {
        chipIndex: 0,
        showPopup: false,
        userPaymentID: 0,
        isLoading: false,
        search: "",
        setChipIndex: (chipIndex) => set({chipIndex}),
        setShowPopup: (showPopup) => set({showPopup}),
        setUserPaymentID: (userPaymentID) => set({userPaymentID}),
        setIsLoading: (isLoading) => set({isLoading}),
        setSearch: (search) => set({search})
    }
})

export default function Page(){
    const searchParams = useSearchParams();
    const {chipIndex, showPopup, userPaymentID, setChipIndex, isLoading, search, setShowPopup, setUserPaymentID, setIsLoading, setSearch} = useComponentsState();
    const {setIuran, setFilteredData} = useIuran();
    const iuran = useIuran((state) => {
        return state.iuran as {payments: schema.paymentsType, users: schema.usersType, fees: schema.feesType}[];
    });
    const filteredData = useIuran((state) => {
        return state.filteredData as {payments: schema.paymentsType, users: schema.usersType, fees: schema.feesType}[];
    });

    const iuran_api = useCallback(async (fee_id: string) => {
        setIsLoading(true);

        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
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
            setFilteredData(data);
        }).catch((error: AxiosError) => {
            const { message } = error.response?.data as {message: string};
            console.log(message);
        }).finally(() => setIsLoading(false));
    }, [])

    const search_api = useCallback(async (fee_id: number, query: string) => {
        setIsLoading(true);

        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/iuran?fee_id=${fee_id}&search=${query}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res: AxiosResponse) => {
            const { data } = res.data as {data: []};
            setFilteredData(data);
        }).catch((error: AxiosError) => {
            const { message } = error.response?.data as {message: string};
            console.log(message);
        }).finally(() => setIsLoading(false));
    }, [])

    const filter = useCallback((fee_id: number, filter: string) => {
        filter_iuran_api(fee_id, filter)
    }, [filter_iuran_api])

    const searchUserOrAddress = (event: React.FormEvent<HTMLFormElement>) : void => {
        event.preventDefault();
        search_api(parseInt(searchParams.get('fee_id')!), search);
    }

    const refresh = useCallback(() => {
        const fee_id = searchParams.get('fee_id');
        if(fee_id){
            iuran_api(fee_id);
            filter_iuran_api(parseInt(fee_id), "");
        }
    }, [iuran_api, filter_iuran_api, searchParams]);

    useEffect(() => {
        const fee_id = searchParams.get('fee_id');
        if(fee_id){
            iuran_api(fee_id);
            filter_iuran_api(parseInt(fee_id), "");
        }
    }, [iuran_api, filter_iuran_api, searchParams]);

    return isLoading ? <LoadingAnimation/> : <>
        <Navbar/>
        <div className="my-24 px-6">
            <Summary date={iuran[0] ? iuran[0].fees?.fee_date! : ""} amount={iuran[0] ? iuran[0].fees?.fee_amount! : 0} total={iuran[0] ? iuran.reduce((total: number, item: {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}) => total + (item.fees.fee_amount || 0 * (Array.isArray(item.users) ? item.users.length : 0)), 0)! : 0} unpaid={iuran[0] ? iuran.reduce((total: number, item) => {if (item.payments.payment_description !== "done") return total + ((item.fees.fee_amount || 0) * ((Array.isArray(item.users) ? item.users.length : 1))); return total}, 0)! : 0}/>
            <Form action={""} onSubmit={searchUserOrAddress}>
                <SearchField placeholder="Cari Warga atau Alamat" className="mt-8 mb-4" value={search} setValue={setSearch}/>
            </Form>
            <div className="flex gap-2">
                <Chip label="Semua" active={chipIndex === 0 ? true : false} onClick={() => {setChipIndex(0); filter(parseInt(searchParams.get('fee_id')!), "")}}/>
                <Chip label="Lunas" active={chipIndex === 1 ? true : false} onClick={() => {setChipIndex(1); filter(parseInt(searchParams.get('fee_id')!), "done")}}/>
                <Chip label="Belum Lunas" active={chipIndex === 2 ? true : false} onClick={() => {setChipIndex(2); filter(parseInt(searchParams.get('fee_id')!), "undone")}}/>
            </div>
            <div className="flex flex-col my-4 gap-4">
                {!filteredData.length ? <span className="w-full my-16 text-center text-gray-500 italic flex justify-center">Data Tidak Ditemukan.</span> : filteredData.map((data: {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}) => {
                    return <UserListItem key={data.payments.payment_id} address={data.users.address!} name={data.users.name!} phone={data.users.phone!} state={data.payments.payment_description!} onClick={() => {setUserPaymentID(data.payments.payment_id); setShowPopup(true)}}/>
                })}
            </div>
        </div>
        {showPopup ? <Popups payment_id={userPaymentID} showPopup={showPopup} setShowPopup={setShowPopup} onRefresh={refresh}/> : null}
    </>
}