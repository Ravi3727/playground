import Resource from "../Models/resource.model.js";
import ApiError from "../API/ApiError.js";
import ApiResponse from "../API/ApiResponse.js";
import Comment from "../Models/resourceComments.model.js";
import User from "../Models/user.model.js";

// RESOURCE CRUD OPERATIONS

// Create a new resource
export const createResource = async (req, res, next) => {
  try {
    // Extract userId from request body
    const { userId } = req.body;
    if (!userId) {
      // Validate presence of userId
      return next(new ApiError(400, "User ID is required in request body"));
    }

    // Retrieve the user by ID
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      // User not found error
      return next(new ApiError(404, "User not found"));
    }

    // Create a resource using validated data and associate it with the user
    const resource = new Resource({
      ...req.validatedData,
      sharedBy: currentUser._id,
    });

    // Save the new resource
    const savedResource = await resource.save();

    // Update user's shared resources list
    currentUser.resources_Shared = currentUser.resources_Shared || [];
    currentUser.resources_Shared.push(savedResource._id);
    await currentUser.save();

    // Return successful creation response
    return res
      .status(201)
      .json(
        new ApiResponse(201, savedResource, "Resource created successfully")
      );
  } catch (error) {
    // Handle any errors thrown during the process
    return next(new ApiError(500, error.message));
  }
};

// Get all resources or search by name
export const getResources = async (req, res, next) => {
  try {
    // Build query filter from request query
    const { tag, name } = req.query;
    const filter = {};

    if (tag) filter.tag = tag;
    if (name) filter.title = { $regex: name, $options: "i" };

    // Retrieve resources matching the filter
    const resources = await Resource.find(filter);

    return res
      .status(200)
      .json(
        new ApiResponse(200, resources, `Found ${resources.length} resources`)
      );
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

// Get a single resource by ID
export const getResource = async (req, res, next) => {
  try {
    // Find resource by id from request params
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return next(new ApiError(404, "Resource not found"));
    }

    // Return the found resource
    return res
      .status(200)
      .json(new ApiResponse(200, resource, "Resource retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

// Update a resource
export const updateResource = async (req, res, next) => {
  try {
    // Extract userId from request body
    const { userId } = req.body;
    if (!userId) {
      return next(new ApiError(400, "User ID is required in request body"));
    }

    // Find current user
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return next(new ApiError(404, "User not found"));
    }

    // Find resource to update by id
    const resourceId = req.params.id;
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return next(new ApiError(404, "Resource not found"));
    }

    // Prepare update data from validated request data
    let updateData = req.validatedData;

    // Determine if current user is the owner or an admin
    const isOwner = resource.sharedBy.toString() === currentUser._id.toString();
    const isAdmin = currentUser.role === "admin";

    if (isOwner) {
      // Only admin can update isVerified field when owner is updating
      if ("isVerified" in updateData && !isAdmin) {
        delete updateData.isVerified;
      }
    } else if (isAdmin) {
      // Admin can only update isVerified for non-owners
      if (!isOwner) {
        const { isVerified } = updateData;
        updateData = { isVerified };
      }
    } else {
      // Neither owner nor admin: deny update
      return next(
        new ApiError(403, "You don't have permission to update this resource.")
      );
    }

    // Check if there's any field to update
    if (Object.keys(updateData).length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, resource, "No fields to update"));
    }

    // Update the resource with new data and run validations
    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      updateData,
      { new: true, runValidators: true }
    );

    // Return updated resource response
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedResource, "Resource updated successfully")
      );
  } catch (error) {
    // Handle errors
    return next(new ApiError(500, error.message));
  }
};

