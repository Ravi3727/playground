const ApiError = require("../API/ApiError");
const ApiResponse = require("../API/ApiResponse");
const asyncHandler = require("../API/asyncHandler");
const connectDB = require("../DBConfig/dbConnection");
const { User } = require("../Models/user.model");

exports.getTeam = asyncHandler( async (req, res) => {
    try{
        await connectDB();
        const teamData = await User.find()
        .populate({path : "department", strictPopulate : false})
        .select("_id name designation department photo socialMediaHandles");   

        if(!teamData) throw new ApiError(404, "No Member found"); 
        return res.status(200).json(new ApiResponse(200, teamData , 'Team members fetched successfully'));
    }catch(error){
        throw new ApiError(500, `Error Occured while fetching Team members : ${error.message}`);
    }
});
