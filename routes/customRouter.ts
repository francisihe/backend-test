import express from 'express';
const router = express.Router();

import { runCustomDBQuery } from '../controllers/customController';
import { validateCustomQuery } from '../middleware/validation/validationMiddleware';

router.route('/').post(validateCustomQuery, runCustomDBQuery);

export default router;