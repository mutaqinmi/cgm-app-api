import Image from "next/image"

export default function Logo() {
    return <Image
      src="/logo.png"
      width={500}
      height={500}
      alt="logo"
      className="w-24 h-9"
    />
      }