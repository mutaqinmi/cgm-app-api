"use client";
import { CaretCircleRight } from "@phosphor-icons/react";

export default function Shortcuts() {
    return <div className="flex flex-col justify-between w-full h-24 border-2 bg-[#EBF4FF] border-[#3B7BC3] rounded-lg py-3 px-5 cursor-pointer">
       <span className="text-[#3B7BC3] font-medium">Total Iuran Tersisa</span>
       <div className="gap-1 text-[#3B7BC3] font-bold text-2xl">
        <span>Rp.</span>
        <span>55.000</span>
       </div>
       <div className="absolute right-5 translate-y-1/2">
        <CaretCircleRight size={32} color="#3B7BC3"/>
       </div>
      </div>
  }
  