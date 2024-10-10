import express from 'express';
import { MongoClient, MongoError } from 'mongodb';
import data from './seeds/data.js'; //we want the .js after its been executed
import { User } from './models/user.js';
import { Thought } from './models/thought.js'

//TODOS: ASK BOUT HIS db.. import db from './config/connection.js';  

const app = express();
const PORT = process.env.PORT || 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017`;
//creating a new instance of MongoClient
const client = new MongoClient(connectionStringURI); 
//var that holds out database name
const dbName = 'socialNetworkDB';  
//use connect method to connect to mongo server
await client.connect()
  .catch(err => { console.log(err) });

const db = client.db(dbName);  //client.db, db is a method 

app.use(express.json());

async function seedDB() {
  try {
    // Drops any documents, if they exist
    await db.collection('socialNetwork').deleteMany({}); //{} showing its an empty object
    // Adds data to database
    const res = await db.collection('socialNetwork').insertMany(data);
    console.log(res);
  } catch (err: unknown) {
    const MongoClientError = err as MongoError;

    console.error('Mongo connection error: ', MongoClientError.message);
  }
}

await seedDB();


//post(create) method
app.post('/api/users', async (req, res) => {  //TODOS: create, add a name for routes
  try {
    // Use db connection to add a document
    const results = await db.collection('socialNetwork').insertOne( //insertOne or insertMany
      { username: req.body.username, 
        email: req.body.email,
        thought: req.body.thought,
        friends: req.body.friends }   //TODOS: CHECK THIS...NEED to ADD. name: req.body.name is coming from the payload 
    )   //here name: req.body.name & breed: req.body.breed--> only "name" and "breed" are coming in 
    res.status(201).json(results);
  }
  catch (error) {
    res.status(500).json({ error });
  }
});

//get method
app.get('/api/users', async (_req, res) => {   //TODOS: to name the routes
  try {
   const results = await User
   .aggregate([
    { $match: {_id: true}},
    { $group: {
      Thought: { thoughtText: '$thoughtText'},   //TODOS: correct?, populate thought and friend data
      friends: { friends: '$friends'},
    }},
   ]);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
