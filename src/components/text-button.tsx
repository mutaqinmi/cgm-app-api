import Image from "next/image"

export default function TextButton(){
    return <button className="text-[15px] text-[#3D8FED]">
        Lainnya
        <Image src="image/arrow-right.svg" alt="arrow" width={10} height={10}></Image>
    </button>
}