import { NextRequest, NextResponse } from "next/server";
import * as query from '@/database/query';

interface RequestBody {
    admin_id: number,
    name: string,
    old_password: string,
    new_password: string,
    phone: string,
}

export async function GET(req: NextRequest){
    const admin_id = req.nextUrl.searchParams.get("admin_id");

    try {
        // get admin data
        const data = await query.getAdministratorByID(parseInt(admin_id!));
        
        // return response
        return NextResponse.json({
            message: "success",
            data
        }, {
            status: 200
        })
    } catch (error) {
        // log error
        console.log(error);

        // return response
        return NextResponse.json({
            message: "an error occured, see console for details",
        }, {
            status: 500
        })
    }
}

export async function PATCH(req: NextRequest){
    const edit = req.nextUrl.searchParams.get("edit");
    const body: RequestBody = await req.json();

    try {
        if(edit === "phone"){
            await query.updateAdministratorPhone(body.admin_id, body.phone);

            // return response
            return NextResponse.json({
                message: "success",
            }, {
                status: 200
            })
        } else if(edit === "password"){
            const admin = await query.getAdministratorByID(body.admin_id);

            if(admin[0].password === body.old_password){
                await query.updateAdministratorPassword(body.admin_id, body.new_password);

                // return response
                return NextResponse.json({
                    message: "success",
                }, {
                    status: 200
                })
            }

            // return response
            return NextResponse.json({
                message: "Kata sandi lama tidak cocok.",
            }, {
                status: 400
            })
        }

        // return response
        return NextResponse.json({
            message: "invalid edit type",
        }, {
            status: 400
        })
    } catch (error) {
        // log error
        console.log(error);

        // return response
        return NextResponse.json({
            message: "an error occured, see console for details",
        }, {
            status: 500
        })
    }
}