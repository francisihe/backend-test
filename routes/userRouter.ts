import express from 'express';
const router = express.Router();

import { validateCreateUser } from '../middleware/validation/validationMiddleware';
import { createUser } from '../controllers/userController';

router.route('/').post(validateCreateUser, createUser);

export default router;