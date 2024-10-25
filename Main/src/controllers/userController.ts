import User  from '../models/user.js';   
import { Request, Response } from 'express';


//creating a new user (post)
export const createUser = async (req: Request, res: Response) => {
    try {
        const results = await User.create(
            {username: req.body.username, 
            email: req.body.email,
            thought: req.body.thought,
            friends: req.body.friends }
        );
        
        res.status(201).json(results);
    } catch (error) {
        res.status(500).json({ error });
    }
}

//getting all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const results = await User.find({});
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error });
    }
}
//get a single user by id
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const results = await User.findById(req.params.id);    //TODOS:  CHECK req.params.id  ,this belongs to ??  
        res.status(200).json(results);
    }catch (error) {
        res.status(500).json({ error });
    }
}
//update user by id
//TODOS: HOW TO DO UPDATE in insomnia
export const updateSingleUser = async (req: Request, res: Response) => {
    try {
        const results = await User.findById(req.params.id);
        if(results){
            await User.updateOne(req.body);  //pass req.body into updateOne
            res.status(200).json(results);
        }else{
            res.status(404).json({error: 'User not found by this id'});
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

//delete single user
export const deleteSingleUser = async (req: Request, res: Response) => {
    try {
        const results = await User.findById(req.params.id);
        if(results) {
            await User.deleteOne({ _id: req.params.id }); //passing in the object id, to deleteOne
            res.json({message: 'User deleted'});
        }else {
            res.status(404).json({message: 'User not found'})
        }
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}



