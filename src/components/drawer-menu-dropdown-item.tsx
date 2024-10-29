"use client";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { useState } from "react";

export default function DrawerMenuDropdownItem(props: {className?: string; icon: React.ReactNode; title: string; children: React.ReactNode;}) {
    const [showChildren, setShowChildren] = useState<boolean>(false);

    return <div className={`flex flex-col cursor-pointer py-3 ${props.className}`}>
        <div className="flex justify-between items-center">
            <div className="flex justify-center items-center">
                {props.icon}
                <span className="ml-8 text-base">{props.title}</span>
            </div>
            <div>
                {showChildren ? <CaretUp size={16} onClick={() => setShowChildren(false)}/> : <CaretDown size={16} onClick={() => setShowChildren(true)}/>}
            </div>
        </div>
        {showChildren ? <div className="ml-14 mt-4">
            {props.children}
        </div> : null}
    </div>
}
