import { CaretRight, HandCoins } from "@phosphor-icons/react";
import Icon from "./icon";

export default function IuranMenu(props: {onClick?: () => void; month: string, title: string}){
    return <div className="flex justify-between items-center cursor-pointer" onClick={props.onClick}>
        <div className="flex gap-4 justify-center items-center">
            <Icon icon={<HandCoins size={24}/>}/>
            <div className="flex flex-col">
                <span className="text-sm text-gray-500">{props.month}</span>
                <span className="text-lg font-semibold">{props.title}</span>
            </div>
        </div>
        <CaretRight size={14}/>
    </div>
}