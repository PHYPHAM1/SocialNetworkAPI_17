import { Schema, model, Document } from 'mongoose';
import reactionSchema, { IReaction } from './reaction.js';

interface IThought extends Document{
    thoughtText: String;
    createdAt: Schema.Types.Date;
    username: String;  //the user that created this thought
    reactions: IReaction[]; //TODOS: objectID?? , ref an array of reactions, nested documents created with the reactionSchema --Done
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {  //reactionBody
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280   
        },
        username: {    //todo: the user that created this thought??
            type: String,
            required: true,
        },
        createdAt: {  //TODOS: 1. set default, 2. use a getter method to format the timestamp on query
            type: Date,
            default: Date.now,              //set default value to the current timestamp
            get: (timestamp: any) => {     //use a getter method to format the timestamp on query
                const date = new Date(timestamp);
                return date.toLocaleString();  //format the date as a string
            }, 
        },
        reactions: [reactionSchema],  //todo:  check reactionSchema[] 
    },
    {
        toJSON: {
            getters: true
        },
        timestamps: true,
        id: false
    
    });

//create a virtual 'reactionCount' that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount')
.get(function() {return this.reactions.length;});

const Thought = model('Thought', thoughtSchema);  //initialize the Thought model

export default Thought;  //export the Thought model

