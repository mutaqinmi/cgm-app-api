export default function RegularInputField(props: {className?: string; title: string; value: string; setValue: (value: string) => void}) {
    return <div className={`w-full relative flex rounded-lg ${props.className}`}>
        <input required className="peer w-full outline-none px-4 py-3 text-base rounded-md bg-white border-2" id="text" type="text"  onChange={(event) => props.setValue(event.currentTarget.value)} value={props.value}/>
        <label htmlFor="text" className="text-gray-500 text-sm cursor-text absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 peer-focus:text-sm peer-focus:text-black peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-black duration-300">
            {props.title}
        </label>
    </div>
}