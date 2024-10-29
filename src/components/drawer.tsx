'use client'
import { X } from "@phosphor-icons/react";

export default function Drawer(props: {className?: string; children: React.ReactNode; setShowDrawer: (showDrawer: boolean) => void}) {
  return <div className={`w-80 h-screen shadow-md p-7 bg-white fixed top-0 ${props.className}`}>
    <div className="flex items-center w-full mb-12 ml-[-6px]">
      <X size={30} onClick={() => props.setShowDrawer(false)}/>
      <div className="ml-6 text-xl font-semibold"><span>Menu</span></div>
    </div>
    <div>
      {props.children}
    </div>
  </div>
}