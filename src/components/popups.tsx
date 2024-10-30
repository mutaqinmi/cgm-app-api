'use client'
import { MoneyWavy } from "@phosphor-icons/react";

export default function Popups() {
    return <div className="w-64 h-96 shadow-md text-center p-4 flex flex-col justify-between">
        <span className="text-lg font-semibold">Konfirmasi Iuran</span>
        <div className="flex justify-center my-2">
            <div className="w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center">
                <MoneyWavy size={32} className="text-blue-500"/>
            </div>
        </div>
        <div>
            <div className="text-xs text-gray-400">
                <span>Iuran Bulan</span>
                <span>Oktober 2024</span>
            </div>
            <div className="font-medium">
                <span>Rp. </span>
                <span>55.000</span>
            </div>
        </div>
        <div>
            <div className="text-xs text-gray-400">
                <span>Warga</span>
            </div>
            <div className="font-medium">
                <span>Repat Dwi Gunanda</span>
            </div>
        </div>
        <div>
            <div className="text-xs text-gray-400">
                <span>Alamat</span>
            </div>
            <div className="font-medium">
                <span>Perum CGM, Blok A. 23</span>
            </div>
        </div>
        <button className="w-full h-12 rounded-xl bg-blue-500">
            <span className="font-bold text-sm text-white">Tandai Lunas</span>
        </button>
    </div>
}
