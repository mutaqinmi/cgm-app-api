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

    if(pathname.startsWith('/api/v1/general')){
        if (req.method === 'OPTIONS') {
            const res = NextResponse.next();
            res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001');
            res.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PATCH,PUT,DELETE');
            res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.headers.set('Access-Control-Allow-Credentials', 'true');
            return res;
        }
    }

    if(pathname.startsWith('/api/v1/warga')){
        if (req.method === 'OPTIONS') {
            const res = NextResponse.next();
            res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001');
            res.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PATCH,PUT,DELETE');
            res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.headers.set('Access-Control-Allow-Credentials', 'true');
            return res;
        }
    }

    // get the token from the cookie
    const cookie_admin_token = req.cookies.get('admin_token')?.value;
    const cookie_user_token = req.cookies.get('user_token')?.value;

    // administrator section authentication

    if(pathname.startsWith('/api/v1/admin/auth')) return NextResponse.next();

    if(pathname.startsWith('/api/v1/admin')){
        // fetch the token from the server
        try {
            const admin_id = await axios.post(`${process.env.API_URL}/admin/auth`, {
                token: cookie_admin_token
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

            console.log(data);

            // set cookie expiration
            const expiration = new Date();
            expiration.setDate(expiration.getDate() + 7);
            
            const response = NextResponse.next()

            response.cookies.set('admin_id', data.toString(), {
                path: '/',
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expires: expiration,
            });
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

    // user section authentication

    if(pathname.startsWith('/api/v1/warga/auth')) return NextResponse.next();

    if(pathname.startsWith('/api/v1/warga')){
        // fetch the token from the server
        try {
            const user_id = await axios.post(`${process.env.API_URL}/warga/auth`, {
                token: cookie_user_token
            }, { withCredentials: true });
            const { data } = user_id.data as { data: number };
    
            if(pathname.startsWith('/api/v1/warga') && (data === 0 || data === undefined)){    
                // If the token is not found, redirect to the signin page
                return NextResponse.json({
                    message: 'token tidak valid',
                }, {
                    status: 401
                })
            }

            // set cookie expiration
            const expiration = new Date();
            expiration.setDate(expiration.getDate() + 7);
            
            const response = NextResponse.next()

            response.cookies.set('user_id', data.toString(), {
                path: '/',
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expires: expiration,
            });
            return response;
        } catch (error) {
            console.log(error);

            if(pathname.startsWith('/api/v1/warga')){    
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