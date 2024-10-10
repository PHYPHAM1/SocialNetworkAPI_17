import { Router } from 'express';
import { createReaction, getSingleReaction, getReaction } from '../../controllers/reactionController.js';
const router = Router();

router.route('/reaction').get(getReaction).post(createReaction);
router.route('/reaction/:reactionId').get(getSingleReaction)

export default router;