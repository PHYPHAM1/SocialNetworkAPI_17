import { Router } from 'express';
const router = Router();
import { createUsers , getUsers , getSingleUser } from '../../controllers/userController';

//api users, get all users, and  create a user (post)
router.route('/api/users').get(getUsers).post((createUsers));  
//TODOS: DO I NEED THIS?? IF I ALREADY HAVE  app.post, app.get routes for users in server.ts

//api/users/:id, get a single user
router.route('/api/user/:id').get(getSingleUser);

export default router;