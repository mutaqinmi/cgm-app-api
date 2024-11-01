'use client'
import { X } from "@phosphor-icons/react";

/**
 * This component is used for creating a drawer component.
 * 
 * Usage:
 * @param className string (optional)
 * @param children React.ReactNode
 * @param setShowDrawer (showDrawer: boolean) => void
 */

export default function Drawer(props: {className?: string; children: React.ReactNode; setShowDrawer: (showDrawer: boolean) => void}) {
  return <div>
    <div className="w-screen h-screen bg-black z-40 fixed top-0 bg-opacity-50" onClick={() => props.setShowDrawer(false)}></div>
    <div className={`w-80 h-screen shadow-md p-7 bg-white fixed top-0 ${props.className}`}>
      <div className="flex items-center w-full mb-12 ml-[-6px]">
        <X size={30} onClick={() => props.setShowDrawer(false)}/>
        <div className="ml-6 text-xl font-semibold"><span>Menu</span></div>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  </div>
}