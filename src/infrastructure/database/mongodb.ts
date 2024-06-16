import mongoose from "mongoose";
import config from "../config";

export const connectToDatabase = async () =>{
    try {
        await mongoose.connect(config.dbUri);
        console.log("Connect to database");
    } catch (error) {
        console.error("Error connecting MongoDB", error);
    }
}