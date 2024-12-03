import { WhatsappLogo } from "@phosphor-icons/react";

export default function WhatsAppShortcut(){
    return <div className="py-4 md:py-3 px-4 bg-green-500 text-white rounded-full absolute bottom-8 right-8 flex items-center gap-2 cursor-pointer">
        <span className="hidden md:flex">Butuh Bantuan?</span>
        <WhatsappLogo size={32}/>
    </div>
}
    