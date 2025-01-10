import { Request, Response } from "express";
import sequelize from "../config/db";

export const healthCheck = async (req: Request, res: Response): Promise<void> => {
    try {
        await sequelize.authenticate();

        res.status(200).json({
            status: "healthy",
            message: "API is running smoothly",
            database: "connected",
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        res.status(500).json({
            status: "unhealthy",
            message: "API or database is down...",
            error: error.message,
            timestamp: new Date().toISOString(),
        });
    }
};