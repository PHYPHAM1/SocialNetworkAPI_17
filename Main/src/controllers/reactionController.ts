import Reaction from '../models/reaction.js';
import User from '../models/user.js';
import { Request, Response } from 'express';

//getting all reaction
export const getReaction = async (_req: Request, res: Response) => {
    try {
        const results = await Reaction.find({});
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({error});
    }
}

//get a single reaction
export const getSingleReaction = async (req: Request, res: Response) => {
    try{
        const reaction = await Reaction.findOne({_id: req.params.ReactionId});
        if(!reaction){
            res.status(404).json({message: 'No reaction with that ID'});
        }else{
            res.json(reaction);
        }
    }catch {
        res.status(500).json(Error);
        
    }
}

//create a reaction
export const createReaction = async (req: Request, res: Response) => {
    try {
      const reaction = await Reaction.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { reaction: reaction._id } },  //TODOS:  WHY DO I NEED TO PUT   reaction._id  this way
        { new: true }
      );

      if (!user) {
         res
          .status(404)
          .json({ message: 'Reaction created, but found no user with that ID' });
      } else {  
        res.json('Created a Reaction');
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }