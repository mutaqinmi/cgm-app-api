import Image from "next/image"

export default function PhoneNumberInput() {
  return <div className="flex w-full h-16 items-center mb-1 gap-4">
    <div className="flex items-center w-28 h-11 rounded-lg shadow-md px-2 gap-1 cursor-default">
      <Image src="/bendera.png" width={500} height={500} alt="Picture of the author" className="w-10 h-5"/>
      <div><span className="font-semibold">+62</span></div>
    </div>
    <div className="w-full h-11 relative flex rounded-lg">
      <input
        required
        className="peer w-full bg-transparent outline-none px-4 text-base rounded-lg bg-white shadow-md"
        id="address"
        type="number"
      />
      <label htmlFor="address" className="cursor-text absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 text-base peer-focus:text-sm peer-focus:text-black peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-black duration-300">
        <span className="text-gray-500">Nomor Telepon</span>
      </label>
    </div>
  </div>
}