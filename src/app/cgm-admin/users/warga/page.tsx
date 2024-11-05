'use client'
// import Navbar from "@/components/navbar";
// import Summary from "@/components/summary";
// import axios, { AxiosError, AxiosResponse } from "axios";
// import { useSearchParams } from "next/navigation"
// import { useCallback, useEffect, useState } from "react";
// import { create } from "zustand";
// import * as schema from "@/database/schema";
// import LoadingAnimation from "@/components/loading-animation";
// import SearchField from "@/components/search-field";
// import Chip from "@/components/chip";
// import UserListItem from "@/components/user-list-item";
// import Popups from "@/components/popups";

export default function Page(){
    return <div className="w-full"></div>
    // return <div className="mt-24 px-6">
    //         <Summary datetime={iuran[0]?.fees?.fee_date || ""} amount={iuran[0]?.fees?.fee_amount || 0}/>
    //         <SearchField className="mt-8 mb-4"/>
    //         <Chip index={index} setIndex={setIndex} onClick={(index: number) => filter(parseInt(searchParams.get('fee_id')!), index)}/>
    //         <div className="my-4">
    //             {iuran.map((data: {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}) => {
    //                 return <UserListItem key={data.payments.payment_id} address={data.users.address!} name={data.users.name!} phone={data.users.phone!} state={data.payments.payment_description!} onClick={() => {setUserPaymentID(data.payments.payment_id); setShowPopup(true)}}/>
    //             })}
    //         </div>
    //     </div>
    //     {showPopup ? <Popups payment_id={userPaymentID} showPopup={showPopup} setShowPopup={setShowPopup} setData={setIuran} fee_id={iuran[0].fees.fee_id.toString()}/> : null}
}