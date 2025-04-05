import ApiError from "../API/ApiError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.safeParse(req.body);

    if (!validationResult.success) {
      return next(
        new ApiError(
          400,
          `Validation Error: ${validationResult.error.errors
            .map((e) => e.message)
            .join(", ")}`
        )
      );
    }

    // Attach validated data to the request object
    req.validatedData = validationResult.data;
    next();
  };
};

export default validate;
