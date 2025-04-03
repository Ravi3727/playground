const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ApiError = require("../API/ApiError");

dotenv.config();

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGODB_URI);
  }catch(error){
    throw new ApiError(500, `Database Connection Failed: ${error.message}`);
  }
};

module.exports = connectDB;
