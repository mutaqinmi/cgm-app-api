"use client";
import { HandCoins, CaretRight } from "@phosphor-icons/react";

export default function ProfileMenuItem() {
  return (
    <div className="flex items-center h-8 cursor-pointer">
      <div className="flex items-center w-1/2">
        <HandCoins className="w-6 h-6 mr-4" />
        <div>
          <span className="text-base">Tentang Saya</span>
        </div>
      </div>
      <div className="flex items-center justify-end w-1/2">
        <div>
            <span>Rp. </span>
            <span>55.000.000</span>
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
            <CaretRight size={10} />
        </div>
      </div>
    </div>
  );
}
