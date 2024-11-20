import mongoose from "mongoose";

export const connectDB = async(uri) =>{
    try{
        await mongoose.connect(uri)
        console.log("Connected to database")
    }catch(error){
        console.error("Failed to connect to MongoDB", error);
    }
}