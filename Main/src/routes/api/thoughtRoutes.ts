import { Router } from 'express';
import { createThought, getSingleThought, getThought } from '../../controllers/thoughtController';
const router = Router();

router.route('/thought').get(getThought).post(createThought);
router.route('/thought/:thoughtId').get(getSingleThought)

export default router;
