import { Schema, Document, ObjectId, Types } from 'mongoose';

export interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt: String;
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId, 
            auto: true},
            // default: new ObjectId();
            //Todo: default, what does this do
        
        reactionBody: {
            type: String,
            required: true,
            charAt: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: Date) => {
                const date = new Date(timestamp);
                return date.toLocaleString();
            },
        },
    },
    {
    toJSON: {
        getters: true,
    },
    id: false,
}
);
// dont need this line, reaction is schema ONLY, per thought model line 30, not backed by their own collection
// const Reaction = model('Reaction', reactionSchema);

export default reactionSchema;