import express from 'express';
const router = express.Router();

import { validateCreateUser, validateUserLogin } from '../middleware/validation/validationMiddleware';
import { createUser, loginUser, logoutUser } from '../controllers/userController';

router.route('/').post(validateCreateUser, createUser);
router.route('/login').post(validateUserLogin, loginUser);
router.route('/logout').get(logoutUser);

export default router;