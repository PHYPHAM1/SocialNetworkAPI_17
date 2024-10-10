import Thought from '../models/thought.js';
import User from '../models/user.js';
import { Request, Response } from 'express';

//getting all thoughts
export const getThought = async (_req: Request, res: Response) => {
    try {
        const results = await Thought.find({});
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({error});
    }
}

//get a single thought
export const getSingleThought = async (req: Request, res: Response) => {
    try{
        const thought = await Thought.findOne({_id: req.params.thoughtId});
        if(!thought){
            res.status(404).json({message: 'No thought with that ID'});
        }else{
            res.json(thought);
        }
    }catch {
        res.status(500).json(Error);
        
    }
}

//create a thought
export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thought: thought._id } },
        { new: true }
      );

      if (!user) {
         res
          .status(404)
          .json({ message: 'Thought created, but found no user with that ID' });
      } else {  
        res.json('Created a thought');
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }