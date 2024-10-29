export default function Sign() {
    return <div className="flex gap-2">
        <button className=" rounded-2xl bg-[#DBFFBF] px-2 ">
            <span className="text-[#57CA00] text-xs font-medium">Lunas</span>
        </button>
        <button className=" rounded-2xl px-2 bg-[#FFCBCB]">
            <span className="text-[#D60303] text-xs font-medium">Belum Lunas</span>
        </button>
        <button className=" rounded-2xl px-2 bg-[#FFCBCB]">
            <span className="text-[#D60303] text-xs font-medium">Menunggu konfirmasi</span>
        </button>
    </div>
}
