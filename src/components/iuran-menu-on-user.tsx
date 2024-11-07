import { CaretRight, CheckCircle, XCircle } from "@phosphor-icons/react";
import Icon from "./icon";
import Sign from "./sign";

export default function IuranMenuOnUser(props: {onClick?: () => void; month: string, title: string, state: boolean; state_desc: string}){
    return <div className="flex justify-between items-center" onClick={props.onClick}>
        <div className="flex gap-4 justify-center items-center">
            {props.state ? <Icon icon={<CheckCircle size={24} className="text-blue-500"/>} color="bg-blue-300"/> : <Icon icon={<XCircle size={24} className="text-red-500"/>} color="bg-red-300"/>}
            <div className="flex flex-col">
                <span className="text-sm text-gray-500 flex justify-start items-center gap-1">{props.month} &#8226; <Sign state={props.state_desc}/></span>
                <span className="text-lg font-semibold">{props.title}</span>
            </div>
        </div>
        <CaretRight size={14}/>
    </div>
}