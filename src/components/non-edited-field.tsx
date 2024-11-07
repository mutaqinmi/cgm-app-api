export default function NonEditedField(props: {title: string, description: string}) {
    return <div className="flex flex-col gap-1">
        <span className="text-black">{props.title}</span>
        <span className="text-gray-400">{props.description}</span>
    </div>
}