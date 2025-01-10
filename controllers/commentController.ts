import { Request, Response } from "express";
import Comment from "../models/commentModel";
import Post from "../models/postModel";

export const addComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postId } = req.params;
        const { content } = req.body; 
        const userId = req.user?.id;

        const postIdNumber = Number(postId);
        if (isNaN(postIdNumber)) {
            res.status(400).json({
                status: false,
                message: 'Invalid postId',
            });
            return;
        }

        const post = await Post.findByPk(postId);
        if (!post) {
            res.status(404).json({
                status: false,
                message: 'Post not found',
            });
            return;
        }

        const comment = await Comment.create({ content, postId: postIdNumber, userId });

        res.status(201).json({
            status: true,
            message: "Comment has been created",
            data: comment,
        });
    } catch (error: any) {
        res.status(400).json({
            status: false,
            message: "Unable to create comment",
            error: error.message,
        });
    }
}

export const getCommentsOnPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postId } = req.params;

        const post = await Post.findByPk(postId);
        if (!post) {
            res.status(404).json({
                status: false,
                message: 'Post not found',
            });
            return;
        }

        const comments = await Comment.findAll({
            where: { postId },
        });

        if (!comments.length) {
            res.status(404).json({
                status: false,
                message: "No comments found for this post",
            });
            return;
        }

        res.status(200).json({
            status: true,
            message: 'Comments have been retrieved',
            data: comments
        });
    } catch (error: any) {
        res.status(400).json({
            status: false,
            message: "Unable to retrieve comments",
            error: error.message,
        });
    }
}

export const getCommentsByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const comments = await Comment.findAll({
            where: { userId },
        });

        if (!comments.length) {
            res.status(404).json({
                status: false,
                message: "No comments found for this user",
            });
            return;
        }

        res.status(200).json({
            status: true,
            message: 'User\'s comments have been retrieved',
            data: comments
        });
    } catch (error: any) {
        res.status(400).json({
            status: false,
            message: "Unable to retrieve user comments",
            error: error.message,
        });
    }
}

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { commentId } = req.params;
        const userId = req.user?.id;

        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            res.status(404).json({
                status: false,
                message: 'Comment not found',
            });
            return;
        }

        if (comment.get('userId') !== userId) {
            res.status(403).json({
                status: false,
                message: 'You are not allowed to delete another user\'s comment',
            });
            return;
        }

        await comment.destroy();

        res.status(200).json({
            status: true,
            message: 'Comment has been deleted',
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: 'Unable to delete comment',
            error: error.message,
        });
    }
}