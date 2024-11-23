'use client';
import Container from "@/components/container";
import IconButton from "@/components/icon-button";
import NavigationBar from "@/components/navigation-bar";
import PaginationWidget from "@/components/pagination";
import SearchField from "@/components/search-field";
import TableHead from "@/components/table-head";
import UserListItem from "@/components/user-list-item";
import VerticalDivider from "@/components/vertical-divider";
import { Funnel, Plus } from "@phosphor-icons/react";
import { create } from "zustand";

interface ComponentState {
    searchKeyword: string;
    setSearchKeyword: (value: string) => void;
}

const useComponent = create<ComponentState>((set) => {
    return {
        searchKeyword: '',
        setSearchKeyword: (value) => set({ searchKeyword: value }),
    }
});

export default function Page() {
    const component = useComponent();

    return <NavigationBar sidebarIndex={2}>
        <div className="mt-4 w-full">
            <Container>
                <div className="flex-col gap-4 md:gap-0 md:flex-row flex justify-between items-start md:items-center">
                    <h1 className="text-lg font-semibold">Daftar Warga</h1>
                    <div className="flex gap-4 justify-center items-center">
                        <SearchField value={component.searchKeyword} setValue={component.setSearchKeyword} onChange={() => {}}/>
                        <VerticalDivider/>
                        <IconButton icon={<Funnel size={14}/>}/>
                        <IconButton icon={<Plus size={14}/>}/>
                    </div>
                </div>
                <div className="mt-8">
                    <table className="w-full">
                        <TableHead title={['Nama', 'No. Telepon', 'Alamat', 'RT']}/>
                        <tbody>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                        </tbody>
                    </table>
                </div>
                <PaginationWidget currentPage={1} totalPage={256}/>
            </Container>
        </div>
    </NavigationBar>
}