"use client";
import { User } from "@phosphor-icons/react";

export default function AnnouncementGrup(props: {time: string; date: string; title: string; user: string;}) {
  return <div className="flex flex-col gap-3">
    <span className="font-medium text-gray-500">{props.date}</span>
  <div className=" relative flex w-full">
      <div className="fixed w-28 h-28 shadow-sm bg-gray-500 rounded-md"></div>
      <div className="ml-32 h-28 flex flex-col justify-between">
        <div className="text-xs text-gray-400">
          <span className="mr-1">{props.date}</span>-
          <span className="mx-1">{props.time}</span>
          <span>WIB</span>
        </div>
        <span className="font-medium line-clamp-3">
          {props.title}
        </span>
        <div className="flex w-full text-xs text-gray-400 gap-1 items-center">
          <div>
            <User />
          </div>
          <span className="">{props.user}</span>
        </div>
      </div>
    </div>
    <div className=" relative flex w-full">
      <div className="fixed w-28 h-28 shadow-sm bg-gray-500 rounded-md"></div>
      <div className="ml-32 h-28 flex flex-col justify-between">
        <div className="text-xs text-gray-400">
          <span className="mr-1">{props.date}</span>-
          <span className="mx-1">{props.time}</span>
          <span>WIB</span>
        </div>
        <span className="font-medium line-clamp-3">
        {props.title}
        </span>
        <div className="flex w-full text-xs text-gray-400 gap-1 items-center">
          <div>
            <User />
          </div>
          <span className="">{props.user}</span>
        </div>
      </div>
    </div>
  </div>
}
