import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';

export async function GET(req: req){
    try {
        // get token from request
        const token: string = req.headers.get('authorization')!;

        // get token data from database
        const list_token = await query.getAdminToken(token.split(' ')[1]);

        // check if token exists
        if(list_token.length === 0){
            return res.json({
                message: "Token not found",
            }, {
                status: 404
            })
        }

        // remove token in database
        await query.removeAdminToken(list_token[0].admin_id);

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