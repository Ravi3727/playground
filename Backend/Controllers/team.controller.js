import ApiError from "../API/ApiError.js";
import ApiResponse from "../API/ApiResponse.js";
import asyncHandler from "../API/asyncHandler.js";
import User from "../Models/user.model.js";

export const getTeam = asyncHandler( async (req, res) => {
    try{
        const teamData = await User.find()
        .populate({path : "department", strictPopulate : false})
        .select("_id name designation department photo socialMediaHandles");   

        if(!teamData) throw new ApiError(404, "No Member found"); 
        return res.status(200).json(new ApiResponse(200, teamData , 'Team members fetched successfully'));
    }catch(error){
        throw new ApiError(500, `Error Occured while fetching Team members : ${error.message}`);
    }
});
