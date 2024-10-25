import { defineConfig, Config } from 'drizzle-kit'; 

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/database/schema.ts',
    out: './src/migrations',
    dbCredentials: {
        url: process.env.DATABASE_URL
    }
} as Config);