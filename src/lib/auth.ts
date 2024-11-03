import * as query from '@/database/query';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

/**
 * This method is for verifying or checking token existed in database
 */

export async function verifyToken(token: string, cookieToken: RequestCookie) : Promise<number> {
    // check if token exists
    if(!token || !cookieToken.value){
        return 0;
    }

    // check if token same with cookie token
    if(token.replace('Bearer ', '') !== cookieToken.value){
        return 0;
    }
    
    // get token data from database
    const list_token = await query.getAdminToken(token.replace('Bearer ', ''));
    
    // check if token exists
    if(list_token.length === 0){
        return 0;
    }

    // token exists
    return list_token[0].admin_id;
}