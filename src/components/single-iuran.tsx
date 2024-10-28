"use client";
import { CaretRight } from "@phosphor-icons/react";

export default function SingleIuran() {
  return <div className="flex w-full cursor-pointer">
      <div className="w-1/2 flex flex-col gap-2">
        <span className="text-xs font-medium">Total Iuran Tersisa</span>
        <div className="gap-1 font-bold text-xl">
            <span>Rp.</span>
            <span>55.000</span>
        </div>
      </div>
      <div className="flex justify-end items-center w-1/2">
            <CaretRight size={10} />
      </div>
    </div>
}
