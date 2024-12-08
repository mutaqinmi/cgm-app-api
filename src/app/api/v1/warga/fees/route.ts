/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';

export async function GET(req: req){
    // get query from request
    const user_id = req.nextUrl.searchParams.get('user_id');
    const month = req.nextUrl.searchParams.get('month');
    const year = req.nextUrl.searchParams.get('year');
    const fee_id = req.nextUrl.searchParams.get('fee_id');
    const filter = req.nextUrl.searchParams.get('filter');
    const search = req.nextUrl.searchParams.get('search');
    const limit = req.nextUrl.searchParams.get('limit');
    const page = req.nextUrl.searchParams.get('page');
    const status = req.nextUrl.searchParams.get('status');
    const payment_id = req.nextUrl.searchParams.get('payment_id');
    const filtered = req.nextUrl.searchParams.get('filtered');

    try {
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

        // get payment data from database
        if(payment_id){
            // get payment data from database
            const payment = await query.getPaymentById(parseInt(payment_id!));

            // return response
            return res.json({
                message: 'success',
                data: payment,
            }, {
                status: 200
            })
        }
        
        // search fees
        if(fee_id && filter && search){
            // search fees data from database
            const fees = await query.searchFeesByRT(parseInt(fee_id), filter, search);
            const filteredFees = fees.filter((item) => item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

            // return response
            return res.json({
                message: 'success',
                data: filteredFees,
            }, {
                status: 200
            })
        }

        // search fees
        if(fee_id && search){
            // search fees data from database
            const fees = await query.searchFees(parseInt(fee_id), search);
            const filteredFees = fees.filter((item) => item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

            // return response
            return res.json({
                message: 'success',
                data: filteredFees,
            }, {
                status: 200
            })
        }

        if(fee_id && filter && status && page){
            // get fees data from database
            const users = await query.getFeesByRTWithStatusWithPagination(parseInt(fee_id), filter, status, parseInt(page));
            const filteredUsers = users.filter((item) => item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

            // return response
            return res.json({
                message: 'success',
                data: filteredUsers,
            }, {
                status: 200
            })
        }

        if(fee_id && status && page){
            // get fees data from database
            // const users = await query.getFeesByStatusWithPagination(parseInt(fee_id), status, parseInt(page));
            const users = await query.getFeesByStatus(parseInt(fee_id), status);
            const filteredUsers = users.filter((item) => item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

            // return response
            return res.json({
                message: 'success',
                users: filteredUsers,
            }, {
                status: 200
            })
        }

        // get fees data by rt
        if(fee_id && filter && page){
            // get fees data from database
            const fees = await query.getFeesByRT(parseInt(fee_id), filter);
            const users = await query.getFeesByRTWithPagination(parseInt(fee_id), filter, parseInt(page));
            const filteredFees = fees.filter((item) => item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);
            const filteredUsers = users.filter((item) => item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

            // return response
            return res.json({
                message: 'success',
                data: filteredFees,
                users: filteredUsers,
            }, {
                status: 200
            })
        }

        if(fee_id && page){
            // get fees data from database
            const fees = await query.getFeeById(parseInt(fee_id));
            const users = await query.getFeeByIdWithPagination(parseInt(fee_id), parseInt(page));
            const filteredFees = fees.filter((item) => item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);
            const filteredUsers = users.filter((item) => item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

            // return response
            return res.json({
                message: 'success',
                data: filteredFees,
                users: filteredUsers,
            }, {
                status: 200
            })
        }
        
        // get fees data by id
        if(fee_id){
            // get fees data from database
            const fees = await query.getFeeById(parseInt(fee_id));
            const filteredFees = fees.filter((item) => item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

            // return response
            return res.json({
                message: 'success',
                data: filteredFees,
            }, {
                status: 200
            })
        }

        // get fees data with pagination
        if(page){
            // get fees data from database with pagination
            const fees = await query.getFeesWithPagination(parseInt(page));
            const filteredFees = fees.filter((item) => item.fee_date! <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

            // get fees count from database
            const feesCount = await query.getCountFees();

            // return response
            return res.json({
                message: 'success',
                data: filteredFees,
                count: feesCount,
            }, {
                status: 200
            })
        }

        // get all fees data without year and month
        if(!month || !year){
            // get all fees data from database with limited data
            if(limit && limit === "true"){
                // get all fees data from database
                const fees = await query.getAllFeesLimited();
                const filteredFees = fees.filter((item) => item.fee_date! <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

                // return response
                return res.json({
                    message: 'success',
                    data: filteredFees,
                }, {
                    status: 200
                })
            }

            // get all fees data from database
            const all_fees = await query.getAllFees();
            const filteredFees = all_fees.filter((item) => item.fee_date! <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

            // return response
            return res.json({
                message: 'success',
                data: filteredFees
            }, {
                status: 200
            })
        }
        
        // get iuran data from database with year and month
        const fees = await query.getFees(`${year}-${month}`);
        const filteredFees = fees.filter((item) => item.fee_date! <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

        // return response
        return res.json({
            message: 'success',
            data: filteredFees,
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
    // get data from request
    const payment_id = req.nextUrl.searchParams.get('payment_id');
    const body = await req.json();

    try {
        // update payment data on database
        await query.updatePayment(parseInt(payment_id!), body.payment_status, body.payment_description);

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