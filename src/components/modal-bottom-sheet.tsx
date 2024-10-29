"use client";
import { X } from "@phosphor-icons/react";

export default function ModalBottomSheet() {
    return <div className="w-screen h-80 p-8 rounded-tr-3xl rounded-tl-3xl">
            <div className="text-lg font-semibold flex justify-between items-center">
                <span>Menu</span>
                <button className="w-8 h-8 flex items-center justify-center"><X size={24} /></button>
            </div>
          </div>
      }

