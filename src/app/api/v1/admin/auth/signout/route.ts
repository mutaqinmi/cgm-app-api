import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';
<<<<<<< HEAD
import { verifyToken } from "@/lib/auth";
=======
>>>>>>> 5135e49 (feat: auth API administrator)

export async function GET(req: req){
    try {
        // get token from request
        const token: string = req.headers.get('authorization')!;
<<<<<<< HEAD
        
        // check if token exists
        const verified_token = await verifyToken(token);

        if(!verified_token){
            return res.json({
                message: 'token not found',
            }, {
                status: 400
=======

        // get token data from database
        const list_token = await query.getAdminToken(token.split(' ')[1]);

        // check if token exists
        if(list_token.length === 0){
            return res.json({
                message: "Token not found",
            }, {
                status: 404
>>>>>>> 5135e49 (feat: auth API administrator)
            })
        }

        // remove token in database
<<<<<<< HEAD
        await query.removeAdminToken(verified_token);
=======
        await query.removeAdminToken(list_token[0].admin_id);
>>>>>>> 5135e49 (feat: auth API administrator)

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