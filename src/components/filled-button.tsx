export default function FilledButton(props: {className?: string; type: "submit" | "button"; title: string}) {
  return (
      <button type={props.type} className={`w-full h-12 rounded-md bg-[#3D8FED] ${props.className}`}>
        <span className="text-white font-semibold text-sm">{props.title}</span>
      </button>
  );
}