import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from "../../config/constants";

import { IUser } from "../../types/userTypes";

export const verifyUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                status: false,
                message: 'Unauthorized. Please login to continue',
            });
            return;
        }

        const decodedToken = jwt.verify(token, JWT_SECRET) as IUser;
        req.user = decodedToken;

        next();
    } catch (error: any) {
        res.status(400).json({
            status: false,
            message: 'Unable to verify user',
            error: error.message,
        });
    }
}