"use client";
import { CaretRight } from "@phosphor-icons/react";

export default function UserListItem() {
  return (
    <div className="relative flex w-full border-2 border-blue-400 my-2 gap-4 items-center">
      <div className="w-14 h-14 shadow-sm bg-[#D9D9D9] rounded-full"></div>
      <div className="w-4/5 h-14 flex flex-col justify-between">
        <div className="text-xs text-[#B9B9B9]">
          <span>Perum CGM</span>,
          <span className="mx-1">Blok A. 23</span>
        </div>
        <span className="font-medium line-clamp-3">
          Repat Dwi Gunanda
        </span>
        <div className="flex w-full text-xs text-[#B9B9B9] gap-1 items-center">
          <span>+62 812 - 3456 - 7890</span>
        </div>
      </div>
      <div className="ml-auto flex items-center">
        <CaretRight size={10} />
      </div>
    </div>
  );
}