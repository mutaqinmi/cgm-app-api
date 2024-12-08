import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';
import { generateToken } from "@/lib/token";

interface RequestBody {
    phone: string,
    password: string,
}

export async function POST(req: req){
    // get body from request
    const body: RequestBody = await req.json();

    // parse request body
    const phone_number: string = body.phone;
    const user_password: string = body.password;
    
    try {
        // get user data from database
        const user = await query.getUser(phone_number);

        // check if administrator exists
        if(user.length === 0){
            return res.json({
                message: "Warga tidak ditemukan",
            }, {
                status: 404
            })
        }

        // check if password is correct
        if(user[0].password !== user_password){
            return res.json({
                message: "Password salah",
            }, {
                status: 401
            })
        }

        // generate token
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password, ...payloads} = user[0];
        const token = generateToken(payloads);

        // set token in database
        await query.setUserToken(user[0].user_id, token);

        // set cookie expiration
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + 7);

        // return response
        return res.json({
            message: 'success',
            data: {
                user: payloads.name,
                user_id: payloads.user_id,
                token: token,
            }
        }, {
            status: 200,
            headers: {
                "Set-Cookie": `user_token=${token}; path=/; HttpOnly; SameSite=None; Secure; expires=${expiration.toUTCString()};`
            }
        })
    } catch (error) {
        // log error
        console.log(error);

        // return response
        return res.json({
            message: "an error occured, see console for details",
        }, {
            status: 500
        })
    }
}