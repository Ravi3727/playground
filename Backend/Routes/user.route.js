import express from "express";
import { getUser, signUp } from "../Controllers/user.controller.js";

const router = express.Router();

router.post("/sign-up", signUp);

export default router;
