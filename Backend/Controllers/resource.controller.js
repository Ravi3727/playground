import Resource from "../Models/resource.model.js";
import ApiError from "../API/ApiError.js";
import ApiResponse from "../API/ApiResponse.js";
import Comment from "../Models/resourceComments.model.js";
import User from "../Models/user.model.js";

export const createResource = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return next(new ApiError(400, "User ID is required in request body"));
    }

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return next(new ApiError(404, "User not found"));
    }

    const resource = new Resource({
      ...req.validatedData,
      sharedBy: currentUser._id,
    });

    const savedResource = await resource.save();

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
        new ApiResponse(200, resources, `Found ${resources.length} resources`)
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
    const { userId } = req.body;
    if (!userId) {
      return next(new ApiError(400, "User ID is required in request body"));
    }

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return next(new ApiError(404, "User not found"));
    }

    const resourceId = req.params.id;
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return next(new ApiError(404, "Resource not found"));
    }

    let updateData = req.validatedData;

    const isOwner = resource.sharedBy.toString() === currentUser._id.toString();
    const isAdmin = currentUser.role === "admin";

    if (isOwner) {
      if ("isVerified" in updateData && !isAdmin) {
        delete updateData.isVerified;
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
    const { userId } = req.body;
    if (!userId) {
      return next(new ApiError(400, "User ID is required in request body"));
    }

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return next(new ApiError(404, "User not found"));
    }

    const resourceId = req.params.id;
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return next(new ApiError(404, "Resource not found"));
    }

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
    const { commentId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return next(new ApiError(400, "User ID is required in request body"));
    }

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return next(new ApiError(404, "User not found"));
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new ApiError(404, "Comment not found"));
    }

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
    const { commentId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return next(new ApiError(400, "User ID is required in request body"));
    }

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return next(new ApiError(404, "User not found"));
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new ApiError(404, "Comment not found"));
    }

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
