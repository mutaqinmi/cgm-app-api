"use client";
import { UploadSimple } from "@phosphor-icons/react";

export default function InputFileField() {
  return <div className="w-80 h-28">
          <div className="relative h-28 rounded-lg bg-[#3D8FED] flex justify-center items-center shadow-lg hover:shadow-xl">
            <div className="absolute flex flex-col items-center">
            <UploadSimple size={40} weight="bold" color="white"/>
              <span className="block text-white text-sm font-medium mt-3">Unggah Gambar Sampul</span>
            </div>

            <input
              name=""
              className="h-full w-full opacity-0 cursor-pointer"
              type="file"
            />
          </div>
      </div>
}
