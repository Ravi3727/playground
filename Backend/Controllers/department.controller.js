import ApiError from "../API/ApiError.js";
import ApiResponse from "../API/ApiResponse.js";
import asyncHandler from "../API/asyncHandler.js";
import connectDB from "../DBConfig/dbConnection.js";
import Department from "../Models/department.model.js";

export const postDepartment = asyncHandler( async (req, res) => {
    const departmentData = req.body;
        try{
            const departmentRow = await Department.create(departmentData);
            const departmentRowId = departmentRow._id;
    
            return res.status(201).json(new ApiResponse(201, { departmentId: departmentRowId }, 'Department created successfully'));
        }catch(err){
            throw new ApiError(500, `Error Occured while creating department : ${err.message}`);
        }
});

export const getDepartment = asyncHandler( async (req, res) => {
    try{
        const departmentData = await Department.find().select("_id name shortDescription");   
        if(!departmentData) throw new ApiError(404, "No Departments found"); 
        return res.status(200).json(new ApiResponse(200, departmentData , 'Department fetched successfully'));
    }catch(error){
        throw new ApiError(500, `Error Occured while fetching department : ${error.message}`);
    }
});

export const getDepartmentById = asyncHandler(async (req, res) => {
    try{
        const departmentData = await Department.findById(req.params.id)
        .populate({ path: "departmentHead", strictPopulate: false })
        .populate({ path: "departmentCohead", strictPopulate: false });

        if(!departmentData) throw new ApiError(404, "Department Not Found");

        return res.status(200).json(new ApiResponse(200, departmentData, "Department Fetched Successfully"));
    }catch(err){
        throw new ApiError(500, `Error Occured while fetching department : ${err.message}`);
    }
})

export const updateDepartment = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Ensure that empty values are not stored
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === "") delete updateData[key];
        });

        const updatedDepartment = await Department.findByIdAndUpdate(id, updateData, { 
            new: true, // So that new document will be stored in updatedDocument
            runValidators: true // So mongoDB follows schema validations
        })
        .populate({ path: "departmentHead", strictPopulate: false })
        .populate({ path: "departmentCohead", strictPopulate: false });

        if (!updatedDepartment) throw new ApiError(404, "Department Not Found");

        return res.status(200).json(new ApiResponse(200, updatedDepartment, "Department Updated Successfully"));


    }catch(err){
        throw new ApiError(500, `Error Occured while updating Department : ${err.message}`);
    }
})