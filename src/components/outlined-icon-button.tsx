"use client";
import { PencilSimple, X } from "@phosphor-icons/react";

export default function OutlinedIconButton(){
    return <div className="flex w-full gap-3">
            <button className="w-8 h-8 flex items-center justify-center"><PencilSimple size={24} /></button>
            <button className="w-8 h-8 flex items-center justify-center"><X size={24} /></button>
    </div>
}