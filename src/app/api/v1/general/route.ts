import { NextRequest as req, NextResponse as res } from 'next/server';
import * as query from '@/database/query';

export async function GET(req: req){
    const get = req.nextUrl.searchParams.get('get');

    try {
        if(get === 'whatsapp'){
            // get admin with id 1 phone number
            const adminData = await query.getAdministratorPhone();
            const { phone } = adminData[0];
    
            // return response
            return res.json({
                phone
            }, {
                status: 200
            })
        }

        // return response
        return res.json({
            message: 'invalid query parameter',
        }, {
            status: 404
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