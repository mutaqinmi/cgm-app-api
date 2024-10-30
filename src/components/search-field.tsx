"use client";
import { MagnifyingGlass, Microphone } from "@phosphor-icons/react";

export default function SearchField(){
    return <div className="bg-gray-100 flex items-center rounded-xl h-12 p-1 w-96">
        <button className="h-8 w-8 ml-1 flex items-center justify-center">
            <MagnifyingGlass size={16} className="" />
        </button>
        <input type="text" placeholder="Cari Warga atau Alamat" className="px-2 bg-gray-100 text-xs flex-grow focus:outline-none" />
        <button className="h-8 w-8 mr-1 flex items-center justify-center">
            <Microphone size={16} className="" />
        </button>
    </div>
}