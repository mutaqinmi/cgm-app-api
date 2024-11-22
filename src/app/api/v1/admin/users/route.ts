import { NextRequest as req, NextResponse as res } from 'next/server';
import * as query from '@/database/query';

interface RequestBody {
    name: string,
    phone: string,
    address: string,
    rt: string,
}

export async function GET(req: req){
    // get query params from request
    const user_id = req.nextUrl.searchParams.get('user_id');
    const search = req.nextUrl.searchParams.get('search');
    const filtered = req.nextUrl.searchParams.get('filtered');
    const page = req.nextUrl.searchParams.get('page');

    try {
        if(page){
            // get all users with pagination
            const usersList = await query.getAllUsersWithPagination(parseInt(page));

            // extract password from users data
            const users = usersList.map(({password, ...userData}) => userData);

            // get all users count
            const usersCount = await query.getAllUsersCount();

            // return response
            return res.json({
                message: 'success',
                data: users,
                count: usersCount,
            }, {
                status: 200
            })
        }

        // get user data with undone filter
        if(user_id && filtered){
            // get user data with undone filter
            const usersList = await query.getUserWithUndoneFilter(parseInt(user_id));

            // extract password from users data
            const users = usersList.map(({users: {password, ...users}, ...userData}) => ({...users, ...userData}));

            // return response
            return res.json({
                message: 'success',
                data: users,
            }, {
                status: 200
            })
        }

        // search user
        if(search){
            // search user
            const usersList = await query.searchUser(search);

            // extract password from users data
            const users = usersList.map(({password, ...userData}) => userData);

            // return response
            return res.json({
                message: 'success',
                data: users,
            }, {
                status: 200
            })
        }

        // get user data by user_id
        if(user_id){
            // get user data by user_id
            const userData = await query.getUserData(parseInt(user_id));

            // extract password from users data
            const user = userData.map(({users: {password, ...users}, ...userData}) => ({...users, ...userData}));

            // return response
            return res.json({
                message: 'success',
                data: user,
            }, {
                status: 200
            })
        }

        // get all users
        const usersList = await query.getAllUsers();

        // extract password from users data
        const users = usersList.map(({password, ...userData}) => userData);

        // return response
        return res.json({
            message: 'success',
            data: users,
        }, {
            status: 200
        })
    } catch (error) {
        // log error
        console.log(error);

        // return response
        return res.json({
            message: "an error occured, see console for details",
        }, {
            status: 500
        })
    }
}

//! IMPORTANT!
//TODO: add payment on new user

export async function POST(req: req){
    const body: RequestBody = await req.json();

    try {
        // add new user
        await query.addNewUser(body.name, body.address, body.phone, body.rt);
        
        // return response
        return res.json({
            message: 'success',
        }, {
            status: 201
        })
    } catch (error) {
        // log error
        console.log(error);

        // return response
        return res.json({
            message: "an error occured, see console for details",
        }, {
            status: 500
        })
        
    }
}