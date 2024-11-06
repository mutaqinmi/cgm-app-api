import { verifyToken } from '@/lib/auth';
import { NextRequest as req, NextResponse as res } from 'next/server';
import * as query from '@/database/query';

export async function GET(req: req){
    try {
        // check if token exists
        const token: string = req.headers.get('authorization')!;
        const cookieToken = req.cookies.get("token")!;
        const verified_token = await verifyToken(token, cookieToken);
        if(verified_token === 0){
            return res.json({
                message: 'token tidak valid',
            }, {
                status: 401
            })
        }

        const user_id = req.nextUrl.searchParams.get('user_id');
        const search = req.nextUrl.searchParams.get('search');

        if(search){
            const users = await query.searchUser(search);
            return res.json({
                message: 'success',
                data: users,
            }, {
                status: 200
            })
        }

        if(user_id){
            const user = await query.getUser(parseInt(user_id));
            return res.json({
                message: 'success',
                data: user,
            }, {
                status: 200
            })
        }

        const users = await query.getAllUsers();

        return res.json({
            message: 'success',
            data: users,
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