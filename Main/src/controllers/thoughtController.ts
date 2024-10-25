import Thought from '../models/thought.js';
import { Request, Response } from 'express';


//getting all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const results = await Thought.find({});
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({error});
    }
}
//get a single thought by id
export const getSingleThought = async (req: Request, res: Response) => {
    try{
        const thought = await Thought.findById(req.params.id); //TODOS: NEED TOFIND OUT .id  WHERE IS COMING FROM??
        if(!thought){
            res.status(404).json({message: 'No thought with that ID'});
        }else{
            res.json(thought);
        }
    }catch {
        res.status(500).json(Error);
        
    }
}
//create(post) a thought
//TODOS: NEED..PUSH CREATED THOUGHT'S ID TO THE ASSOCCIATED USER'S THOUGHT ARRAY FIELD???
export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create(
        {
            thoughtText: req.body.thoughtText,
            username: req.body.username
            //reaction[]? 
        }
      )
        res.status(201).json(thought);
    } catch (error) {
      res.status(500).json({error});
    }
  }
//update(put) a thought by its _id
//TODOS: CHECK WITH findById for updating thought
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate
        ({ _id: req.params.id},   //todo: ask about .id here. how/what/where i get it from. do I name it?? id of thoughts? how does it know
        { $addToset: {reactions: req.body} },  //pushing the whole request body onto responses, must be like the schema of 
        { runValidators: true, new: true} //todo: what does this line mean?
        );
        if(!thought){
            res.status(404).json({error: 'Thought not found by this id'});
        }
        res.json(thought);
        return;

    } catch (error) {
        res.status(500).json({error});
        return;
    }
}
//delete a single thought by its _id
//TODOS: cannot delete thought, How to in insomnia
export const deleteThought = async (req:Request, res: Response) => {
    try {
        const results = await Thought.findById(req.params.id);  //TODOS: .id ??? where .id comfing from
        if(results){
            await Thought.deleteOne({_id: req.params.id});  //added _id:req.params.id
            res.json({message: 'Thought deleted'});
        }else{
            res.status(404).json({message: 'Thought not found with this id'})
        }
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

// reaction methods, Need Post and Delete
//add reaction to thoughts, $addToSet is a mongodb operator
//todo: POST to create a reaction stored in a single thought's reactions array field?
export const addReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id}, //todo: does it need to be thoughtId or can it be just id?  thougthId wasn't named anywhere
        { $addToSet: {reactions: req.body}},//adding the entire body of reaction rather than the ID
        { runValidators: true, new: true}  //todo: what does this mean?
      );

      if (!thought) {
         res
          .status(404)
          .json({ message: 'Reaction created, but found no user with that ID' });
      } else {  
        res.json(thought);
        return;
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

//delete reaction by id
export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate({_id: req.params.id},
         { $pull: {reactions: {reactionId: req.params.reactionId}}},
         {runValidators: true, new: true}
        );
        if(!thought){
            return res.status(404).json({message: 'No reaction with this id'});
        }
        res.json(thought);
        return;
    } catch (error) {
        res.status(500).json(error);
        return;
    }
}







// export const getReaction = async (_req: Request, res: Response) => {
//     try {
//         const results = await Reaction.find();
//         res.status(200).json(results);
//     } catch (error) {
//         res.status(500).json({error});
//     }
// }

//get a single reaction
// export const getSingleReaction = async (req: Request, res: Response) => {
//     try{
//         const reaction = await Reaction.findOne({_id: req.params.ReactionId});
//         if(!reaction){
//             res.status(404).json({message: 'No reaction with that ID'});
//         }else{
//             res.json(reaction);
//         }
//     }catch {
//         res.status(500).json(Error);
        
//     }
// }


