import ApiError from "../API/ApiError.js";

const validateSchema = (schema) => (req, res, next) => {
    try {
        if (!schema){
            throw new ApiError(500, "Server Error", "Schema is missing in validation middleware");
        }
        if (!req.body){
            throw new ApiError(400, "Bad Request", "Request body is empty");
        }

        schema.parse(req.body); // This will throw an error if validation fails
        next();
     }catch(error){
        next(new ApiError(400, "Validation Error", error.errors));  // Pass error to handler
    }
};

export default validateSchema;
