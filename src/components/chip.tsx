export default function Chip() {
    return <div className="flex gap-2">
            <button className=" rounded-2xl bg-blue-500 py-1 px-4">
                <span className="text-white text-xs font-medium">Masuk</span>
            </button>
            <button className=" rounded-2xl py-1 bg-blue-200 px-4 border-[1px] border-blue-500">
                <span className="text-blue-500 text-xs font-medium">Lunas</span>
            </button>
            <button className=" rounded-2xl py-1 bg-blue-200 px-4 border-[1px] border-blue-500">
                <span className="text-blue-500 text-xs font-medium">Belum Lunas</span>
            </button>
        </div>
    }
