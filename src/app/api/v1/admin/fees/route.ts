import { NextRequest as req, NextResponse as res } from "next/server";
import * as query from '@/database/query';
import * as schema from '@/database/schema';

interface RequestBody {
    date: string[],
    amount: number,
    user_id: number,
}

export async function GET(req: req){
    // get current month and year
    const current_date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);

    // get query from request
    const month = req.nextUrl.searchParams.get('month');
    const year = req.nextUrl.searchParams.get('year');
    const fee_id = req.nextUrl.searchParams.get('fee_id');
    const filter = req.nextUrl.searchParams.get('filter');
    const search = req.nextUrl.searchParams.get('search');
    const limit = req.nextUrl.searchParams.get('limit');
    const page = req.nextUrl.searchParams.get('page');
    const chart_data = req.nextUrl.searchParams.get('chart_data');
    const status = req.nextUrl.searchParams.get('status');

    try {
        // get chart data
        if(chart_data && chart_data === "true"){
            // get current date and 6 months ago
            const currentDate = new Date();
            const newDate = new Date(currentDate);
            newDate.setMonth(currentDate.getMonth() - 6);

            // get chart data from database
            const fees = await query.getChartData(new Date(newDate).toISOString().slice(0, 10), new Date(currentDate).toISOString().slice(0, 10));
            const filteredFees = fees.filter((item) => item.fees?.fee_date! <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

            // group by date
            const groupByDate = (data: {payments: schema.paymentsType; fees: schema.feesType | null}[]) => {
                return data.reduce((acc, item) => {
                    if (item.fees) {
                        const date = item.fees.fee_date;
                        if (!acc[date!]) {
                            acc[date!] = {
                                month: date!,
                                done: 0,
                                undone: 0,
                            };
                        }
                        if (item.payments.payment_description === "done") {
                            acc[date!].done += 1;
                        } else if (item.payments.payment_description === "undone") {
                            acc[date!].undone += 1;
                        }
                    }
                    return acc;
                }, {} as { [key: string]: { month: string; done: number; undone: number; } });
            };

            const groupByDateData = groupByDate(filteredFees);

            // return response
            return res.json({
                message: 'success',
                data: groupByDateData,
            }, {
                status: 200
            })
        }

        // search fees
        if(fee_id && filter && search){
            // search fees data from database
            const fees = await query.searchFeesByRT(parseInt(fee_id), filter, search);
            const filteredFees = fees.filter((item) => item.fees?.fee_date! <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

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
            const filteredFees = fees.filter((item) => item.fees?.fee_date! <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

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
            const filteredUsers = users.filter((item) => item.fees?.fee_date! <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

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
            const users = await query.getFeesByStatusWithPagination(parseInt(fee_id), status, parseInt(page));
            const filteredUsers = users.filter((item) => item.fees?.fee_date! <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

            // return response
            return res.json({
                message: 'success',
                data: filteredUsers,
            }, {
                status: 200
            })
        }

        // get fees data by rt
        if(fee_id && filter && page){
            // get fees data from database
            const fees = await query.getFeesByRT(parseInt(fee_id), filter);
            const users = await query.getFeesByRTWithPagination(parseInt(fee_id), filter, parseInt(page));
            const filteredFees = fees.filter((item) => item.fees?.fee_date! <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);
            const filteredUsers = users.filter((item) => item.fees?.fee_date! <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

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
            const filteredFees = fees.filter((item) => item.fees?.fee_date! <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);
            const filteredUsers = users.filter((item) => item.fees?.fee_date! <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

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
            const filteredFees = fees.filter((item) => item.fees?.fee_date! <= `${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

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

export async function POST(req: req){
    // get current month and year
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    
    // get query from request
    const body: RequestBody = await req.json();
    const multiple = req.nextUrl.searchParams.get('multiple');

    // amount default 55000
    const amount: number = 55000;

    try {
        // set multiple iuran data to database
        if(multiple === "true"){
            // set iuran data to database
            const fees = await query.setMultipleFees(body.date, amount);
            if(fees.length){
                // apply change to all users
                const users = await query.getAllUsers();
                await query.setPaymentWithMultpleID(fees, users);
            }
    
            // get multiple fees data from database thats not inserted on previous command
            const getExistedFees = await query.getMultipleFees(body.date);

            // list all iuran data combined
            const fee_list = [...getExistedFees, ...fees];
            
            // set multiple payment to user by user_id
            fee_list.map(async (fees: schema.feesType) => {
                await query.setMultiplePayment(fees.fee_id, body.user_id);
            })
            
            // return response
            return res.json({
                message: 'success',
            }, {
                status: 201
            })
        }

        // check if iuran data already exists
        const fees = await query.getFees(`${year}-${month}`);
        if(fees.length > 0){
            return res.json({
                message: 'fees data already exists',
            }, {
                status: 400
            })
        }

        // set iuran data to database
        const this_month_fee = await query.setFee(`${year}-${month}`, body.amount);

        // apply change to all users
        const users = await query.getAllUsers();
        await query.setPayment(this_month_fee[0].fee_id, users);

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