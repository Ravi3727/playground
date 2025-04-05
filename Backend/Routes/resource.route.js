import express from "express";

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

const router = express.Router();

// 1. CRUD operations for resources
router
  .route("/")
  .post(validate(resourceValidationSchema), createResource) // Create a new resource
  .get(getResources); // Get all resources

router
  .route("/:id")
  .get(getResource) // Get a specific resource by ID
  .put(validate(resourceUpdateValidationSchema), updateResource) // Update a specific resource by ID
  .delete(deleteResource); // Delete a specific resource by ID

// 2. Like functionality
router.post("/:id/like", toggleLike);

// 3. CRUD operations for comments
router
  .route("/:resourceId/comments")
  .post(validate(commentValidationSchema), createComment) // Create a new comment
  .get(getComments); // Get all comments
  
router
  .route("/:resourceId/comments/:commentId")
  .put(validate(commentValidationSchema), updateComment) // Update a comment
  .delete(deleteComment); // Delete a comment

export default router;
