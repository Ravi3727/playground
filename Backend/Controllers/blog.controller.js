import ApiError from "../API/ApiError.js";
import ApiResponse from "../API/ApiResponse.js";
import blogModel from "../Models/blog.model.js";
import Comment from "../Models/blogCommentModel.js";
import User from "../Models/user.model.js";

// Optional: Async wrapper to reduce try-catch boilerplate
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET: All Blogs
export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await blogModel.find();
  return res.status(200).json(new ApiResponse(200, blogs, "Blogs found"));
});

// GET: Blog by ID
export const findBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await blogModel.findById(id);

  if (!blog) {
    return res.status(404).json(new ApiError(404, "Blog not found"));
  }

  return res.status(200).json(new ApiResponse(200, blog, "Blog found"));
});

// POST: Create Blog
export const createBlog = asyncHandler(async (req, res) => {
 
const {user}=req;
  
  const isVerified = user.role === "admin";
  const newBlog = await blogModel.create({ ...  req.validateData, writer:user._id,isVerified });
  await User.findByIdAndUpdate(user._id, {
    $push: { blogs: newBlog._id }
  });
  return res
    .status(201)
    .json(new ApiResponse(201, newBlog, "Blog created successfully"));
});

// PUT: Edit Blog
export const editBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user?._id;
console.log("vlidates",req.validateData)
  if (!userId) {
    return res.status(401).json(new ApiError(401, "Unauthorized"));
  }

  const blog = await blogModel.findById(id);
  if (!blog) {
    return res.status(404).json(new ApiError(404, "Blog not found"));
  }

  const user = await User.findById(userId);

  let updateData = req.validateData || {}; // ✅ Moved here
  console.log("updateData: ",updateData)

  const isOwner = blog.writer.toString() === userId.toString();
  const isAdmin = user.role === "admin";

  if (isOwner) {
    if (updateData.isVerified && !isAdmin) {
      console.log("isVerified" in updateData );
      
      return next(
        new ApiError(403, "You are not allowed to update the isVerified field.")
      );
    }
  }

  if (!isOwner && !isAdmin) {
    return res.status(403).json(new ApiError(403, "Access denied"));
  }


  const updatedBlog = await blogModel.findOneAndUpdate(
    { _id: id },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});

export const toggleLikeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json(new ApiError(401, "Unauthorized"));
    }

    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json(new ApiError(404, "Blog not found"));
    }

    const isLiked = blog.likedBy.includes(userId);

    if (isLiked) {
      // Unlike
      blog.likedBy.pull(userId);
    } else {
      // Like
      blog.likedBy.push(userId);
    }

    await blog.save();

    return res.status(200).json(new ApiResponse(200, blog, isLiked ? "Unliked blog" : "Liked blog"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Something went wrong"));
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    // Get user ID from the authenticated user
    const userId = req.user._id;

    // Find blog to delete by id
    const blogId = req.params.id;
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return next(new ApiError(404, "blog not found"));
    }

    // Verify if the user is the owner or an admin before deletion
    const isOwner = blog.writer.toString() === userId.toString();
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return next(
        new ApiError(403, "You don't have permission to delete this blog.")
      );
    }

    // Delete the blog from the database
    await blogModel.findByIdAndDelete(blogId);

    // Return deletion confirmation
    return res
      .status(200)
      .json(new ApiResponse(204, {}, "blog deleted successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};


export const createComment = async (req, res, next) => {
  try {
    // Get user ID from the authenticated user
    const userId = req.user._id;

    // Extract blogId from params
    const { blogId } = req.params;

    // Create a new comment including the validated data
    const newComment = new Comment({
      blogId,
      userId: userId,
      ...req.validateData,
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

// Fetch all comments for a specific blog
export const getComments = async (req, res, next) => {
  try {
    // Extract blogId from params
    const { blogId } = req.params;

    // Retrieve comments sorted by latest first
    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });

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
    // Get user ID from the authenticated user
    const userId = req.user._id;

    // Extract commentId from params
    const { commentId } = req.params;

    // Retrieve the comment to update
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new ApiError(404, "Comment not found"));
    }

    // Check if current user is owner or admin
    const isOwner = comment.userId.toString() === userId.toString();
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return next(
        new ApiError(403, "You don't have permission to update this comment.")
      );
    }

    // Update the comment with provided validated data
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      req.validateData,
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
    // Get user ID from the authenticated user
    const userId = req.user._id;

    // Extract commentId from params
    const { commentId } = req.params;

    // Find the comment to delete
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new ApiError(404, "Comment not found"));
    }

    // Check if the current user is allowed to delete (owner or admin)
    const isOwner = comment.userId.toString() === userId.toString();
    const isAdmin = req.user.role === "admin";
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