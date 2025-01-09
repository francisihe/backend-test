import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
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
        body: Joi.string().min(1).required(),
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
