import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';
import { verifyToken } from "@/lib/auth";

export async function GET(req: req){
    try {
        // get token from request
        const token: string = req.headers.get('authorization')!;
        
        // check if token exists
        const verified_token = await verifyToken(token);

        if(!verified_token){
            return res.json({
                message: 'token not found',
            }, {
                status: 400
            })
        }

        // remove token in database
        await query.removeAdminToken(verified_token);

        // return response
        return res.json({
            message: 'success',
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