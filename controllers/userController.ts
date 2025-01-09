import { Request, Response } from 'express';
import User from '../models/userModel';
// import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({
                status: false,
                message: 'User already exists',
            });
            return;
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({
            status: true,
            message: 'User has been created',
            data: { user }
        });
    } catch (error: any) {
        res.status(400).json({
            status: false,
            message: 'Unable to create user',
            error: error.message,
        });
    }
}