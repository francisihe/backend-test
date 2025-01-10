import express from 'express';
const router = express.Router();

import { verifyUser } from '../middleware/authentication/verifyUser';
import { deleteComment } from '../controllers/commentController';

router.use(verifyUser);
router.route('/:commentId').delete(deleteComment);

export default router;