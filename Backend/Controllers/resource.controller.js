import Resource from "../Models/resource.model.js";
import ApiError from "../API/ApiError.js";
import ApiResponse from "../API/ApiResponse.js";
import Comment from "../Models/resourceComments.model.js";
import User from "../Models/user.model.js";

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
      sharedBy: userId,
    });

    const savedResource = await resource.save();

    // Update user's shared resources list
    currentUser.resources_Shared = currentUser.resources_Shared || [];
    currentUser.resources_Shared.push(savedResource._id);
    await currentUser.save();

    return res
      .status(201)
      .json(
        new ApiResponse(201, savedResource, "Resource created successfully")
      );
  } catch (error) {
    console.error("Error creating resource:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getResources = async (req, res, next) => {
  try {
    const { tag, name } = req.query;
    const filter = {};
    if (tag) filter.tag = tag;
    if (name) filter.title = { $regex: name, $options: "i" };

    const resources = await Resource.find(filter);

    return res
      .status(200)
      .json(
        new ApiResponse(200, resources,`Found ${resources.length} resources`)
      );
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

export const getResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return next(new ApiError(404, "Resource not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, resource, "Resource retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

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
        return next(
          new ApiError(403, "You are not allowed to update the isVerified field.")
        );
      }
    } else if (isAdmin) {
      if (!isOwner) {
        const { isVerified } = updateData;
        updateData = { isVerified };
      }
    } else {
      return next(
        new ApiError(403, "You don't have permission to update this resource.")
      );
    }

    if (Object.keys(updateData).length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, resource, "No fields to update"));
    }

    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      updateData,
      { new: true, runValidators: true }
    );

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedResource, "Resource updated successfully")
      );
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

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

    await Resource.findByIdAndDelete(resourceId);

    return res
      .status(200)
      .json(new ApiResponse(204, {}, "Resource deleted successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

export const toggleLike = async (req, res, next) => {
  try {
    // Extract userId from the request body
    const { userId } = req.body;
    if (!userId) {
      return next(new ApiError(400, "User ID is required in request body"));
    }

    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return next(new ApiError(404, "Resource not found"));
    }

    const index = resource.likedBy.indexOf(userId);
    if (index > -1) {
      resource.likedBy.splice(index, 1);
    } else {
      resource.likedBy.push(userId);
    }

    await resource.save();

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

export const createComment = async (req, res, next) => {
  try {
    // Extract resourceId from params and userId from request body
    const { resourceId } = req.params;
    const { userId } = req.body;
    if (!userId) {
      return next(new ApiError(400, "User ID is required in request body"));
    }

    const newComment = new Comment({
      resourceId,
      userId: userId,
      ...req.validatedData,
    });

    await newComment.save();

    return res
      .status(201)
      .json(new ApiResponse(201, newComment, "Comment created successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { resourceId } = req.params;

    const comments = await Comment.find({ resourceId }).sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, comments, "Comments retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

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

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      req.validatedData,
      { new: true, runValidators: true }
    );

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedComment, "Comment updated successfully")
      );
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

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

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    return res
      .status(200)
      .json(new ApiResponse(200, deletedComment, "Comment deleted successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};