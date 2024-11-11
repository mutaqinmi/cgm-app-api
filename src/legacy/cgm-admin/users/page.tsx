'use client'
import Navbar from "@/components/navbar";
import SearchField from "@/components/search-field";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect } from "react";
import { create } from "zustand";
import * as schema from "@/database/schema";
import UserListItem from "@/components/user-list-item";
import Form from "next/form";
import { useRouter } from "next/navigation";
import LoadingAnimation from "@/components/loading-animation";

interface UserData {
    users: [],
    setUsers: (users: []) => void;
}

interface Component {
    searchField: string,
    isLoading: boolean,
    setSearchField: (searchField: string) => void,
    setIsLoading: (isLoading: boolean) => void,
}

const useComponent = create<Component>((set) => {
    return {
        searchField: "",
        isLoading: false,
        setSearchField: (searchField) => set({searchField}),
        setIsLoading: (isLoading) => set({isLoading})
    }
})

const useUserData = create<UserData>((set) => {
    return {
        users: [],
        setUsers: (users) => set({users})
    }
})

export default function Page(){
    const route = useRouter();
    const {searchField, isLoading, setSearchField, setIsLoading} = useComponent();
    const {users, setUsers} = useUserData();

    const all_iuran_api = useCallback(async () => {
        setIsLoading(true);

        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/users`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response: AxiosResponse) => {
            const { data } = response.data as {data: []};
            setUsers(data);
        }).catch((error: AxiosError) => {
            const {message} = error.response?.data as {message: string};
            console.log(message);
        }).finally(() => setIsLoading(false));
    }, [])

    const search_api = useCallback(async (query: string) => {
        setIsLoading(true);

        const host = window.location.protocol + "//" + window.location.host + "/api/v1";
        return await axios.get(`${host}/admin/users?search=${query}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res: AxiosResponse) => {
            const { data } = res.data as {data: []};
            setUsers(data);
        }).catch((error: AxiosError) => {
            const { message } = error.response?.data as {message: string};
            console.log(message);
        }).finally(() => setIsLoading(false));
    }, [])

    const searchUserOrAddress = (event: React.FormEvent<HTMLFormElement>) : void => {
        event.preventDefault();
        search_api(searchField);
    }

    useEffect(() => {
        all_iuran_api();
    }, [all_iuran_api])

    return isLoading ? <LoadingAnimation/> : <>
        <Navbar/>
        <div className="my-24 px-6">
            <Form action={""} onSubmit={searchUserOrAddress}>
                <SearchField placeholder="Cari Warga atau Alamat" value={searchField} setValue={setSearchField}/>
            </Form>
            <div className="flex flex-col gap-4 my-4">
                {users.map((user: schema.usersType) => {
                    return <UserListItem key={user.user_id} address={user.address!} name={user.name!} phone={user.phone!} onClick={() => route.push(`/cgm-admin/users/detail?user_id=${user.user_id!}`)}/>
                })}
            </div>
        </div>
    </>
}