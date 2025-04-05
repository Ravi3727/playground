import { Router } from "express";
import departmentRouter from "./department.route.js";
import teamRouter from "./team.route.js";
import resourceRouter from "./resource.route.js";
import userRouter from "./user.route.js";

const router = Router();
router.use("/department", departmentRouter);
router.use("/team", teamRouter);
router.use("/user", userRouter);
router.use("/resources", resourceRouter);
// Add any other routes here
// router.use("/anotherRoute", anotherRouter);

export default router;