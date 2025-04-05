import express from 'express'
import { signUp } from '../Controllers/demo.js';

const router = express.Router();

router.post('/api/v1/sign-up', signUp);

export default router;