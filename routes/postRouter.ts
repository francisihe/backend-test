import express from 'express';
const router = express.Router();

import { verifyUser } from '../middleware/authentication/verifyUser';

import { validateCreatePost, validateGetPosts, validateGetPostById, validateUpdatePost, validateAddComment } from '../middleware/validation/validationMiddleware';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/postController';

import { addComment, getCommentsOnPost } from '../controllers/commentController';

router.use(verifyUser)

router.route('/').post(validateCreatePost, createPost)
router.route('/').get(validateGetPosts, getPosts);
router.route('/:postId').get(validateGetPostById, getPostById);
router.route('/:postId').patch(validateUpdatePost, updatePost);
router.route('/:postId').delete(deletePost);

router.route('/:postId/comments').post(validateAddComment, addComment)
router.route('/:postId/comments').get(getCommentsOnPost)

export default router;