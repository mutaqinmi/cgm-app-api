import { verifyToken } from "@/lib/auth";
import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from "@/database/query";

export async function POST(req: req){
    try {
        // check if token exists
        const token: string = req.headers.get('authorization')!;
        const cookieToken = req.cookies.get("token")!;
        const verified_token = await verifyToken(token, cookieToken);
        if(verified_token === 0){
            return res.json({
                message: 'token tidak valid',
            }, {
                status: 401
            })
        }

        const body = await req.json();

        const iuran = await query.setMultipleIuran(body.date, 55000); // amount default 55000
        if(iuran.length){
            const users = await query.getAllUsers();
            await query.setPaymentWithMultpleID(iuran, users, verified_token);
        }

        const getExistedIuran = await query.getMultipleIuran(body.date);
        const list_iuran = [...getExistedIuran, ...iuran];
        
        list_iuran.map(async (i: any) => {
            await query.setMultiplePayment(i.fee_id, body.user_id, verified_token);
        })

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