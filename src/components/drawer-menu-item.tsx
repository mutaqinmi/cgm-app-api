"use client";

export default function DrawerMenuItem(props: {className?: string; onClick?: () => void; icon: React.ReactNode; title: string;}) {
  return <div className={`flex items-center cursor-pointer py-3 ${props.className}`} onClick={props.onClick}>
    {props.icon}
    <span className="ml-8 text-base">{props.title}</span>
  </div>
}
