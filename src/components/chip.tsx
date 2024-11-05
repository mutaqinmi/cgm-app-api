export default function Chip(props: {onClick?: () => void; label: string; active: boolean}) {
    return <button className={`rounded-full py-2 px-4 border border-blue-500 ${props.active ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'}`} onClick={props.onClick}>
        <span>{props.label}</span>
    </button>
}