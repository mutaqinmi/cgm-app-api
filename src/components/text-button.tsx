import { ArrowRight } from "@phosphor-icons/react"

export default function TextButton(props: {onClick?: () => void}){
    return <button className="text-sm text-blue-500 flex gap-2 w-fit justify-between items-center" onClick={props.onClick}>
        <span>Lainnya</span>
        <ArrowRight/>
    </button>
}