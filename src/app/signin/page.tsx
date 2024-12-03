'use client'
import Logo from "@/components/logo";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";
import { create } from "zustand";
import axios, { AxiosError, AxiosResponse } from "axios";
import ErrorSigninPopup from "@/components/error-signin-popup";
import PhoneNumberInput from "@/components/phone-number-input";
import PasswordInputField from "@/components/password-input-field";
import FilledButton from "@/components/filled-button";
import LoadingAnimation from "@/components/loading-animation";
import WhatsAppShortcut from "@/components/whatsapp-shortcut";

interface InputState {
    phone: string,
    password: string,
    error: string | undefined,
    isLoading: boolean,
    setPhone: (phone: string) => void,
    setPassword: (password: string) => void,
    setError: (error: string | undefined) => void,
    setIsLoading: (isLoading: boolean) => void
}

const useInput = create<InputState>((set) => {
    return {
        phone: "",
        password: "",
        error: undefined,
        isLoading: false,
        setPhone: (phone: string) => set({phone}),
        setPassword: (password: string) => set({password}),
        setError: (error: string | undefined) => set({error}),
        setIsLoading: (isLoading: boolean) => set({isLoading})
    }
})

export default function Page(){
    const route = useRouter();
    const inputState = useInput();

    // const signin = useCallback(async (phone: string, password: string) => {
    //     inputState.setIsLoading(true);
    //     inputState.setError(undefined);

    //     return await axios.post(`${process.env.API_URL}/admin/auth/signin`, {
    //         phone,
    //         password
    //     }, {
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     }).then((response: AxiosResponse) => {
    //         if(response.status === 200){
    //             const { user, admin_id } = response.data?.data as { user: string; admin_id: number };
    //             localStorage.setItem("user", user);
    //             localStorage.setItem("admin_id", admin_id.toString());
    //             route.push("/cgm-admin/dashboard");
    //         }
    //     }).catch((error: AxiosError) => {
    //         console.log(error.response?.data);
    //         const {message} = error.response?.data as {message: string};
    //         inputState.setError(message);
    //     }).finally(() => inputState.setIsLoading(false));
    // }, [route])

    const signinHandler = (event: FormEvent<HTMLFormElement>) : void => {
        event.preventDefault();
        // signin(inputState.phone, inputState.password);
        console.log(event.currentTarget.phone.value);
        console.log(event.currentTarget.password.value);
    }

    return inputState.isLoading ? <LoadingAnimation/> : <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="p-4 w-4/5 md:w-80 rounded-md bg-white">
            <div>
                <h1 className="text-3xl font-semibold">Masuk</h1>
                <span className="text-sm">Masuk untuk melanjutkan.</span>
            </div>
            {!inputState.error ? null : <ErrorSigninPopup message={inputState.error}/>}
            <Form action={""} formMethod="POST" onSubmit={signinHandler}>
                <PhoneNumberInput phone={inputState.phone} setPhone={inputState.setPhone} className="mt-12"/>
                <PasswordInputField password={inputState.password} setPassword={inputState.setPassword}/>
                <FilledButton type="submit" className="mt-12" label="Masuk"/>
            </Form>
        </div>
        <Logo className="mt-24"/>
        <WhatsAppShortcut/>
    </div>
}