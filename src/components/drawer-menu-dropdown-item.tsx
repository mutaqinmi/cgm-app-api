"use client";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { useState } from "react";

export default function DrawerMenuDropdownItem(props: {className?: string; icon: React.ReactNode; title: string; children: React.ReactNode;}) {
    const [showChildren, setShowChildren] = useState<boolean>(false);

    return <div className={`flex flex-col cursor-pointer py-3 md:py-0 ${props.className}`}>
        <div className="flex justify-between items-center" onClick={() => setShowChildren(!showChildren)}>
            <div className="flex justify-center items-center">
                <div className="md:hidden">{props.icon}</div>
                <span className="ml-8 text-base md:ml-0 md:mr-3">{props.title}</span>
            </div>
            <div>
                {showChildren ? <CaretUp size={16}/> : <CaretDown size={16}/>}
            </div>
        </div>
        {showChildren ? <div className="ml-10 mt-4">
            {props.children}
        </div> : null}
    </div>
}
