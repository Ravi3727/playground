import validateSchema from "../Middlewares/validate.middleware.js";
import { Router } from "express";
import { departmentSchema, updateDepartmentSchema } from "../Validations/department.validation.js";
import { postDepartment, getDepartment, getDepartmentById, updateDepartment } from "../Controllers/department.controller.js";
import { verifyClerkAuth } from "../Middlewares/clerkIdAuth.js";

const router = Router();

router.route("/").post(verifyClerkAuth, validateSchema(departmentSchema), postDepartment);
router.route("/").get(verifyClerkAuth, getDepartment);
router.route("/:id").get(verifyClerkAuth, getDepartmentById);
router.route("/:id").put(verifyClerkAuth, validateSchema(updateDepartmentSchema), updateDepartment);


export default router;
