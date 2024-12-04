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
    let phone_number: string = body.phone;
    const admin_password: string = body.password;
    
    try {
        // get administrator data from database
        const administrator = await query.getAdministrator(phone_number);

        // check if administrator exists
        if(administrator.length === 0){
            return res.json({
                message: "Administrator tidak ditemukan",
            }, {
                status: 404
            })
        }

        // check if password is correct
        if(administrator[0].password !== admin_password){
            return res.json({
                message: "Password salah",
            }, {
                status: 401
            })
        }

        // generate token
        const {password, ...payloads} = administrator[0];
        const token = generateToken(payloads);

        // set token in database
        await query.setAdministratorToken(administrator[0].admin_id, token);

        // set cookie expiration
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + 7);

        // return response
        return res.json({
            message: 'success',
            data: {
                user: payloads.name,
                admin_id: payloads.admin_id,
                token: token,
            }
        }, {
            status: 200,
            headers: {
                "Set-Cookie": `token=${token}; path=/; HttpOnly; SameSite=None; Secure; expires=${expiration.toUTCString()};`
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