import { Schema, model, Document } from 'mongoose';
import reactionSchema from './reaction';

interface IThought extends Document{
    thoughtText: String;
    createdAt: String;
    username: String;  //the user that created this thought
    reactions: []; //TODOS: objectID?? , ref an array of reactions, nested documents created with the reactionSchema
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {  //reactionBody
            type: String,
            required: true,
            charAt: 280,    
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {  //TODOS: 1. set default, 2. use a getter method to format the timestamp on query
            type: Date,
            default: Date.now,              //set default value to the current timestamp
            get: (timestamp: Date) => {     //use a getter method to format the timestamp on query
                const date = new Date(timestamp);
                return date.toLocaleString();  //format the date as a string
            }, 
        },
        reactions: [reactionSchema],

    });

const Thought = model('Thought', thoughtSchema);  //initialize the Thought model

export default Thought;  //export the Thought model

