// TODO: Applying LocalStorage for saving token

'use client'
import FilledButton from "@/components/filled-button";
import Logo from "@/components/logo";
import PasswordInputField from "@/components/password-Input-field";
import PhoneNumberInput from "@/components/phone-number-input";
import axios, { AxiosError } from "axios";
import Form from "next/form";
import { FormEvent, useCallback } from "react";
import { create } from "zustand";

interface InputState {
    phone: string;
    password: string;
    setPhone: (phone: string) => void;
    setPassword: (password: string) => void;
}

const useInput = create<InputState>((set) => {
    return {
        phone: "",
        password: "",
        setPhone: (phone: string) => set({phone}),
        setPassword: (password: string) => set({password})
    }
})

export default function Page(){
    const {phone, password} = useInput.getState();
    const {setPhone, setPassword} = useInput();

    const signin_api = useCallback(async (phone: string, password: string) => {
        return await axios.post(`${process.env.API_URL}/admin/auth/signin`, {
            phone,
            password
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
    }, [])

    const signin = (event: FormEvent<HTMLFormElement>) : void => {
        event.preventDefault();
        signin_api(phone, password).then((response) => {
            console.log(response.data);
        }).catch((error: AxiosError) => {
            const error_message = error.response?.data as {message: string};
            alert(error_message.message);
        })
    }

    return <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="md:p-4 w-4/5 md:w-80 md:shadow-md md:rounded-md">
            <div>
                <h1 className="text-3xl font-semibold">Masuk</h1>
                <span className="text-sm">Masuk untuk melanjutkan.</span>
            </div>
            <Form action={""} formMethod="POST" onSubmit={signin}>
                <PhoneNumberInput phone={phone} setPhone={setPhone} className="mt-12"/>
                <PasswordInputField password={password} setPassword={setPassword}/>
                <FilledButton type="submit" className="mt-12"/>
            </Form>
        </div>
        <Logo className="mt-24"/>
    </div>
}