import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getProjectsByCategory,
  getUserProjects,
  updateProject,
  deleteProject,
} from "../Controllers/projectController.js";
import { verifyClerkAuth } from "../Middlewares/clerkAuth.js";

const router = Router();

router.post("/", verifyClerkAuth, createProject);
router.get("/", verifyClerkAuth, getAllProjects);
router.get("/category/:category", verifyClerkAuth, getProjectsByCategory);
router.get("/user", verifyClerkAuth, getUserProjects);
router.put("/:id", verifyClerkAuth, updateProject);
router.delete("/:id", verifyClerkAuth, deleteProject);

export default router;
