"use client";

export default function OutlinedIconButton(props: {onClick?: () => void; icon: React.ReactNode}){
    return <button className="w-8 h-8 flex items-center justify-center" onClick={props.onClick}>{props.icon}</button>
}