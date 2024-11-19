export default function StatusChip(props: {status: string}) {
    if(props.status === "Lunas"){
        return <span className="rounded-full bg-green-200 px-2 py-1 text-green-500 text-xs">{props.status}</span>
    } else if (props.status === "Menunggu Konfirmasi"){
        return <span className="rounded-full bg-yellow-200 px-2 py-1 text-yellow-500 text-xs">{props.status}</span>
    }
    
    return <span className="rounded-full bg-red-200 px-2 py-1 text-red-500 text-xs">{props.status}</span>
}