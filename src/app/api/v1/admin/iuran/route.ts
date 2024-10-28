import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';

export async function GET(req: req){
    try {
        // get query from request
        const month = req.nextUrl.searchParams.get('month');
        const year = req.nextUrl.searchParams.get('year');

        // get iuran data from database
        const iuran = await query.getIuran(`${month}-${year}`);

        // return response
        return res.json({
            message: 'success',
            data: iuran,
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
    try {
        // get current month and year
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        
        // get query from request
        const body = await req.json();

<<<<<<< HEAD
        // check if iuran data already exists
        const iuran = await query.getIuran(`${month}-${year}`);
        if(iuran){
            return res.json({
                message: 'iuran data already exists',
            }, {
                status: 400
            })
        }

=======
>>>>>>> b1db8b0 (feat: iuran on table fees)
        // set iuran data to database
        await query.setIuran(`${month}-${year}`, body.amount);

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