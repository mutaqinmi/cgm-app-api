import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';

export async function GET(req: req){
    try {
        // get admin id from headers
        const user_id = req.cookies.get('user_id')?.value;

        // remove token in database
        await query.removeUserToken(parseInt(user_id!));

        // return response
        return res.json({
            message: 'success',
        }, {
            status: 200,
            headers: {
                "Set-Cookie": `user_token=; path=/; HttpOnly; SameSite=None; Secure;`
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