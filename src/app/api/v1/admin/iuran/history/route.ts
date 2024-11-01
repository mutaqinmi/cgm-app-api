import { verifyToken } from "@/lib/auth";
import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';

export async function GET(req: req){
    try {
        // check if token exists
        const token: string = req.headers.get('authorization')!;
        const cookieToken = req.cookies.get("token")!;
        const verified_token = await verifyToken(token, cookieToken);
        if(!verified_token){
            return res.json({
                message: 'token tidak valid',
            }, {
                status: 401
            })
        }

        // get histroy data from database
        const history = await query.getPaymentHistory();

        // return response
        return res.json({
            message: 'success',
            data: history,
        }, {
            status: 200
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