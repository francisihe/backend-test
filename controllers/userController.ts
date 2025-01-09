import { Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

import { NODE_ENV, JWT_SECRET } from '../config/constants';

import Post from '../models/postModel';

import { IUser } from '../types/userTypes';

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

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } }) as IUser | null;

        if (!user) {
            res.status(401).json({
                status: false,
                message: 'Invalid credentials. Please try again',
            });
            return;
        }

        const isPasswordValid = bcryptjs.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                status: false,
                message: 'Invalid credentials. Please try again',
            });
            return;
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({
            status: true,
            message: 'User has been logged in'
        });

    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: 'Unable to login user',
            error: error.message,
        });
    }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('token');

        res.status(200).json({
            status: true,
            message: 'User has been logged out'
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: 'Unable to logout user',
            error: error.message,
        });
    }
}

export const getUserPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; 

        const user = await User.findByPk(id);
        
        if (!user) {
            res.status(404).json({
                status: false,
                message: 'User not found',
            });
            return;
        }

        const posts = await Post.findAll({
            where: { userId: id },
        });

        if (!posts.length) {
            res.status(404).json({
                status: false,
                message: "No posts found for this user",
            });
            return;
        }

        res.status(200).json({
            status: true,
            message: 'User\'s posts have been retrieved',
            data: posts
        });
    } catch (error: any) {
        res.status(400).json({
            status: false,
            message: 'Unable to retrieve user posts',
            error: error.message,
        });
    }
};
