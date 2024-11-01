"use client";
import { X } from "@phosphor-icons/react";

export default function ModalBottomSheet(props: {className?: string; setShowModal: (showModal: boolean) => void; title: string; children: React.ReactNode}) {
    return <div className={`w-screen h-screen fixed top-0 left-0 z-40`}>
        <div className="bg-black bg-opacity-50 h-full w-full" onClick={() => props.setShowModal(false)}></div>
        <div className="w-screen p-8 rounded-tr-3xl rounded-tl-3xl font-semibold flex flex-col gap-2 bg-white absolute bottom-0 left-0">
            <div className="flex justify-between items-center">
                <span className="text-lg">{props.title}</span>
                <X size={24} onClick={() => props.setShowModal(false)}/>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    </div>
}

