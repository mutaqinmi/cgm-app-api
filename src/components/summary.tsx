import numberFormatter from "@/lib/formatter";
import VertDivider from "./vert-divider";
import * as date from "@/lib/date";

export default function Summary(props: {datetime: string; amount: number}){
    return <div className="w-full">
        <div className="flex flex-col justify-center items-center w-full">
            <span className="text-sm">Iuran Bulan {date.toString(props.datetime)}</span>
            <span className="text-3xl font-semibold mt-2">{numberFormatter(props.amount.toString())}</span>
        </div>
        <div className="flex justify-center items-center w-full h-full mt-8">
            <div className="w-full flex flex-col justify-center items-center text-center text-blue-500">
                <span className="text-xs w-full">Jumlah Seluruh Iuran</span>
                <span className="text-lg">Rp. 555.000</span>
            </div>
            <VertDivider/>
            <div className="w-full flex flex-col justify-center items-center text-center text-red-500">
                <span className="text-xs w-full">Jumlah Belum Bayar</span>
                <span className="text-lg">Rp. 555.000</span>
            </div>
        </div>
    </div>
}