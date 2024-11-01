export default function OutlinedButton(props: {className?: string; onClick?: () => void; type: "submit" | "button"; title: string}) {
  return <button type={props.type} className={`w-full h-12 rounded-md border border-blue-500 text-blue-500 ${props.className}`} onClick={props.onClick}>
    <span className="font-semibold text-sm">{props.title}</span>
  </button>;
}