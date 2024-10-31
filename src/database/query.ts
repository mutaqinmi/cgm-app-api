import { db } from '@/database/connection';
import * as table from '@/database/schema';
import { desc, eq, sql } from 'drizzle-orm';

export const getAdministrator = async (phone_number: string) => {
    return await db.select().from(table.administrators).where(eq(table.administrators.phone, phone_number));
}

export const setAdminToken = async (admin_id: number, token: string) => {
    return await db.insert(table.admin_tokens).values({
        admin_id: admin_id,
        token: token,
    })
}

export const getAdminToken = async (token: string) => {
    return await db.select().from(table.admin_tokens).where(eq(table.admin_tokens.token, token));
}

export const removeAdminToken = async (admin_id: number) => {
    return await db.delete(table.admin_tokens).where(eq(table.admin_tokens.admin_id, admin_id));
}

export const getIuran = async (date: string) => {
    return await db.select().from(table.fees).where(eq(table.fees.fee_date, date));
}

export const getAllIuran = async () => {
    return await db.select().from(table.payments).leftJoin(table.fees, eq(table.payments.fee_id, table.fees.fee_id)).orderBy(desc(table.payments.payment_date));
}

export const setIuran = async (date: string, amount: number) => {
    return await db.insert(table.fees).values({
        fee_date: date,
        fee_amount: amount,
    });
}