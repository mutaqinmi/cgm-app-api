import * as query from '@/database/query';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest } from 'next/server';

/**
 * This method is for verifying or checking token existed in database
*/

export async function verifyToken(token: string | null) : Promise<number> {
    // check if token exists
    if(!token){
        return 0;
    }

    // get token data from database
    const list_token = await query.getAdminToken(token);
    
    // check if token exists
    if(list_token.length === 0){
        return 0;
    }

    // token exists
    return list_token[0].admin_id;
}

// export async function verifyToken(req: NextRequest) : Promise<number> {
//     // get token from request
//     const token: string = req.headers.get('authorization')!;
//     const cookieToken = req.cookies.get('token')!;

//     // check if token exists in request
//     if(!token || !cookieToken.value){
//         return 0;
//     }

//     // check if token same with cookie token
//     if(token.replace('Bearer ', '') !== cookieToken.value){
//         return 0;
//     }
    
//     // get token data from database
//     const list_token = await query.getAdminToken(token.replace('Bearer ', '').toString());
    
//     // check if token exists in database
//     if(list_token.length === 0){
//         return 0;
//     }

//     // token exists
//     return list_token[0].admin_id;
// }