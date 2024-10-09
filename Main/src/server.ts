import express from 'express';
import { MongoClient, MongoError } from 'mongodb';
import data from './seeds/data.js'; //we want the .js after its been executed

const app = express();
const PORT = process.env.PORT || 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017`;

const client = new MongoClient(connectionStringURI); //creating a new instance of MongoClient

const dbName = 'socialNetworkDB';

await client.connect()
  .catch(err => { console.log(err) });

const db = client.db(dbName);  //client.db, db is a method 

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

app.use(express.json());

app.post('/', async (req, res) => {  //TODOS: create, add a name for routes
  try {
    // Use db connection to add a document
    const results = await db.collection('socialNetwork').insertOne( //insertOne or insertMany
      { name: req.body.name, breed: req.body.breed }   //TODOS: NEED to ADD. name: req.body.name is coming from the payload 
    )   //here name: req.body.name & breed: req.body.breed--> only "name" and "breed" are coming in 
    res.status(201).json(results);
  }
  catch (error) {
    res.status(500).json({ error });
  }
});

app.post('/../seed', async (_req, res) => {  //TODOS: add name to seed routes
  try {
    const results = await db.collection('socialNetwork').insertMany(  //insertingMany option
      [
      {  ... },     //TODOS: what are we inserting here...?
      {  ... }
      ]
    )

    // Sends results
    res.status(201).json(results);
  } catch (error) {
    // Handles error
    res.status(500).json({ error });
  }
});

app.get('/', async (_req, res) => {   //TODOS: to name the routes
  try {
    const results = await db.collection('socialNetwork')
      .find({ "username": true })  // TODOS: what do we need to find
      //aggregate methods here if needed
      .toArray()

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
