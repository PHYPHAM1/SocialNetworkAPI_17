import express from 'express';
// import { MongoClient } from 'mongodb';
import db from './config/connection.js';
import routes from './routes/index.js';

await db();

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(routes); //just added

//TODOS: 1. i have 1 in api user routes  2. do i need .app.post routes in here as well???  A: need just one
// 

//post(create) method 
// app.post('/api/users', async (req, res) => {  //TODOS: create, add a name for routes
//   try {
//     // Use db connection to add a document
    
//     const results = await db.collection('socialNetwork').insertOne( //insertOne or insertMany
//         { username: req.body.username, 
//         email: req.body.email,
//         thought: req.body.thought,
//         friends: req.body.friends }   //TODOS: CHECK THIS...NEED to ADD. name: req.body.name is coming from the payload 
//     )   //here name: req.body.name & breed: req.body.breed--> only "name" and "breed" are coming in 
//     res.status(201).json(results);
//   }
//   catch (error) {
//     res.status(500).json({ error });
//   }
// });
    
// get method

// app.get('/api/users', async (_req, res) => {   //TODOS: to name the routes
//   try {
//    const results = await db.collection('socialNetwork')
//    .find({})
//    .toArray()

//     res.status(200).json(results);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });


//delete a user by id, need to convert string id paramenter to an OjectId
// app.delete('/api/users/:id', async (req, res)=>{
//   try {
//     const userId = new ObjectId(req.params.id);
//     const results = await db.collection('socialNetwork').deleteOne({_id: userId});

//     res.send(results.deletedCount? 'User deleted' : 'No User Found!');
//   } catch (error) {
//     res.status(500).json({error});
//   }
// });


app.listen(PORT, () => {
  // app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  // });
});