import { Router } from 'express';
const router = Router();
import { createUser , getUsers , getSingleUser, deleteSingleUser, updateSingleUser } from '../../controllers/userController.js';

//api/users, create a user (post)-DONE
//router.route('/').get(getUsers).post((createUser));
//TODOS: DO I NEED THE  the line above ".get(getUsers)"
router.route('/').post((createUser));

//api/users, get all users -DONE
router.route('/').get(getUsers);  

//api/users/:id, get a single userbyid-DONE
//TODOS: WHAT IS :id  FUNCTION?? when i put /:id into the browser field  in insomnia it does not work
router.route('/:id').get(getSingleUser);

//update user (put) 
//TODOS: how to show the update in Insomnia
router.route('/:id').put(updateSingleUser);

//delete user
//TODOS: do I need to getUsers first b4 deleting???
router.route('/:id').delete(deleteSingleUser);   //removed the .get(getUsers), changed '/delete to /:id'

export { router as userRouter };


//need to use routes instead...and import it to serverts

