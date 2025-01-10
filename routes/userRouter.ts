import express from 'express';
const router = express.Router();

import { validateCreateUser, validateGetUserComments, validateUserLogin } from '../middleware/validation/validationMiddleware';
import { createUser, loginUser, logoutUser, getUserPosts } from '../controllers/userController';
import { getCommentsByUser } from '../controllers/commentController';

router.route('/').post(validateCreateUser, createUser);
router.route('/login').post(validateUserLogin, loginUser);
router.route('/logout').get(logoutUser);

router.route('/:userId/posts').get(getUserPosts)
router.route('/:userId/comments').get(validateGetUserComments, getCommentsByUser)

export default router;