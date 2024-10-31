import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest){
    // If the request is to the signin page, then allow it
    if(req.nextUrl.pathname === '/cgm-admin/signin'){
        return NextResponse.next();
    }

    // get the token from the cookie
    const cookie_token = req.cookies.get('token')?.value;

    // If the token is not found, redirect to the signin page
    if(!cookie_token){
        return NextResponse.redirect(new URL('/cgm-admin/signin', req.url));
    }
}

export const config = {
    matcher: [
        '/cgm-admin/:path*',
    ]
}