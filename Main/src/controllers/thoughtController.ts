import { Thought } from '../models/thought';
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

