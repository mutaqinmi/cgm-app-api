'use client'
import ErrorSigninPopup from "@/components/error-signin-popup";
import FilledButton from "@/components/filled-button";
import Logo from "@/components/logo";
import PasswordInputField from "@/components/password-Input-field";
import PhoneNumberInput from "@/components/phone-number-input";
import axios, { AxiosError } from "axios";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
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
    const route = useRouter();
    const {phone, password} = useInput.getState();
    const {setPhone, setPassword} = useInput();
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            route.push("/cgm-admin/dashboard");
        }
    }, [])

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
            setError("");
            const {token} = response.data.data as {token: string};
            localStorage.setItem("token", token);
            route.push("/cgm-admin/dashboard");
        }).catch((error: AxiosError) => {
            const error_message = error.response?.data as {message: string};
            setError(error_message.message);
        })
    }

    return <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="md:p-4 w-4/5 md:w-80 md:shadow-md md:rounded-md">
            <div>
                <h1 className="text-3xl font-semibold">Masuk</h1>
                <span className="text-sm">Masuk untuk melanjutkan.</span>
            </div>
            {error === "" ? null : <ErrorSigninPopup message={error}/>}
            <Form action={""} formMethod="POST" onSubmit={signin}>
                <PhoneNumberInput phone={phone} setPhone={setPhone} className="mt-12"/>
                <PasswordInputField password={password} setPassword={setPassword}/>
                <FilledButton type="submit" className="mt-12"/>
            </Form>
        </div>
        <Logo className="mt-24"/>
    </div>
}