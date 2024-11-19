import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export default function PaginationWidget(props: {onClickNext? : () => void; onClickPrev? : () => void}){
    return <div className="flex justify-center items-center gap-2 mt-8">
        <div className="p-1 bg-blue-500 text-white rounded-md" onClick={props.onClickPrev}>
            <CaretLeft/>
        </div>
        <span className="text-xs text-gray-500">Halaman 1 dari 256</span>
        <div className="p-1 bg-blue-500 text-white rounded-md" onClick={props.onClickNext}>
            <CaretRight/>
        </div>
    </div>
}