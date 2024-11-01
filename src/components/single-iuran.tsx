"use client";
import numberFormatter from "@/lib/formatter";
import { CaretRight } from "@phosphor-icons/react";

export default function SingleIuran(props: {onClick?: () => void; title: string; amount: number}) {
  return <div className="flex w-full cursor-pointer" onClick={props.onClick}>
    <div className="w-full flex flex-col gap-2">
      <span className="text-xs font-medium">{props.title}</span>
      <span className="font-semibold text-3xl">{numberFormatter(props.amount.toString())}</span>
    </div>
    <div className="flex justify-end items-center w-1/2">
      <CaretRight size={14} />
    </div>
  </div>
}
