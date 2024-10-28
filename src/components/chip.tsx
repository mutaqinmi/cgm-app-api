export default function Chip() {
    return <div className="flex gap-2">
            <button className=" rounded-2xl bg-[#3D8FED] py-1 px-4">
                <span className="text-white text-xs font-medium">Masuk</span>
            </button>
            <button className=" rounded-2xl py-1 bg-[#D4E8FF] px-4 border-[1px] border-[#3D8FED]">
                <span className="text-[#3D8FED] text-xs font-medium">Lunas</span>
            </button>
            <button className=" rounded-2xl py-1 bg-[#D4E8FF] px-4 border-[1px] border-[#3D8FED]">
                <span className="text-[#3D8FED] text-xs font-medium">Belum Lunas</span>
            </button>
        </div>
    }
