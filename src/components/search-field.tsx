"use client";
import { MagnifyingGlass, Microphone } from "@phosphor-icons/react";

export default function SearchField(props: {className?: string}){
    return <div className={`w-full h-full relative ${props.className}`}>
        <input type="text" placeholder="Cari Warga atau Alamat" className="w-full pl-12 py-4 bg-gray-100 outline-none rounded-xl" />
        <MagnifyingGlass className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500"/>
        <Microphone className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-500"/>
    </div>
}