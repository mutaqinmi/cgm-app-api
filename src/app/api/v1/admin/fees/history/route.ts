import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';

export async function GET(req: req){
    // get query from request
    const page = req.nextUrl.searchParams.get('page');

    try {
        // get payment history data
        if(page){
            // get history data from database
            const history = await query.getPaymentsHistoryWithPagination(parseInt(page));

            // get history count from database
            const historyCount = await query.getPaymentsHistoryCount();

            // return response
            return res.json({
                message: 'success',
                data: history,
                count: historyCount,
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