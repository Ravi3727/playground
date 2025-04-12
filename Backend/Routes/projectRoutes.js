import express from 'express';
import projectController from '../Controllers/projectController.js';
import { verifyClerkAuth } from '../Middlewares/clerkAuth.js';

const {
  createProject,
  getAllProjects,
  getProjectsByCategory,
  getUserProjects,
  updateProject,
  deleteProject,
} = projectController;

const router = express.Router();

router.post('/', verifyClerkAuth, createProject);
router.get('/',  getAllProjects);
router.get('/category/:category', verifyClerkAuth, getProjectsByCategory);
router.get('/user', verifyClerkAuth, getUserProjects);
router.put('/:id', verifyClerkAuth, updateProject);
router.delete('/:id', verifyClerkAuth, deleteProject);

export default router;