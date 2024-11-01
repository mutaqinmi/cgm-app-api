"use client";
import { CaretRight, User } from "@phosphor-icons/react";
import Sign from "./sign";

export default function UserListItem(props: {onClick?: () => void; address: string; name: string; phone: string; state: string;}) {
  return <div className="relative flex w-full gap-4 items-center" onClick={props.onClick}>
    <div className="w-14 h-14 aspect-square bg-blue-200 rounded-full flex justify-center items-center"><User size={24} className="text-blue-500"/></div>
    <div className="w-full flex flex-col gap-1">
      <div className="text-xs flex gap-2 items-center text-gray-400">
        <span>{props.address}</span>
        <span>&#8226;</span>
        <Sign state={props.state}/>
      </div>
      <span className="font-semibold text-ellipsis line-clamp-1">
        {props.name}
      </span>
      <div className="text-xs text-gray-400">
        <span>{props.phone}</span>
      </div>
    </div>
    <div className="flex justify-end items-center">
      <CaretRight size={10}/>
    </div>
  </div>
}