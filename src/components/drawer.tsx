export default function Drawer() {
  return <div className="w-80 h-screen shadow-md px-8 py-8">
          <div className="w-full h-full">
            <div className="flex items-center w-full mb-12 ml-[-6px]">
              <label>
                <div className="w-9 h-9 cursor-pointer flex flex-col items-center justify-center">
                  <input className="hidden peer" type="checkbox" />
                    <div className="mt-[-3] w-[60%] h-[2px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"></div>
                    <div className="mt-[-3] w-[60%] h-[2px] bg-black rounded-md transition-all duration-300 origin-center peer-checked:hidden"></div>
                    <div className="mt-[-3] w-[60%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"></div>
                </div>
              </label>
              <div className="ml-6 text-xl font-semibold"><span>Menu</span></div>
            </div>
          </div>
        </div>
      }

