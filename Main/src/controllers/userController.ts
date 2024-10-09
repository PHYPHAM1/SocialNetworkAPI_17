import { User } from '../models';   //TODOS: ??? .js or not?
import { Request, Response } from 'express';

//getting all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const results = await User.find({});
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error });
    }
}
//get a single user
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const results = await User.findById(req.params.id);
        res.status(200).json(results);
    }catch (error) {
        res.status(500).json({ error });
    }
}

//creating a new user (post)
export const createUsers = async (req: Request, res: Response) => {
    try {
        const results = await User.create(req.body);
        res.status(201).json(results);
    } catch (error) {
        res.status(500).json({ error });
    }
}


