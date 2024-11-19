import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SearchField() {
    return <div className="relative">
        <input type="search" name="search" id="search" placeholder="Cari Warga atau Alamat" className="w-full md:w-72 bg-zinc-100 rounded-lg py-3 pl-4 pr-8 border-none outline-none"/>
        <MagnifyingGlass size={16} className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-4"/>
    </div>
}