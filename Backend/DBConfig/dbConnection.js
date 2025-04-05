import mongoose from "mongoose";
import dotenv from "dotenv";
import ApiError from "../API/ApiError.js";

dotenv.config();

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGODB_URI);
  }catch(error){
    throw new ApiError(500, `Database Connection Failed: ${error.message}`);
  }
};

export default connectDB;
