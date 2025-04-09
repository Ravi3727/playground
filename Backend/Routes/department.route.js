import { Router } from "express";
import validateSchema from "../Middlewares/validate.middleware.js";
import {
  departmentSchema,
  updateDepartmentSchema,
} from "../Validations/department.validation.js";
import {
  postDepartment,
  getDepartment,
  getDepartmentById,
  updateDepartment,
} from "../Controllers/department.controller.js";
import { verifyClerkAuth } from "../Middlewares/auth.js";

const router = Router();

router
  .route("/")
  .post(verifyClerkAuth, validateSchema(departmentSchema), postDepartment)
  .get(verifyClerkAuth, getDepartment);

router
  .route("/:id")
  .get(verifyClerkAuth, getDepartmentById)
  .put(verifyClerkAuth, validateSchema(updateDepartmentSchema), updateDepartment);

export default router;
