"use client";
// import { HandCoins } from "@phosphor-icons/react";

export default function Icon(props: {icon: React.ReactNode}) {
  return <div className="flex p-3 bg-blue-200 text-blue-500 rounded-lg items-center justify-center">
    {props.icon}
  </div>
}
