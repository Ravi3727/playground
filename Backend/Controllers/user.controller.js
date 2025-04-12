import ApiError from "../API/ApiError.js";
import asyncHandler from "../API/asyncHandler.js";
import User from "../Models/user.model.js";

export const signUp = async(req,res)=>{
    const user = req.body;
    // console.log(user);
    if(!user.clerk_id || !user.email || !user.fullName || !user.role){
        return res.status(400).json({success: false, message: "All fields are required"});
    }
    
    try{
        const existingUser = await User.findOne({clerk_id: user.clerk_id});
        if(existingUser){
            return res.status(200).json({success: true, message: "User already registered"});
        }

        const newUser = new User(user);
        await newUser.save();

        res.status(201).json({success: true, message: "User successfully registered!"});
    }catch(error){
        console.error("Error in saving user data: ", error.message);
        res.status(500).json({success: false, message: "An error occurred"});
    }
}

export const getUser = asyncHandler(async (req, res) => {
    try {
      const user = await User.find();
      res
        .status(200)
        .json(new ApiResponse(200, user, "users fetched successfully"));
    } catch (error) {
        res
        .status(500)
        .json(new ApiError(500, "Error while fetching the users", error));
    }
  });