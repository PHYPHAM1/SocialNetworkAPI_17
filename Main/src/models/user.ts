import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[];  
    friends: ObjectId[];   
}

const userSchema = new Schema<IUser>(
    {  //object 1
    username: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    thoughts: [
        {    //Array of _id values referencing the Thought model
            type: Schema.Types.ObjectId, 
            ref: 'Thought' 
        },
        ],

    friends: [  //Array of _id values referencing the User model (self-reference)???  ASK ABOUT THIS
        {   
            type: Schema.Types.ObjectId, 
            ref: 'User' 
        },
        ],
    },
    {   //object 2
        toJSON: {
            virtuals: true,
        }
    }
);

//create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function(this: any) {
    return this.friends;
})
.set(function(this: any) {
    return this.friends.length;
});

//initialize the User model
const User = model('User', userSchema);

export default User;