// Delete a resource
export const deleteResource = async (req, res, next) => {
  try {
    // Extract userId from request body
    const { userId } = req.body;
    if (!userId) {
      return next(new ApiError(400, "User ID is required in request body"));
    }

    // Retrieve current user using provided userId
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return next(new ApiError(404, "User not found"));
    }

    // Find resource to delete by id
    const resourceId = req.params.id;
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return next(new ApiError(404, "Resource not found"));
    }

    // Verify if the user is the owner or an admin before deletion
    const isOwner = resource.sharedBy.toString() === currentUser._id.toString();
    const isAdmin = currentUser.role === "admin";
    if (!isOwner && !isAdmin) {
      return next(
        new ApiError(403, "You don't have permission to delete this resource.")
      );
    }

    // Delete the resource from the database
    await Resource.findByIdAndDelete(resourceId);

    // Return deletion confirmation
    return res
      .status(200)
      .json(new ApiResponse(204, {}, "Resource deleted successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

// LIKE FUNCTIONALITY

// Toggle the like status on a resource
export const toggleLike = async (req, res, next) => {
  try {
    // Extract userId from the request body
    const { userId } = req.body;
    if (!userId) {
      return next(new ApiError(400, "User ID is required in request body"));
    }

    // Find resource by id
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return next(new ApiError(404, "Resource not found"));
    }

    // Check if user already liked the resource
    const index = resource.likedBy.indexOf(userId);
    if (index > -1) {
      // If yes, remove the like
      resource.likedBy.splice(index, 1);
    } else {
      // Otherwise, add the like
      resource.likedBy.push(userId);
    }

    // Save the resource's updated like list
    await resource.save();

    // Return updated like information
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          likes: resource.likedBy.length,
          likedByUser: resource.likedBy.includes(userId),
        },
        "Toggle like successful"
      )
    );
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

// COMMENT CRUD OPERATIONS

// Create a new comment for a resource
export const createComment = async (req, res, next) => {
  try {
    // Extract resourceId from params and userId from request body
    const { resourceId } = req.params;
    const { userId } = req.body;
    if (!userId) {
      return next(new ApiError(400, "User ID is required in request body"));
    }

    // Create a new comment including the validated data
    const newComment = new Comment({
      resourceId,
      userId: userId,
      ...req.validatedData,
    });

    // Save the comment
    await newComment.save();

    // Return response for successful comment creation
    return res
      .status(201)
      .json(new ApiResponse(201, newComment, "Comment created successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

// Fetch all comments for a specific resource
export const getComments = async (req, res, next) => {
  try {
    // Extract resourceId from params
    const { resourceId } = req.params;

    // Retrieve comments sorted by latest first
    const comments = await Comment.find({ resourceId }).sort({ createdAt: -1 });

    // Return response with comments list
    return res
      .status(200)
      .json(new ApiResponse(200, comments, "Comments retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

// Update a comment
export const updateComment = async (req, res, next) => {
  try {
    // Extract commentId from params and userId from request body
    const { commentId } = req.params;
    const { userId } = req.body;
    if (!userId) {
      return next(new ApiError(400, "User ID is required in request body"));
    }

    // Validate that user exists
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return next(new ApiError(404, "User not found"));
    }

    // Retrieve the comment to update
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new ApiError(404, "Comment not found"));
    }

    // Check if current user is owner or admin
    const isOwner = comment.userId === userId;
    const isAdmin = currentUser.role === "admin";
    if (!isOwner && !isAdmin) {
      return next(
        new ApiError(403, "You don't have permission to update this comment.")
      );
    }

    // Update the comment with provided validated data
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      req.validatedData,
      { new: true, runValidators: true }
    );

    // Return updated comment response
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedComment, "Comment updated successfully")
      );
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

// Delete a comment
export const deleteComment = async (req, res, next) => {
  try {
    // Extract commentId from params and userId from request body
    const { commentId } = req.params;
    const { userId } = req.body;
    if (!userId) {
      return next(new ApiError(400, "User ID is required in request body"));
    }

    // Validate the existence of the user
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return next(new ApiError(404, "User not found"));
    }

    // Find the comment to delete
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new ApiError(404, "Comment not found"));
    }

    // Check if the current user is allowed to delete (owner or admin)
    const isOwner = comment.userId === userId;
    const isAdmin = currentUser.role === "admin";
    if (!isOwner && !isAdmin) {
      return next(
        new ApiError(403, "You don't have permission to delete this comment.")
      );
    }

    // Delete the comment from the database
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    // Return deletion response
    return res
      .status(200)
      .json(
        new ApiResponse(200, deletedComment, "Comment deleted successfully")
      );
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};
