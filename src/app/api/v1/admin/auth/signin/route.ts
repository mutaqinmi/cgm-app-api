import { NextRequest as req, NextResponse as res } from "next/server";

export async function POST(req: req){
    try {
        const body = await req.json();
        return res.json({
            message: body
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return res.json({
            message: "error",
            error: error
        }, {
            status: 500
        })
    }
}