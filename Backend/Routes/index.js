import { Router } from "express";
const router = Router();
import departmentRouter from "./department.route.js";
import teamRouter from "./team.route.js";
import signupRouter from "./signup.route.js";

router.use("/department", departmentRouter);
router.use("/team", teamRouter);
router.use("/signup", signupRouter);

export default router;