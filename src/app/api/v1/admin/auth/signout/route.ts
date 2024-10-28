import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';
<<<<<<< HEAD
<<<<<<< HEAD
import { verifyToken } from "@/lib/auth";
=======
>>>>>>> 5135e49 (feat: auth API administrator)
=======
import { verifyToken } from "@/lib/auth";
>>>>>>> 26bdf24 (feat: auth method for admin token)

export async function GET(req: req){
    try {
        // get token from request
        const token: string = req.headers.get('authorization')!;
<<<<<<< HEAD
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

=======
        
>>>>>>> 26bdf24 (feat: auth method for admin token)
        // check if token exists
        const verified_token = await verifyToken(token);

        if(!verified_token){
            return res.json({
                message: 'token not found',
            }, {
<<<<<<< HEAD
                status: 404
>>>>>>> 5135e49 (feat: auth API administrator)
=======
                status: 400
>>>>>>> 26bdf24 (feat: auth method for admin token)
            })
        }

        // remove token in database
<<<<<<< HEAD
<<<<<<< HEAD
        await query.removeAdminToken(verified_token);
=======
        await query.removeAdminToken(list_token[0].admin_id);
>>>>>>> 5135e49 (feat: auth API administrator)
=======
        await query.removeAdminToken(verified_token);
>>>>>>> 26bdf24 (feat: auth method for admin token)

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