import { useState } from "react";

export default function Sign(props: {state: string}) {
    const [state, setState] = useState(props.state);

    const iuran_state = (state: string) => {
        if(state === "done"){
            return <button className="rounded-full bg-[#DBFFBF] py-1 px-2">
                <span className="text-[#57CA00] text-xs">Lunas</span>
            </button>
        } else if (state === "waiting"){
            return <button className="rounded-full py-1 px-2 bg-[#FFCBCB]">
                <span className="text-[#D60303] text-xs text-ellipsis">Menunggu Konfirmasi</span>
            </button>
        } else {
            return <button className="rounded-full py-1 px-2 bg-[#FFCBCB]">
                <span className="text-[#D60303] text-xs">Belum Lunas</span>
            </button>
        }
    }

    return <div className="flex gap-2">
        {iuran_state(state)}
    </div>
}