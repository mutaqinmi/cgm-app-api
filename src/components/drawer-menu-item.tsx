"use client";

export default function DrawerMenuItem(props: {className?: string; onClick?: () => void; icon: React.ReactNode; title: string;}) {
  return <div className={`flex items-center cursor-pointer py-3 md:py-0 ${props.className}`} onClick={props.onClick}>
    <div className="md:hidden">{props.icon}</div>
    <span className="ml-8 text-base md:ml-0">{props.title}</span>
  </div>
}
