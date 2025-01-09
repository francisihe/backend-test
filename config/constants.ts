import dotenv from 'dotenv';
dotenv.config();

export const DB_HOST: string = process.env.DB_HOST || '';
export const DB_NAME: string = process.env.DB_NAME || '';
export const DB_USER: string = process.env.DB_USER || '';
export const DB_PASSWORD: string = process.env.DB_PASSWORD || '';
export const DB_PORT: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

export const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export const NODE_ENV: string = process.env.NODE_ENV || 'production';