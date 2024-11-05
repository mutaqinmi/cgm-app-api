import { HandCoins, SignOut, User, Users, Wrench } from "@phosphor-icons/react";
import { create } from "zustand";
import TopNavbar from "@/components/top-navbar";
import Drawer from "@/components/drawer";
import DrawerMenuDropdownItem from "@/components/drawer-menu-dropdown-item";
import DrawerMenuItem from "@/components/drawer-menu-item";
import HorzDivider from "@/components/horz-divider";
import { useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

interface DrawerState {
    showDrawer: boolean;
    setShowDrawer: (showDrawer: boolean) => void;
}

const useDrawer = create<DrawerState>((set) => ({
    showDrawer: false,
    setShowDrawer: (showDrawer: boolean) => set({ showDrawer }),
}));

export default function Navbar(){
    const route = useRouter();
    const showDrawer = useDrawer.getState().showDrawer;
    const { setShowDrawer } = useDrawer();

    const signout_api = useCallback(async () => {
        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/auth/signout`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        }).then((res: AxiosResponse) => {
            if(res.status !== 200) return;
            localStorage.clear();
            route.push("/cgm-admin/signin");
        }).catch((err: AxiosError) => {
            const { message } = err.response?.data as { message: string };
            console.log(message);
        })
    }, []);

    const signout = () => {
        const confirm_signout: boolean = confirm("Apakah Anda yakin akan keluar? Anda harus masuk kembali untuk melanjutkan.");
        if(!confirm_signout) return;
        signout_api();
    }

    return <>
        <TopNavbar showDrawer={showDrawer} setShowDrawer={setShowDrawer} className="z-30"/>
        {showDrawer ? <Drawer setShowDrawer={setShowDrawer} className="z-40">
            <DrawerMenuItem icon={<User size={24}/>} title="Tentang Saya"/>
            <DrawerMenuDropdownItem icon={<Wrench size={24}/>} title="Layanan">
                <DrawerMenuItem icon={<HandCoins size={24}/>} title="Iuran"/>
                <DrawerMenuItem icon={<Users size={24}/>} title="Warga"/>
            </DrawerMenuDropdownItem>
            <HorzDivider/>
            <DrawerMenuItem icon={<SignOut size={24}/>} title="Keluar" className="text-red-500" onClick={() => signout()}/>
        </Drawer> : null}
    </>
}