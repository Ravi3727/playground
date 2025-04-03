const ApiError = require("../API/ApiError");
const ApiResponse = require("../API/ApiResponse");
const asyncHandler = require("../API/asyncHandler");
const connectDB = require("../DBConfig/dbConnection");
const { Department } = require("../Models/department.model");

exports.postDepartment = asyncHandler( async (req, res) => {
    const departmentData = req.body;
        try{
            await connectDB();
            const departmentRow = await Department.create(departmentData);
            const departmentRowId = departmentRow._id;
    
            return res.status(201).json(new ApiResponse(201, { departmentId: departmentRowId }, 'Department created successfully'));
        }catch(err){
            throw new ApiError(500, `Error Occured while creating department : ${err.message}`);
        }
});

exports.getDepartment = asyncHandler( async (req, res) => {
    try{
        await connectDB();
        const departmentData = await Department.find().select("_id name shortDescription");   
        if(!departmentData) throw new ApiError(404, "No Departments found"); 
        return res.status(200).json(new ApiResponse(200, departmentData , 'Department fetched successfully'));
    }catch(error){
        throw new ApiError(500, `Error Occured while fetching department : ${error.message}`);
    }
});

exports.getDepartmentById = asyncHandler(async (req, res) => {
    try{
        await connectDB();
        const departmentData = await Department.findById(req.params.id)
        .populate({ path: "departmentHead", strictPopulate: false })
        .populate({ path: "departmentCohead", strictPopulate: false });

        if(!departmentData) throw new ApiError(404, "Department Not Found");

        return res.status(200).json(new ApiResponse(200, departmentData, "Department Fetched Successfully"));
    }catch(err){
        throw new ApiError(500, `Error Occured while fetching department : ${err.message}`);
    }
})

exports.updateDepartment = asyncHandler(async (req, res) => {
    try {
        await connectDB();
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