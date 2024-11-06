import { db } from '@/database/connection';
import * as table from '@/database/schema';
import { and, asc, desc, eq, ilike, or, sql } from 'drizzle-orm';

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
    return await db.select().from(table.fees).orderBy(desc(table.fees.fee_date));
}

export const getAllIuranLimited = async () => {
    return await db.select().from(table.fees).orderBy(desc(table.fees.fee_date)).limit(3);
}

export const getIuranById = async (fee_id: number) => {
    return await db.select().from(table.fees).leftJoin(table.payments, eq(table.fees.fee_id, table.payments.fee_id)).leftJoin(table.users, eq(table.payments.user_id, table.users.user_id)).where(eq(table.fees.fee_id, fee_id));
}

export const getIuranByStatus = async (fee_id: number, filter: string) => {
    return await db.select().from(table.payments).leftJoin(table.users, eq(table.payments.user_id, table.users.user_id)).leftJoin(table.fees, eq(table.payments.fee_id, table.fees.fee_id)).where(and(eq(table.fees.fee_id, fee_id), eq(table.payments.payment_description, filter)));
}

export const searchIuran = async (fee_id: number, keyword: string) => {
    return await db.select().from(table.payments).leftJoin(table.users, eq(table.payments.user_id, table.users.user_id)).leftJoin(table.fees, eq(table.payments.fee_id, table.fees.fee_id)).where(and(eq(table.fees.fee_id, fee_id), or(ilike(table.users.name, `%${keyword}%`), ilike(table.users.address, `%${keyword}%`))));
}

export const setIuran = async (date: string, amount: number) => {
    return await db.insert(table.fees).values({
        fee_date: date,
        fee_amount: amount,
    }).returning();
}

export const getLimitedPaymentHistory = async () => {
    return await db.select().from(table.payments).leftJoin(table.users, eq(table.payments.user_id, table.users.user_id)).orderBy(desc(table.payments.last_update)).limit(5);
}

export const getPaymentHistory = async () => {
    return await db.select().from(table.payments).leftJoin(table.users, eq(table.payments.user_id, table.users.user_id)).orderBy(desc(table.payments.last_update));
}

export const getAllPaymentHistory = async () => {
    return await db.select().from(table.payments).leftJoin(table.users, eq(table.payments.user_id, table.users.user_id)).orderBy(desc(table.payments.last_update));
}

export const getPaymentById = async (payment_id: number) => {
    return await db.select().from(table.fees).leftJoin(table.payments, eq(table.fees.fee_id, table.payments.fee_id)).leftJoin(table.users, eq(table.payments.user_id, table.users.user_id)).where(eq(table.payments.payment_id, payment_id));
}

export const updatePayment = async (payment_id: number, payment_status: boolean, payment_description: string) => {
    return await db.update(table.payments).set({payment_status, payment_description, last_update: sql`NOW()`}).where(eq(table.payments.payment_id, payment_id));
}

export const getAllUsers = async () => {
    return await db.select().from(table.users);
}

export const searchUser = async (keyword: string) => {
    return await db.select().from(table.users).where(or(ilike(table.users.name, `%${keyword}%`), ilike(table.users.address, `%${keyword}%`)));
}

export const getUser = async (user_id: number) => {
    return await db.select().from(table.users).leftJoin(table.payments, eq(table.users.user_id, table.payments.user_id)).leftJoin(table.fees, eq(table.payments.fee_id, table.fees.fee_id)).where(eq(table.users.user_id, user_id)).orderBy(desc(table.fees.fee_date));
}

export const setPayment = async (fee_id: number, users: table.usersType[], admin_id: number) => {
    users.map(async (user: table.usersType) => {
        return await db.insert(table.payments).values({
            fee_id,
            user_id: user.user_id,
            admin_id,
        });
    })
}