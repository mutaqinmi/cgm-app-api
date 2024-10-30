export default function Summary(){
    return <div className="w-64 h-32">
        <div className="flex flex-col justify-between w-full h-1/2">
        <div className="flex items-center justify-center text-sm">
            <span>Iuran Bulan</span>
            <span className="ml-1">Oktober 2024</span>
        </div>
        <div className="flex items-center justify-center text-2xl font-semibold mb-1">
            <span>Rp. </span>
            <span>55.000</span>
        </div>
        </div>
        <div className="flex w-full h-1/2">
            <div className="w-1/2 h-full content-center justify-center text-center text-blue-500">
                    <span className="text-[10px] w-full">Jumlah Seluruh Iuran</span>
                <div className="text-sm w-full">
                    <span>Rp. </span>
                    <span>555.000</span>
                </div>
            </div>
            <div className="w-1/2 h-full content-center justify-center text-center text-red-600">
                    <span className="text-[10px] w-full">Jumlah Seluruh Iuran</span>
                <div className="text-sm w-full">
                    <span>Rp. </span>
                    <span>555.000</span>
                </div>
            </div>
        </div>
    </div>
}