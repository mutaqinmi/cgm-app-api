import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';
import { verifyToken } from "@/lib/auth";

export async function GET(req: req){
    try {
        // get token from request
        const token: string = req.headers.get('authorization')!;
        const cookieToken = req.cookies.get("token")!;
        
        // check if token exists
        const verified_token = await verifyToken(token, cookieToken);
        if(verified_token === 0){
            return res.json({
                message: 'token tidak valid',
            }, {
                status: 401
            })
        }

        // remove token in database
        await query.removeAdminToken(verified_token);

        // clear cookie

        // return response
        return res.json({
            message: 'success',
        }, {
            status: 200,
            headers: {
                "Set-Cookie": `token=; path=/; HttpOnly; SameSite=Strict;`
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