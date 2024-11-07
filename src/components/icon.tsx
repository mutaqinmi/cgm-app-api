"use client";
// import { HandCoins } from "@phosphor-icons/react";

export default function Icon(props: {icon: React.ReactNode; color: string}) {
  return <div className={`flex p-3 bg-blue-200 rounded-lg items-center justify-center ${props.color}`}>
    {props.icon}
  </div>
}
