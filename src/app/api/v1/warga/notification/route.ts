import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';

interface RequestBody {
    user_id: number,
    notification_title: string,
    notification_content: string,
}

export async function GET(req: req){
    // get query params
    const user_id = req.nextUrl.searchParams.get('user_id');

    try {
        const data = await query.getUserNotifications(parseInt(user_id!));

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
        // get all administrator
        const admins = await query.getAllAdministrator();

        // set notification for all administrator
        await query.setAdminNotification(admins, body.notification_title, body.notification_content);

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
        await query.markAsReadUserNotification(body.user_id);

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