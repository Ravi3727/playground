import { Router } from "express";
import departmentRouter from "./department.route.js";
import teamRouter from "./team.route.js";
import signupRouter from "./signup.route.js";
import { verifyClerkAuth } from "../Middlewares/clerkIdAuth.js";

router.use("/department", verifyClerkAuth, departmentRouter);
router.use("/team", verifyClerkAuth, teamRouter);
router.use("/signup", signupRouter);

export default router;