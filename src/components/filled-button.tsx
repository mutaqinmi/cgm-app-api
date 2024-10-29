export default function FilledButton(props: {className?: string; type: "submit" | "button"}) {
  return (
      <button type={props.type} className={`w-full h-12 rounded-md bg-[#3D8FED] ${props.className}`}>
        <span className="text-white font-semibold text-sm">Masuk</span>
      </button>
  );
}