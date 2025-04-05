import express from 'express'
import { signUp } from '../Controllers/signup.controller.js';

const router = express.Router();

router.post('/', signUp);

export default router;