import { createBlog, createComment, deleteBlog, deleteComment, editBlog, findBlogById, getAllBlogs, getComments, toggleLikeBlog, updateComment } from "../Controllers/blog.controller.js";
import express from "express";
import { validate } from "../Middlewares/blogValidate.middleware.js";
import { blogschema, commentValidationSchema } from "../Validations/blog.validation.js";
import { verifyClerkAuth } from "../Middlewares/clerkAuth.js";

const router = express.Router();

router.post("/", verifyClerkAuth, validate(blogschema), createBlog)
router.get("/find/:id", findBlogById)
router.get("/", getAllBlogs)
router.put("/:id", verifyClerkAuth,validate(blogschema), editBlog)
router.delete("/:id",
    verifyClerkAuth,
    deleteBlog
);
router.post("/:blogId/like", verifyClerkAuth, toggleLikeBlog);
router.post("/:blogId/comments",
    verifyClerkAuth,
    validate(commentValidationSchema),
    createComment
);
router.put("/:blogId/comments/:commentId",
    verifyClerkAuth,
    validate(commentValidationSchema),
    updateComment
);
router.delete("/:blogId/comments/:commentId",
    verifyClerkAuth,
    deleteComment
);
router.get("/:blogId/comments",verifyClerkAuth,getComments);
export default router;