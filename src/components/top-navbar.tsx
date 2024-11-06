'use client'
import { useEffect, useState } from "react"
import SearchField from "./search-field";

export default function TopNavbar(props: {className?: string; showDrawer: boolean; setShowDrawer: (showDrawer: boolean) => void}) {
  const [user, setUser] = useState<string | null>("");
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);

    const hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
      setGreeting("Selamat Pagi");
    } else if (hours >= 12 && hours < 18) {
      setGreeting("Selamat Siang");
    } else {
      setGreeting("Selamat Malam");
    }
  }, []);

  return <div className={`flex items-center w-full p-4 fixed top-0 bg-white ${props.className}`}>
    <label className="md:hidden">
      <div className="w-9 h-9 cursor-pointer flex flex-col items-center justify-center">
        <input className="hidden peer" type="checkbox" checked={props.showDrawer} onChange={(event) => event.currentTarget.checked ? props.setShowDrawer(true) : props.setShowDrawer(false)}/>
        <div className="mt-[-3] w-[60%] h-[2px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"></div>
        <div className="mt-[-3] w-[60%] h-[2px] bg-black rounded-md transition-all duration-300 origin-center peer-checked:hidden"></div>
        <div className="mt-[-3] w-[60%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"></div>
      </div>
    </label>
    <div className="w-full flex justify-between items-center">
      <div className="ml-6 md:ml-0">
        <span className="text-xs">{greeting},</span><br />
        <span className="font-semibold">{user}!</span>
      </div>
          <SearchField className="w-96 bg-red-400"/>
      <div>
        <span>hai</span>
      </div>
    </div>
  </div>
}