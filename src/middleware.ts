import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function middleware(req: NextRequest){
    // get the pathname of the request
    const pathname = req.nextUrl.pathname;

    // setting cors
    if(pathname.startsWith('/api/v1/admin')){
        if (req.method === 'OPTIONS') {
            const res = NextResponse.next();
            res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PATCH,PUT,DELETE');
            res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.headers.set('Access-Control-Allow-Credentials', 'true');
            return res;
        }
    }

    // get the token from the cookie
    const cookie_token = req.cookies.get('token')?.value;

    if(pathname.startsWith('/api/v1/admin/auth')) return NextResponse.next();

    if(pathname.startsWith('/api/v1/admin')){
        // fetch the token from the server
        try {
            const admin_id = await axios.post(`${process.env.API_URL}/admin/auth`, {
                token: cookie_token
            }, { withCredentials: true });
            const { data } = admin_id.data as { data: number };
    
            if(pathname.startsWith('/api/v1/admin') && (data === 0 || data === undefined)){    
                // If the token is not found, redirect to the signin page
                return NextResponse.json({
                    message: 'token tidak valid',
                }, {
                    status: 401
                })
            }
            
            const response = NextResponse.next()

            response.cookies.set('admin_id', data.toString());
            return response;
        } catch (error) {
            console.log(error);

            if(pathname.startsWith('/api/v1/admin')){    
                // If the token is not found, redirect to the signin page
                return NextResponse.json({
                    message: 'token tidak valid',
                }, {
                    status: 401
                })
            }
        }
    }
}

export const config = {
    matcher: [
        '/api/:path*'
    ]
}