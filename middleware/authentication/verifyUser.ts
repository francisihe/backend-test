import { verify, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../../types/userTypes';
import { JWT_SECRET } from '../../config/constants';


export const verifyUser = (req: Request, res: Response, next: NextFunction): void => {

    const cookieToken = req.cookies?.token;
    const headerToken = req.headers.authorization?.split(' ')[1];
    const token = cookieToken || headerToken;

    if (!token) {
        res.status(401).json({
            message: 'Unauthorized. No token provided. Please login.'
        });
        return;
    }

    try {
        const decodedToken = verify(token, JWT_SECRET) as IUser | JwtPayload;
        // console.log('Decoded Token', decodedToken);
        req.user = decodedToken;
        // console.log('Request User', req.user);
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token. Please login' });
    }
};