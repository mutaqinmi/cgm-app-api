import { CaretRight, HandCoins } from "@phosphor-icons/react";

export default function FeeListItem(props: {onClick?: () => void; month: string; title: string}) {
    return <div className="flex gap-4 justify-between items-center" onClick={props.onClick}>
        <div className="flex gap-4">
            <div className="p-3 bg-blue-200 rounded-lg">
                <HandCoins className="text-blue-500" size={18}/>
            </div>
            <div className="flex flex-col">
                <span className="text-xs">{props.month}</span>
                <span className="text-md font-semibold">{props.title}</span>
            </div>
        </div>
        <CaretRight size={14}/>
    </div>
}