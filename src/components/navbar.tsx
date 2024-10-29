import { HandCoins, SignOut, User, Users, Wrench } from "@phosphor-icons/react";
import { create } from "zustand";
import TopNavbar from "@/components/top-navbar";
import Drawer from "@/components/drawer";
import DrawerMenuDropdownItem from "@/components/drawer-menu-dropdown-item";
import DrawerMenuItem from "@/components/drawer-menu-item";
import HorzDivider from "@/components/horz-divider";

interface DrawerState {
    showDrawer: boolean;
    setShowDrawer: (showDrawer: boolean) => void;
}

const useDrawer = create<DrawerState>((set) => ({
    showDrawer: false,
    setShowDrawer: (showDrawer: boolean) => set({ showDrawer }),
}));

export default function Navbar(){
    const showDrawer = useDrawer.getState().showDrawer;
    const { setShowDrawer } = useDrawer();

    return <>
        <TopNavbar showDrawer={showDrawer} setShowDrawer={setShowDrawer} className="z-40"/>
        {showDrawer ? <Drawer setShowDrawer={setShowDrawer} className="z-50">
            <DrawerMenuItem icon={<User size={24}/>} title="Tentang Saya"/>
            <DrawerMenuDropdownItem icon={<Wrench size={24}/>} title="Layanan">
                <DrawerMenuItem icon={<HandCoins size={24}/>} title="Iuran"/>
                <DrawerMenuItem icon={<Users size={24}/>} title="Warga"/>
            </DrawerMenuDropdownItem>
            <HorzDivider/>
            <DrawerMenuItem icon={<SignOut size={24}/>} title="Keluar" className="text-red-500"/>
        </Drawer> : null}
    </>
}