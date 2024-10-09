import { Schema, model, Document, ObjectId } from 'mongoose';

interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt: String;
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId, auto: true},
            // default: () => new ObjectId(),
        
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
    }
);

const Reaction = model('Reaction', reactionSchema);

export default Reaction;