import { sql } from "drizzle-orm";
import { boolean, date, index, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const user_tokens = pgTable('user_tokens', {
    user_id: serial('user_id').references(() => users.user_id, { onUpdate: 'cascade', onDelete: 'cascade' }),
    token: varchar('token'),
})

export const admin_tokens = pgTable('admin_tokens', {
    admin_id: serial('admin_id').references(() => administrators.admin_id, { onUpdate: 'cascade', onDelete: 'cascade' }),
    token: varchar('token'),
})

export const users = pgTable('users', {
    user_id: serial('user_id').primaryKey(),
    name: varchar('name', { length: 50 }),
    password: varchar('password', { length: 255 }).default('12345'),
    address: varchar('address', { length: 50 }),
    phone: varchar('phone', { length: 20 }),
})

export const administrators = pgTable('administrators', {
    admin_id: serial('admin_id').primaryKey(),
    name: varchar('name', { length: 50 }),
    password: varchar('password', { length: 255 }).default('12345'),
    phone: varchar('phone', { length: 20 }),
})

export const payments = pgTable('payments', {
    payment_id: serial('payment_id').primaryKey(),
    fee_id: serial('fee_id').references(() => fees.fee_id, { onUpdate: 'cascade', onDelete: 'cascade' }),
    user_id: serial('user_id').references(() => users.user_id, { onUpdate: 'cascade', onDelete: 'cascade' }),
    admin_id: serial('admin_id').references(() => administrators.admin_id, { onUpdate: 'cascade', onDelete: 'cascade' }),
    payment_date: date('payment_date').default(sql`NOW()`),
    payment_status: boolean('payment_status').default(false),
    payment_description: varchar('payment_description', { length: 255 }).default('Belum Lunas'),
    last_update: timestamp('last_update').default(sql`NOW()`),
})

// export const posts = pgTable('posts', {
//     post_id: serial('post_id').primaryKey(),
//     admin_id: serial('admin_id').references(() => administrators.admin_id, { onUpdate: 'cascade', onDelete: 'cascade' }),
//     post_title: varchar('post_title', { length: 50 }),
//     post_content: varchar('post_content'),
//     post_date: timestamp('post_date').default(sql`NOW()`),
//     post_image: varchar('post_image', { length: 255 }).default('announcement-default-image.png'),
// })

export const notifications = pgTable('notifications', {
    notification_id: serial('notification_id').primaryKey(),
    user_id: serial('user_id').references(() => users.user_id, { onUpdate: 'cascade', onDelete: 'cascade' }),
    notification_title: varchar('notification_title', { length: 50 }),
    notification_content: varchar('notification_content'),
    notification_date: timestamp('notification_date').default(sql`NOW()`),
})

export const fees = pgTable('fees', {
    fee_id: serial('fee_id').primaryKey(),
    fee_amount: integer('fee_amount'),
    fee_date: varchar('fee_date'),
})