export default function IconButton(props: {onClick?: () => void; icon: React.ReactNode; title: string}) {
  return <div className="w-32 cursor-pointer flex flex-col justify-center items-center text-center gap-2" onClick={props.onClick}>
    <div className="flex items-center justify-center rounded-full p-5 bg-blue-500 text-white text-3xl">
      {props.icon}
    </div>
    <span className="text-sm">{props.title}</span>
  </div>
}