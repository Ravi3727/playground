import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectsByCategory,
  getUserProjects,
  updateProject,
  deleteProject,
} from '../Controllers/projectController.js';
import { verifyClerkAuth } from '../Middlewares/clerkIdAuth.js';

const router = express.Router();

router.post('/', verifyClerkAuth, createProject);
router.get('/', verifyClerkAuth, getAllProjects);
router.get('/category/:category', verifyClerkAuth, getProjectsByCategory);
router.get('/user', verifyClerkAuth, getUserProjects);
router.put('/:id', verifyClerkAuth, updateProject);
router.delete('/:id', verifyClerkAuth, deleteProject);

export default router;
