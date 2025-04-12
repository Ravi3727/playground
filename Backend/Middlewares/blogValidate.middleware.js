import ApiError from "../API/ApiError.js";

export const validate=(Schema)=>async(req,res,next)=>{
try {
    const parseBody=await Schema.parseAsync(req.body);
    req.validateData=parseBody;
    next();
} catch (error) {
    console.log(error)
   return  res.json(new ApiError("400",error.message))
}
}
