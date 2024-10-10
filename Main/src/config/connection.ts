import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB'); //TODOS: ?? connect/create in compass? socialNetworkDB

export default mongoose.connection;

