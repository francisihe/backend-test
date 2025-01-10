import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        });
        return;
    };

    next();

};

export const validateUserLogin = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        });
        return;
    };

    next();

}

export const validateCreatePost = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        content: Joi.string().min(3).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        });
        return;
    };

    next();

}

export const validateGetPosts = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(10),
        username: Joi.string().optional().min(1)
    });

    const { error, value } = schema.validate(req.query);
    if (error) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        });
        return;
    };

    req.query = value;
    next();

}

export const validateGetPostById = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        postId: Joi.number().required()
    });

    const { error } = schema.validate(req.params);
    if (error) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        });
        return;
    };

    next();

}

export const validateUpdatePost = (req: Request, res: Response, next: NextFunction) => {
        
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        content: Joi.string().min(1).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        });
        return;
    };

    next();

}

export const validateAddComment = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        content: Joi.string().min(1).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        });
        return;
    };

    next();

}