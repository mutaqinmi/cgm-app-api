import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';

export async function GET(req: req){
    try {
        // get admin id from headers
        const admin_id = req.cookies.get('admin_id')?.value;

        // remove token in database
        await query.removeAdminToken(parseInt(admin_id!));

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