"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SearchField(props: {className?: string; value: string; setValue: (value: string) => void}){
    return <div className={`w-full h-full relative ${props.className}`}>
        <input type="search" placeholder="Cari Warga atau Alamat" className="w-full pl-12 py-4 bg-gray-100 outline-none rounded-xl" value={props.value} onChange={(event) => props.setValue(event.currentTarget.value)}/>
        <MagnifyingGlass className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500"/>
    </div>
}