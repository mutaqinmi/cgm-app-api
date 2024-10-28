import * as query from '@/database/query';

/**
 * This method is for verifying or checking token existed in database
 */

export async function verifyToken(token: string) : Promise<number> {
    // get token data from database
    const list_token = await query.getAdminToken(token.split(' ')[1]);

    // check if token exists
    if(list_token.length === 0){
        return 0;
    }

    // token exists
    return list_token[0].admin_id;
}