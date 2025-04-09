import { Router } from "express";
import { signUp } from "../Controllers/signup.controller.js";

const router = Router();

router.post("/", signUp);

export default router;