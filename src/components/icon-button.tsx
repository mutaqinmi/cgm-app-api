"use client";
import { HandCoins } from "@phosphor-icons/react";

export default function IconButton() {
  return <div className="w-20 h-24 cursor-pointer">
    <div className="flex justify-center">
        <div className="flex items-center justify-center rounded-full w-16 h-16 bg-[#3D8FED]">
        <HandCoins color="white" weight="bold" className="w-7 h-7" />
        </div>
    </div>
    <div className="flex justify-center mt-2">
        <span>Iuran</span>
    </div>
  </div>
}