import validateSchema from "../Middlewares/validate.middleware.js";
import { Router } from "express";
import { departmentSchema, updateDepartmentSchema } from "../Validations/department.validation.js";
import { postDepartment, getDepartment, getDepartmentById, updateDepartment } from "../Controllers/department.controller.js";
<<<<<<< HEAD

const router = Router();

router.route("/").post(validateSchema(departmentSchema), postDepartment);
// Middleware required for authentication, should be put before validdate Schema middleware
// Middleware should return status 403 if not authenticated.

router.route("/").get(getDepartment);
router.route("/:id").get(getDepartmentById);
router.route("/:id").put(validateSchema(updateDepartmentSchema), updateDepartment);
// Middleware required for authentication, should be put before validdate Schema middleware
// Middleware should return status 403 if not authenticated.
=======
import { verifyClerkAuth } from "../Middlewares/clerkIdAuth.js";

const router = Router();

router.route("/").post(verifyClerkAuth, validateSchema(departmentSchema), postDepartment);
router.route("/").get(verifyClerkAuth, getDepartment);
router.route("/:id").get(verifyClerkAuth, getDepartmentById);
router.route("/:id").put(verifyClerkAuth, validateSchema(updateDepartmentSchema), updateDepartment);
>>>>>>> parent of da71cb8 (Merge pull request #23 from AYUSH-0305/ayushman)

export default router;
