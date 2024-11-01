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

        // get id from query
        const payment_id = req.nextUrl.searchParams.get('payment_id');

        // get payment data from database
        const payment = await query.getPaymentById(parseInt(payment_id!));

        // return response
        return res.json({
            message: 'success',
            data: payment,
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

export async function PATCH(req: req){
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

        // get id from query
        const payment_id = req.nextUrl.searchParams.get('payment_id');
        const body = await req.json();

        // update payment data from database
        await query.updatePayment(parseInt(payment_id!), body.payment_status, body.payment_description);

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