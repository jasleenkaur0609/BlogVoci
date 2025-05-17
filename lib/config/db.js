import mongoose from "mongoose";

export const ConnectDB=async()=>{
    await mongoose.connect('mongodb+srv://jasleensejal2003:Jasleensejal692003@cluster1.mfhsigf.mongodb.net/BlogVoci');
    console.log('Connected to MongoDb');
}