
export default function Logo(props: {className?: string; title: string; total: number; nominal: number; icon: React.ReactNode;}) {
    return <div className="w-full col-span-1 bg-white p-4 flex gap-4 items-center rounded-lg shadow-md shadow-gray-300">
        <div className="p-2 md:p-3 bg-blue-200 rounded-lg">
            {/* <Users className="text-blue-500 text-lg md:text-4xl"/> */}
        </div>
        <div className="flex flex-col">
            <span className="text-xs text-gray-500">{props.title}</span>
            <span className="text-2xl font-semibold">{props.total}</span>
            <span className="text-xs md:text-sm text-blue-500 mt-1">( Rp. 1.568.000 )</span>
        </div>
    </div>
}