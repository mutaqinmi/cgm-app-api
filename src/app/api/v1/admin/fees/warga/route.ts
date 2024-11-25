import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';

export async function GET(req: req){
    // get query from request
    const payment_id = req.nextUrl.searchParams.get('payment_id');

    try {
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