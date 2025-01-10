import express from 'express';
const router = express.Router();

import { seedDatabase } from '../controllers/seedController';

router.route('/').post(seedDatabase);

export default router;