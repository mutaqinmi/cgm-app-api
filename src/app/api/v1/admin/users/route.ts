/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest as req, NextResponse as res } from 'next/server';
import * as query from '@/database/query';
import * as schema from '@/database/schema';

interface RequestBody {
    name: string,
    phone: string,
    address: string,
    rt: string,
    users: schema.usersType[],
}

export async function GET(req: req){
    // get query params from request
    const user_id = req.nextUrl.searchParams.get('user_id');
    const search = req.nextUrl.searchParams.get('search');
    const page = req.nextUrl.searchParams.get('page');
    const filtered = req.nextUrl.searchParams.get('filtered');
    const status = req.nextUrl.searchParams.get('status');
    const date = req.nextUrl.searchParams.get('date');

    try {
        // get user data with date
        if(user_id && date){
            const data = await query.getUserDataWithDate(parseInt(user_id), date);
            const filteredUserData = data.filter((item) => {
                if(item.payments?.payment_status === true && item.fees && item.fees.fee_date && item.fees.fee_date >= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`){
                    return item;
                }

                return item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;
            });
            
            const user = filteredUserData.map(({users: {password, ...users}, ...userData}) => ({...users, ...userData}));

            // return response
            return res.json({
                message: "success",
                data: user
            }, {
                status: 200
            })
        }

        // get user data by user_id
        if(user_id && filtered && filtered === 'true'){
            // get user data by user_id
            const undonePaymentsData = await query.getUserWithUndoneFilter(parseInt(user_id));
            const filteredUndonePaymentsData = undonePaymentsData.filter((item) => {
                return item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
            });

            const undonePayments = filteredUndonePaymentsData.map(({users: {password, ...users}, ...userData}) => ({...users, ...userData}));

            // return response
            return res.json({
                message: 'success',
                data: undonePayments,
            }, {
                status: 200
            })
        }
        
        if(user_id && status){
            // get user data by user_id
            const userData = await query.getUserDataWithStatus(parseInt(user_id), status);
            const filteredUserData = userData.filter((item) => {
                if(item.payments?.payment_status === true && item.fees && item.fees.fee_date && item.fees.fee_date >= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`){
                    return item;
                }
    
                return item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;
            });
            
            const user = filteredUserData.map(({users: {password, ...users}, ...userData}) => ({...users, ...userData}));
            
            // return response
            return res.json({
                message: 'success',
                data: user,
            }, {
                status: 200
            })
        }

        // get user data by user_id
        if(user_id){
            // get user data by user_id
            const currentYear = new Date().getFullYear();
            const userData = await query.getUserData(parseInt(user_id), currentYear);
            const filteredUserData = userData.filter((item) => {
                if(item.payments?.payment_status === true && item.fees && item.fees.fee_date && item.fees.fee_date >= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`){
                    return item;
                }

                return item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;
            });
            
            const user = filteredUserData.map(({users: {password, ...users}, ...userData}) => ({...users, ...userData}));
            
            // return response
            return res.json({
                message: 'success',
                data: user,
            }, {
                status: 200
            })
        }

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

export async function POST(req: req){
    const body: RequestBody = await req.json();

    // get query params
    const multiple = req.nextUrl.searchParams.get('multiple');

    try {
        if(multiple && multiple === 'true'){
            const users = await query.addMultipleNewUser(body.users);

            // get current month fee
            const currentMonthFee = await query.getFees(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`);
            if(currentMonthFee.length){
                // set current month payment to new user
                users.map(async (user) => {
                    await query.setSinglePayment(currentMonthFee[0].fee_id, user.user_id);
                })
            }

            // return response
            return res.json({
                message: 'success',
            }, {
                status: 200
            })
        }

        // get current month fee
        const currentMonthFee = await query.getFees(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

        // add new user
        const newUser = await query.addNewUser(body.name, body.address, body.phone, body.rt);

        if(currentMonthFee.length){
            // set current month payment to new user
            await query.setSinglePayment(currentMonthFee[0].fee_id, newUser[0].user_id);
        }
        
        // return response
        return res.json({
            message: 'success',
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

export async function PATCH(req: req){
    const body: RequestBody = await req.json();
    const user_id = req.nextUrl.searchParams.get('user_id');

    try {
        if(user_id){
            // update user
            await query.updateUserData(parseInt(user_id), body.name, body.address, body.phone, body.rt);
            
            // return response
            return res.json({
                message: 'success',
            }, {
                status: 200
            })
        }

        return res.json({
            message: 'user_id required',
        }, {
            status: 400
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

export async function DELETE(req: req){
    const user_id = req.nextUrl.searchParams.get('user_id');

    try {
        const users = await query.getAllUsers();

        if(users.length > 1){
            if(user_id){
                await query.deleteUser(parseInt(user_id));
    
                return res.json({
                    message: 'success',
                }, {
                    status: 200
                })
            }

            return res.json({
                message: 'user_id required',
            }, {
                status: 400
            })
        }
        
        return res.json({
            message: 'user tidak dapat dihapus',
        }, {
            status: 400
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