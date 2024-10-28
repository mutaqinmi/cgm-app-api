"use client";
import { Plus } from "@phosphor-icons/react";

export default function ActionChip() {
    return <div className="flex gap-2">
            <button className=" rounded-2xl bg-[#3D8FED] py-2 px-4 flex items-center gap-1">
                <span className="text-white text-xs font-medium">November</span>
                <span className="text-white text-xs font-medium">2024</span>
            </button>
            <button className="flex items-center rounded-2xl py-1 bg-[#D4E8FF] px-4 border-[1px] border-[#3D8FED] text-xs gap-2">
                <Plus weight="bold" color="#3D8FED" />
                <span className="text-[#3D8FED] font-medium">Tambah Bulan</span>
            </button>
        </div>
    }
