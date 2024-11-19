import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

interface Body {
    token: string;
}

export async function POST(req: NextRequest){
    const body: Body = await req.json();

    try {
        // verify token
        const verify = await verifyToken(body.token);
    
        // return response
        return NextResponse.json({
            message: "success",
            data: verify
        }, {
            status: 200
        });
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