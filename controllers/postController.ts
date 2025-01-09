import { Request, Response } from "express";
import Post from "../models/postModel";

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {

        const userId = req.user?.id;
        const { body } = req.body;

        const post = await Post.create({ body, userId });

        res.status(201).json({
            status: true,
            message: "Post has been created",
            data: { post },
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
        const posts = await Post.findAll();

        res.status(200).json({
            status: true,
            message: "Posts have been retrieved",
            data: posts
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
        const { body } = req.body;

        const post = await Post.findByPk(postId);

        if (!post) {
            res.status(404).json({
                status: false,
                message: "Post not found",
            });
            return;
        }

        await post.update({ body, userId });

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