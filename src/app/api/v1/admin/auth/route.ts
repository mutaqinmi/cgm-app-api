import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const token = req.nextUrl.searchParams.get('token')
    const verify = await verifyToken(token);

    return NextResponse.json({
        message: "success",
        data: verify
    }, {
        status: 200
    });
}