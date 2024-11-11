import { verifyToken } from "@/lib/auth";
import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';

export async function GET(req: req){
    // get query from request
    const payment_id = req.nextUrl.searchParams.get('payment_id');

    try {
        // check if token exists
        const verified_token = await verifyToken(req);
        if(!verified_token){
            return res.json({
                message: 'token tidak valid',
            }, {
                status: 401
            })
        }

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
    // get data from request
    const payment_id = req.nextUrl.searchParams.get('payment_id');
    const body = await req.json();

    try {
        // check if token exists
        const verified_token = await verifyToken(req);
        if(!verified_token){
            return res.json({
                message: 'token tidak valid',
            }, {
                status: 401
            })
        }

        // update payment data on database
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