import { Router } from "express";
import departmentRouter from "./department.route.js";
import teamRouter from "./team.route.js";

// import signupRouter from "./signup.route.js";
import { verifyClerkAuth } from "../Middlewares/clerkAuth.js";

const router = Router();

router.use("/department", verifyClerkAuth, departmentRouter);
router.use("/team", verifyClerkAuth, teamRouter);
// router.use("/signup", signupRouter);

import blogRouter from "./blog.route.js"

import resourceRouter from "./resource.route.js";
import userRouter from "./user.route.js";
import eventRoutes from "./events.route.js";
import doubtRoutes from "./doubt.route.js";
import projectRouter from "./projectRoutes.js";

router.use("/department", departmentRouter);
router.use("/team", teamRouter);
router.use("/blogs",blogRouter)
router.use("/user", userRouter);
router.use("/resources", resourceRouter);
router.use("/events", eventRoutes);
router.use("/doubts", doubtRoutes);
router.use("/projects", verifyClerkAuth, projectRouter);
// Add any other routes here
// router.use("/anotherRoute", anotherRouter);


export default router;