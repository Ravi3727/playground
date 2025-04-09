import { Router } from "express";
import {
  getResources,
  createResource,
  getResource,
  updateResource,
  deleteResource,
  toggleLike,
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../Controllers/resource.controller.js";
import {
  resourceValidationSchema,
  resourceUpdateValidationSchema,
  commentValidationSchema,
} from "../Validations/resource.validation.js";
import validate from "../Middlewares/validate.js";
import { verifyClerkAuth } from "../Middlewares/clerkAuth.js";

const router = Router();

// 1. CRUD operations for resources
router
  .route("/")
  .post(verifyClerkAuth, validate(resourceValidationSchema), createResource) // Create a new resource
  .get(getResources); // Get all resources

router
  .route("/:id")
  .get(getResource) // Get a specific resource by ID
  .put(verifyClerkAuth, validate(resourceUpdateValidationSchema), updateResource) // Update a specific resource by ID
  .delete(verifyClerkAuth, deleteResource); // Delete a specific resource by ID

// 2. Like functionality
router.post("/:id/like", verifyClerkAuth, toggleLike);

// 3. CRUD operations for comments
router
  .route("/:resourceId/comments")
  .post(verifyClerkAuth, validate(commentValidationSchema), createComment) // Create a new comment
  .get(getComments); // Get all comments

router
  .route("/:resourceId/comments/:commentId")
  .put(verifyClerkAuth, validate(commentValidationSchema), updateComment) // Update a comment
  .delete(verifyClerkAuth, deleteComment); // Delete a comment

export default router;
