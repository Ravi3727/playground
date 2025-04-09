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

// Public routes
router.get("/", getResources); // Get all resources
router.get("/:id", getResource); // Get a specific resource by ID
router.get("/:resourceId/comments", getComments); // Get all comments for a resource

// Protected routes requiring authentication
// 1. CRUD operations for resources
router.post("/", 
  verifyClerkAuth, 
  validate(resourceValidationSchema), 
  createResource
); // Create a new resource

router.put("/:id", 
  verifyClerkAuth, 
  validate(resourceUpdateValidationSchema), 
  updateResource
); // Update a specific resource by ID

router.delete("/:id", 
  verifyClerkAuth, 
  deleteResource
); // Delete a specific resource by ID

// 2. Like functionality
router.post("/:id/like", 
  verifyClerkAuth, 
  toggleLike
);

// 3. CRUD operations for comments
router.post("/:resourceId/comments", 
  verifyClerkAuth, 
  validate(commentValidationSchema), 
  createComment
); // Create a new comment
  
router.put("/:resourceId/comments/:commentId", 
  verifyClerkAuth, 
  validate(commentValidationSchema), 
  updateComment
); // Update a comment

router.delete("/:resourceId/comments/:commentId", 
  verifyClerkAuth, 
  deleteComment
); // Delete a comment

export default router;