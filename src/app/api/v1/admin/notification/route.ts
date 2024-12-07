import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';

interface RequestBody {
    admin_id: number,
    payment_id: number,
    notification_title: string,
    notification_content: string,
}

export async function GET(req: req){
    // get query params
    const admin_id = req.nextUrl.searchParams.get('admin_id');

    try {
        const data = await query.getAdminNotifications(parseInt(admin_id!));

        // return response
        return res.json({
            message: "success",
            data: data
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

export async function POST(req: req){
    // get notification body
    const body: RequestBody = await req.json();

    try {
        // get user id from payment id
        const user = await query.getUserIdByPaymentId(body.payment_id);

        // set notification payment
        await query.setUserPaymentNotification(user[0].user_id, body.notification_title, body.notification_content);

        // return response
        return res.json({
            message: "success"
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
    // get query params
    const body: RequestBody = await req.json();

    try {
        // mark as read
        await query.markAsReadAdminNotification(body.admin_id);

        // return response
        return res.json({
            message: "success"
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