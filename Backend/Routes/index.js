import { Router } from "express";
const router = Router();
import departmentRouter from "./department.route.js";
import teamRouter from "./team.route.js";
<<<<<<< HEAD
<<<<<<< HEAD
import signupRouter from "./signup.route.js";

router.use("/department", departmentRouter);
router.use("/team", teamRouter);
router.use("/signup", signupRouter);
=======

=======

>>>>>>> parent of da71cb8 (Merge pull request #23 from AYUSH-0305/ayushman)
import resourceRouter from "./resource.route.js";
import userRouter from "./user.route.js";

const router = Router();
router.use("/department", departmentRouter);
router.use("/team", teamRouter);
router.use("/user", userRouter);
router.use("/resources", resourceRouter);
// Add any other routes here
// router.use("/anotherRoute", anotherRouter);

<<<<<<< HEAD
>>>>>>> parent of da71cb8 (Merge pull request #23 from AYUSH-0305/ayushman)
=======
>>>>>>> parent of da71cb8 (Merge pull request #23 from AYUSH-0305/ayushman)

export default router;