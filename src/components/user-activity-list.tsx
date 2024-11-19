import {User, CaretRight} from "@phosphor-icons/react";
import StatusChip from "./status-chip";

export default function UserActivityList(props: {month: string; name: string; phone: string; status: string;}) {
    return <div className="flex gap-4 justify-between items-center cursor-pointer">
        <div className="flex gap-4 items-center">
            <div className="w-14 h-14 bg-blue-200 rounded-full flex justify-center items-center">
                <User size={24} className="text-blue-500" />
            </div>
            <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                    <span className="text-xs">{props.month}</span>
                    <span className="leading-none">&#8226;</span>
                    <StatusChip status={props.status}/>
                </div>
                <span className="text-md font-semibold">{props.name}</span>
                <span className="text-xs mt-1">{props.phone}</span>
            </div>
        </div>
        <CaretRight size={14}/>
    </div>
}