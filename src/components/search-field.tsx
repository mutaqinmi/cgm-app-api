"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SearchField(props: {className?: string; value: string; placeholder: string; setValue: (value: string) => void}){
    return <div className={`w-full h-full relative md:flex md:items-center md:w-72 lg:w-80 xl:w-[350px] 2xl:w-[400px] ${props.className}`}>
        <input type="search" placeholder={props.placeholder} className="w-full pl-12 py-4 bg-gray-100 outline-none rounded-xl md:py-0 md:h-10" value={props.value} onChange={(event) => props.setValue(event.currentTarget.value)}/>
        <MagnifyingGlass className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500"/>
    </div>
}