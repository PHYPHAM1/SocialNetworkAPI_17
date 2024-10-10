import mongoose from "mongoose";
//TODOS: ?? connect/create in compass? socialNetworkDB
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB'); 
export default mongoose.connection;

