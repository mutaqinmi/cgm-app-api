export default function TopNavbar() {
  return <div className="flex items-center w-full mb-12 ml-[-6px]">
      <label>
        <div className="w-9 h-9 cursor-pointer flex flex-col items-center justify-center">
          <input className="hidden peer" type="checkbox" />
          <div className="mt-[-3] w-[60%] h-[2px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"></div>
          <div className="mt-[-3] w-[60%] h-[2px] bg-black rounded-md transition-all duration-300 origin-center peer-checked:hidden"></div>
          <div className="mt-[-3] w-[60%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"></div>
        </div>
      </label>
      <div className="ml-6">
        <span className="text-xs">Selamat Siang,</span><br />
        <span className="font-semibold">Muhammad Ilham</span><span className="font-semibold">!</span>
      </div>
    </div>
}
