import express from 'express';
const router = express.Router();

import { validateCreateUser, validateUserLogin } from '../middleware/validation/validationMiddleware';
import { createUser, loginUser, logoutUser, getUserPosts } from '../controllers/userController';

router.route('/').post(validateCreateUser, createUser);
router.route('/login').post(validateUserLogin, loginUser);
router.route('/logout').get(logoutUser);

router.route('/:userId/posts').get(getUserPosts)

export default router;