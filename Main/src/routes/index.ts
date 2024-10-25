
import { Router } from 'express';
const router = Router();
import { userRouter } from './api/usersRoutes.js';
import { thoughtRouter } from './api/thoughtRoutes.js'

router.use('/api/users', userRouter);
router.use('/api/thoughts', thoughtRouter);

router.use((_req, res) => {
  return res.send('Wrong route!');
});

export default router;