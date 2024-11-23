'use client';
import NavigationBar from "@/components/navigation-bar";
import { CaretRight, Eye, EyeSlash, Pencil } from "@phosphor-icons/react";
import Link from "next/link";
import { create } from "zustand";

interface ComponentState {
    profileSelectedIndex: number;
    showOldPassword: boolean;
    showNewPassword: boolean;
    showConfirmPassword: boolean;
    setProfileSelectedIndex: (index: number) => void;
    setShowOldPassword: (show: boolean) => void;
    setShowNewPassword: (show: boolean) => void;
    setShowConfirmPassword: (show: boolean) => void;
}

const useComponent = create<ComponentState>((set) => {
    return {
        profileSelectedIndex: 0,
        showOldPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
        setProfileSelectedIndex: (index) => set({ profileSelectedIndex: index }),
        setShowOldPassword: (show) => set({ showOldPassword: show }),
        setShowNewPassword: (show) => set({ showNewPassword: show }),
        setShowConfirmPassword: (show) => set({ showConfirmPassword: show }),
    }
})

export default function Tentang(){
    const component = useComponent();

    return <NavigationBar sidebarIndex={3}>
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 flex flex-col gap-8 shadow-gray-300 shadow-md rounded-lg p-4 h-fit">
                <ul>
                    <li className={`flex justify-between items-center gap-4 p-3 cursor-pointer ${component.profileSelectedIndex === 0 ? 'font-semibold' : 'font-normal'}`} onClick={() => component.setProfileSelectedIndex(0)}>
                        <span>Profil</span>
                        {component.profileSelectedIndex === 0 ? <CaretRight/> : null}
                    </li>
                    <li className={`flex justify-between items-center gap-4 p-3 cursor-pointer ${component.profileSelectedIndex === 1 ? 'font-semibold' : 'font-normal'}`} onClick={() => component.setProfileSelectedIndex(1)}>
                        <span>Ubah Kata Sandi</span>
                        {component.profileSelectedIndex === 1 ? <CaretRight/> : null}
                    </li>
                </ul>
            </div>
            <div className="col-span-1 md:col-span-3 p-4 h-fit bg-white shadow-md shadow-gray-300 flex flex-col gap-4">
                {component.profileSelectedIndex === 0 ? <>
                    <h1 className="text-2xl font-semibold">Profil</h1>
                    <div>
                        <h2 className="font-semibold">Nama</h2>
                        <span>Muhammad Azka Fakhri Fairuz</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold">No. Telepon</h2>
                        <span className="text-xs text-gray-500">Nomor telepon anda diatur sebagai nomor <Link href={""} className="text-blue-500 underline">WhatsApp</Link> utama untuk pengaduan warga</span>
                        <div className="flex gap-2 items-center">
                            <span>+62 812 - 3456 - 7890</span>
                            <button className="p-2 bg-blue-500 text-white rounded-lg flex gap-2 items-center">
                                <span className="text-xs">Edit</span>
                                <Pencil/>
                            </button>
                        </div>
                    </div>
                </> : <>
                    <h1 className="text-2xl font-semibold">Ubah Kata Sandi</h1>
                    <div className="relative">
                        <input type={component.showOldPassword ? 'text' : 'password'} name="old_password" id="old_password" placeholder="Masukkan Kata Sandi Lama" className="w-full px-3 p-2 border border-slate-400 outline-none rounded-lg" />
                        {component.showOldPassword ? <Eye className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => component.setShowOldPassword(false)}/> : <EyeSlash className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => component.setShowOldPassword(true)}/>}
                    </div>
                    <div className="w-full h-[0.5px] bg-gray-500 bg-opacity-50 my-2"></div>
                    <div className="relative">
                        <input type={component.showNewPassword ? 'text' : 'password'} name="new_password" id="new_password" placeholder="Masukkan Kata Sandi Baru" className="w-full px-3 p-2 border border-slate-400 outline-none rounded-lg" />
                        {component.showNewPassword ? <Eye className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => component.setShowNewPassword(false)}/> : <EyeSlash className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => component.setShowNewPassword(true)}/>}
                    </div>
                    <div className="relative">
                        <input type={component.showConfirmPassword ? 'text' : 'password'} name="confirm_password" id="confirm_password" placeholder="Konfirmasi Kata Sandi" className="w-full px-3 p-2 border border-slate-400 outline-none rounded-lg" />
                        {component.showConfirmPassword ? <Eye className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => component.setShowConfirmPassword(false)}/> : <EyeSlash className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => component.setShowConfirmPassword(true)}/>}
                    </div>
                    <button className="p-3 bg-blue-500 text-white rounded-lg">Ubah Kata Sandi</button>
                </>}
            </div>
        </div>
    </NavigationBar>
}