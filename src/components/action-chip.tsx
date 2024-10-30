"use client";
import { Plus } from "@phosphor-icons/react";

export default function ActionChip() {
    return <div className="flex gap-2">
            <button className=" rounded-2xl bg-blue-500 py-2 px-4 flex items-center gap-1">
                <span className="text-white text-xs font-medium">November</span>
                <span className="text-white text-xs font-medium">2024</span>
            </button>
            <button className="flex items-center rounded-2xl text-blue-500 py-1 bg-blue-200 px-4 border-[1px] border-blue-500 text-xs gap-2">
                <Plus weight="bold" />
                <span className="font-medium">Tambah Bulan</span>
            </button>
        </div>
    }
