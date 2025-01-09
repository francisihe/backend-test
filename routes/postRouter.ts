import express from 'express';
const router = express.Router();

import { verifyUser } from '../middleware/authentication/verifyUser';

import { validateCreatePost, validateGetPosts, validateGetPostById, validateUpdatePost } from '../middleware/validation/validationMiddleware';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/postController';


router.use(verifyUser)

router.route('/').post(validateCreatePost, createPost)
router.route('/').get(validateGetPosts, getPosts);
router.route('/:postId').get(validateGetPostById, getPostById);
router.route('/:postId').patch(validateUpdatePost, updatePost);
router.route('/:postId').delete(deletePost);

export default router;