import { ChartBar, HandCoins, SignOut, User, Users, X } from "@phosphor-icons/react";
import Logo from "./logo";
import SideBarMenu from "./sidebar-menu";
import HorizontalDivider from "./horizontal-divider";
import { useCallback } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function SideBar(props: {className?: string; sidebarState: boolean; sidebarController: (show: boolean) => void; navbarState: number; navbarController: (index: number) => void; loadingController: (show: boolean) => void}) {
    const route = useRouter();

    const signoutAPI = useCallback(async () => {
        props.loadingController(true);

        const confirmDialog = confirm("Apakah anda yakin ingin keluar?");
        if(!confirmDialog){
            props.loadingController(false);
            return;
        }

        return await axios.get(`${process.env.API_URL}/admin/auth/signout`)
            .then(res => {
                if(res.status === 200){
                    route.refresh();
                }
            })
            .catch((error: AxiosError) => {
                const { message } = error.response?.data as { message: string };
                console.log(message);
            })
            .finally(() => props.loadingController(false));
    }, [props.loadingController, route]);

    const signoutController = useCallback(async () => await signoutAPI(), [signoutAPI]);

    return <div className={`h-screen w-60 bg-white md:flex flex-col justify-between fixed top-0 left-0 shadow-md shadow-gray-300 z-50 ${props.sidebarState ? 'flex' : 'hidden'}`}>
        <X size={24} className="absolute right-4 top-8 md:hidden" onClick={() => props.sidebarController(false)}/>
        <div>
            <div className="w-full flex justify-center items-center p-8">
                <Logo/>
            </div>
            <div className="mt-4 p-4">
                <ul>
                    <SideBarMenu icon={<ChartBar size={24}/>} label="Dashboard" active={props.navbarState === 0 ? true : false} onClick={() => {props.navbarController(0); props.sidebarController(false)}}/>
                    <SideBarMenu icon={<HandCoins size={24}/>} label="Iuran" active={props.navbarState === 1 ? true : false} onClick={() => {props.navbarController(1); props.sidebarController(false)}}/>
                    <SideBarMenu icon={<Users size={24}/>} label="Warga" active={props.navbarState === 2 ? true : false} onClick={() => {props.navbarController(2); props.sidebarController(false)}}/>
                </ul>
            </div>
        </div>
        <div className="p-4">
            <ul>
                <SideBarMenu icon={<User size={24}/>} label="Tentang Saya" active={props.navbarState === 3 ? true : false} onClick={() => {props.navbarController(3); props.sidebarController(false)}}/>
                <li>
                    <HorizontalDivider/>
                </li>
                <SideBarMenu icon={<SignOut size={24}/>} label="Keluar" active={false} onClick={signoutController}/>
            </ul>
        </div>
    </div>
}