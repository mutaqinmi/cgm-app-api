export default function Chip(props: {onClick?: (index: number) => void; index: number; setIndex: (index: number) => void}) {
    return <div className="flex gap-2">
        <button className={`rounded-full py-2 px-4 border border-blue-500 ${props.index === 0 ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'}`} onClick={() => {props.setIndex(0); props.onClick!(0)}}>
            <span>Semua</span>
        </button>
        <button className={`rounded-full py-2 px-4 border border-blue-500 ${props.index === 1 ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'}`} onClick={() => {props.setIndex(1); props.onClick!(1)}}>
            <span>Lunas</span>
        </button>
        <button className={`rounded-full py-2 px-4 border border-blue-500 ${props.index === 2 ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'}`} onClick={() => {props.setIndex(2); props.onClick!(2)}}>
            <span>Belum Lunas</span>
        </button>
    </div>
}