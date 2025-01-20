/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import * as query from '@/database/query';

interface RequestBody {
    user_id: number,
    old_password: string,
    new_password: string,
    phone: string,
}

export async function GET(req: NextRequest){
    const user_id = req.nextUrl.searchParams.get("user_id");
    const fee_id = req.nextUrl.searchParams.get("fee_id");
    const date = req.nextUrl.searchParams.get("date");

    try {
        // get user data with fee_id
        if(user_id && fee_id){
            const data = await query.getUserDataWithFee(parseInt(user_id), parseInt(fee_id));
            const filteredUserData = data.filter((item) => {
                if(item.payments?.payment_status === true && item.fees && item.fees.fee_date && item.fees.fee_date >= `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`){
                    return item;
                }

                return item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`;
            });
            
            const user = filteredUserData.map(({users: {password, ...users}, ...userData}) => ({...users, ...userData}));

            // return response
            return NextResponse.json({
                message: "success",
                data: user,
            }, {
                status: 200
            })
        }

        if(user_id && date){
            const data = await query.getUserDataWithDate(parseInt(user_id), date);
            const filteredUserData = data.filter((item) => {
                if(item.payments?.payment_status === true && item.fees && item.fees.fee_date && item.fees.fee_date >= `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`){
                    return item;
                }

                return item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`;
            });
            
            const user = filteredUserData.map(({users: {password, ...users}, ...userData}) => ({...users, ...userData}));

            // return response
            return NextResponse.json({
                message: "success",
                data: user,
            }, {
                status: 200
            })
        }

        // get admin data
        const currentYear = new Date().getFullYear();
        const data = await query.getUserData(parseInt(user_id!), currentYear);
        const filteredUserData = data.filter((item) => {
            if(item.payments?.payment_status === true && item.fees && item.fees.fee_date && item.fees.fee_date >= `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`){
                return item;
            }

            return item.fees && item.fees.fee_date && item.fees.fee_date <= `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`;
        });
        
        const user = filteredUserData.map(({users: {password, ...users}, ...userData}) => ({...users, ...userData}));
        
        // return response
        return NextResponse.json({
            message: "success",
            data: user
        }, {
            status: 200
        })
    } catch (error) {
        // log error
        console.log(error);

        // return response
        return NextResponse.json({
            message: "an error occured, see console for details",
        }, {
            status: 500
        })
    }
}

export async function PATCH(req: NextRequest){
    const edit = req.nextUrl.searchParams.get("edit");
    const body: RequestBody = await req.json();

    try {
        if(edit === "phone"){
            await query.updateUserPhone(body.user_id, body.phone);

            // return response
            return NextResponse.json({
                message: "success",
            }, {
                status: 200
            })
        } else if(edit === "password"){
            const user = await query.getUserById(body.user_id);

            if(user[0].password === body.old_password){
                await query.updateUserPassword(body.user_id, body.new_password);

                // return response
                return NextResponse.json({
                    message: "success",
                }, {
                    status: 200
                })
            }

            // return response
            return NextResponse.json({
                message: "Kata sandi lama tidak cocok.",
            }, {
                status: 400
            })
        }

        // return response
        return NextResponse.json({
            message: "invalid edit type",
        }, {
            status: 400
        })
    } catch (error) {
        // log error
        console.log(error);

        // return response
        return NextResponse.json({
            message: "an error occured, see console for details",
        }, {
            status: 500
        })
    }
}