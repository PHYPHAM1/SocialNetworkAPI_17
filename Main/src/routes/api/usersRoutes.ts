import { Router } from 'express';
const router = Router();
import { createUsers , getUsers , getSingleUser } from '../../controllers/userController';

//api users (post)
router.route('/api/users').get(getUsers).post((createUsers));

//api/users/:id
router.route('/api/users/:id').get(getSingleUser);

