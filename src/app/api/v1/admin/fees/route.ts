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

    try {
        // search fees
        if(fee_id && search){
            // search fees data from database
            const fees = await query.searchFees(parseInt(fee_id), search);

            // return response
            return res.json({
                message: 'success',
                data: fees,
            }, {
                status: 200
            })
        }

        // get fees data by status
        if(fee_id && filter){
            // get fees data from database
            const fees = await query.getFeesByStatus(parseInt(fee_id), filter);

            // return response
            return res.json({
                message: 'success',
                data: fees,
            }, {
                status: 200
            })
        }
        
        // get fees data by id
        if(fee_id){
            // get fees data from database
            const iuran = await query.getFeeById(parseInt(fee_id));

            // return response
            return res.json({
                message: 'success',
                data: iuran,
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

                // return response
                return res.json({
                    message: 'success',
                    data: fees,
                }, {
                    status: 200
                })
            }

            // get all fees data from database
            const all_fees = await query.getAllFees();

            // return response
            return res.json({
                message: 'success',
                data: all_fees
            }, {
                status: 200
            })
        }
        
        // get iuran data from database with year and month
        const fees = await query.getFees(`${year}-${month}`);

        // return response
        return res.json({
            message: 'success',
            data: fees,
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