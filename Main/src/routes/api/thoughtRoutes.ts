import { Router } from 'express';
import { createThought, getSingleThought, getThoughts, updateThought, deleteThought, addReaction, deleteReaction } from '../../controllers/thoughtController.js';
const router = Router();

//create(post) a thought - DONE
router.route('/').post(createThought);

//get all thoughts
//TODOS: NOT getting thoughts only 
router.route('/').get(getThoughts)

//get a single thought //TODOS: WHY DO YOU NEED THE " : " FOR id or for thoughtId
router.route('/:id').get(getSingleThought)

//update(put) a thought by its _id
//TODOS: how to show the update in Insomnia
router.route('/:id').put(updateThought);

//delete a thought by its _id
//TODOS: do I need to getThoughts first b4 deleting???
router.route('/:id').delete(deleteThought);



//reaction route?
//created(post) a reaction 
router.route('/:id/reactions')
.post(addReaction)

//delete reaction
router.route('/:id/reactions/:reactionId')
.delete(deleteReaction);

export { router as thoughtRouter };
