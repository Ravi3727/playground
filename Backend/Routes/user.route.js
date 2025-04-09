import express from "express";
import { signUp } from "../Controllers/user.controller.js";

const router = Router();

router.post("/sign-up", signUp);
router.get("/fetch", getUser);

export default router;
