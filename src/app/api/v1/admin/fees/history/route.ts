import { verifyToken } from "@/lib/auth";
import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';

export async function GET(req: req){
    // get query from request
    const limit = req.nextUrl.searchParams.get('limit');

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

        // check if limit is true
        if(limit && limit === "true"){
            // get histroy data from database
            const history = await query.getPaymentsHistoryLimited();

            // return response
            return res.json({
                message: 'success',
                data: history,
            }, {
                status: 200
            })
        }

        // get history data from database
        const history = await query.getPaymentsHistory();

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