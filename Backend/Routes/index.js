import { Router } from "express";
import departmentRouter from "./department.route.js";
import teamRouter from "./team.route.js";
import signupRouter from "./signup.route.js";
import projectRouter from "./projectRoutes.js";
import { verifyClerkAuth } from "../Middlewares/clerkAuth.js";

const router = Router();

router.use("/department", verifyClerkAuth, departmentRouter);
router.use("/team", verifyClerkAuth, teamRouter);
router.use("/signup", signupRouter);
router.use("/projects", verifyClerkAuth, projectRouter);

export default router;