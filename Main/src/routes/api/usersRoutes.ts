import { Router } from 'express';
const router = Router();
import { createUsers , getUsers , getSingleUser } from '../../controllers/userController';

// //get all users
// router.route('/api/users').get(getUsers).post()

//api users, get all users, and  create a user (post)
router.route('/api/users').get(getUsers).post((createUsers));

//api/users/:id, get a single user
router.route('/api/user/:id').get(getSingleUser);

export default router;
