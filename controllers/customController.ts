import { Request, Response } from 'express';
import sequelize from "../config/db";

export const runCustomDBQuery = async (req: Request, res: Response): Promise<void> => {
    try {
        const { query } = req.body;
        const result = await sequelize.query(query);

        res.status(200).json({
            status: true,
            data: result[0],
        });

    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: 'Unable to run query',
            error: error.message,
        });
    }
};