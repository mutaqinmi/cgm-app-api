import axios from "axios";
import { useCallback } from "react";

const host = window.location.protocol + "//" + window.location.host + "/api/v1";

export const signin = useCallback(async (phone: string, password: string) => {
    return await axios.post(`${host}/admin/auth/signin`, {
        phone,
        password
    }, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}, [])

export const iuran_this_month = useCallback(async () => {
    return await axios.get(`${host}/admin/iuran?month=10&year=2024`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
}, [])