import { Request, Response } from "express";
import Post from "../models/postModel";
import User from "../models/userModel";
import { IUser } from "../types/userTypes";

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {

        const userId = req.user?.id;
        console.log('User ID in create post', userId);
        const { title, content } = req.body;

        const post = await Post.create({ title, content, userId });

        res.status(201).json({
            status: true,
            message: "Post has been created",
            data: post,
        });
    } catch (error: any) {
        res.status(400).json({
            status: false,
            message: "Unable to create post",
            error: error.message,
        });
    }
};

export const getPosts = async (req: Request, res: Response): Promise<void> => {
    try {

        const { page = 1, limit = 10, username } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        let where: any = {};

        // If username is provided, get the user's ID
        if (username) {
            const username = Array.isArray(req.query.username) ? req.query.username[0] : req.query.username;
            const user = await User.findOne({ where: { username } }) as unknown as IUser;

            if (!user) {
                res.status(404).json({
                    status: false,
                    message: `User with username "${username}" not found`,
                });
                return;
            }
            where.userId = user.id;
        }

        const posts = await Post.findAll({
            where,
            limit: Number(limit),
            offset,
        });

        const totalPosts = await Post.count({ where });

        res.status(200).json({
            status: true,
            message: "Posts have been retrieved",
            data: posts,
            meta: {
                total: totalPosts,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(totalPosts / Number(limit)),
            },
        });
    } catch (error: any) {
        res.status(400).json({
            status: false,
            message: "Unable to retrieve posts",
            error: error.message,
        });
    }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postId } = req.params;

        if (!postId) {
            res.status(400).json({
                status: false,
                message: "Post ID is required",
            });
            return;
        }

        const post = await Post.findByPk(postId);

        if (!post) {
            res.status(404).json({
                status: false,
                message: "Post not found",
            });
            return;
        }

        res.status(200).json({
            status: true,
            message: "Post has been retrieved",
            data: post,
        });
    } catch (error: any) {
        res.status(400).json({
            status: false,
            message: "Unable to retrieve post",
            error: error.message,
        });
    }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postId } = req.params;
        const userId = req.user?.id;
        const { title, content } = req.body;

        const post = await Post.findByPk(postId);

        if (!post) {
            res.status(404).json({
                status: false,
                message: "Post not found",
            });
            return;
        }

        await post.update({ title, content, userId });

        res.status(200).json({
            status: true,
            message: "Post has been updated",
            data: post,
        });
    } catch (error: any) {
        res.status(400).json({
            status: false,
            message: "Unable to update post",
            error: error.message,
        });
    }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postId } = req.params;

        const post = await Post.findByPk(postId);

        if (!post) {
            res.status(404).json({
                status: false,
                message: "Post not found",
            });
            return;
        }

        await post.destroy();

        res.status(200).json({
            status: true,
            message: "Post has been deleted",
        });
    } catch (error: any) {
        res.status(400).json({
            status: false,
            message: "Unable to delete post",
            error: error.message,
        });
    }
}