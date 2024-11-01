import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';
import { verifyToken } from "@/lib/auth";

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

        // get query from request
        const month = req.nextUrl.searchParams.get('month');
        const year = req.nextUrl.searchParams.get('year');

        if(!month || !year){
            const all_iuran = await query.getAllIuran();
            return res.json({
                message: 'success',
                data: all_iuran,
            }, {
                status: 200
            })
        }
        
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

        // get current month and year
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        
        // get query from request
        const body = await req.json();

        // check if iuran data already exists
        const iuran = await query.getIuran(`${month}-${year}`);
        if(iuran.length > 0){
            return res.json({
                message: 'iuran data already exists',
            }, {
                status: 400
            })
        }

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