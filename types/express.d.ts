import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './userTypes'; 

declare global {
    namespace Express {
        interface Request {
            user?: IUser | JwtPayload;
        }
    }
}
