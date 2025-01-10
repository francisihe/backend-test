import express from 'express';
import { healthCheck } from '../controllers/healthController';

const router = express.Router();

router.route('/').get(healthCheck);

export default router;