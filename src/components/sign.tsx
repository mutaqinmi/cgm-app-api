export default function Sign() {
    return <div className="flex gap-2">
        <button className=" rounded-2xl bg-green-200 px-2 py-1 flex justify-center items-center">
            <span className="text-green-500 text-xs font-medium">Lunas</span>
        </button>
        <button className=" rounded-2xl px-2 py-1 bg-red-200 flex justify-center items-center">
            <span className="text-red-600 text-xs font-medium">Belum Lunas</span>
        </button>
        <button className=" rounded-2xl px-2 py-1 bg-red-200 flex justify-center items-center">
            <span className="text-red-600 text-xs font-medium">Menunggu konfirmasi</span>
        </button>
    </div>
}
