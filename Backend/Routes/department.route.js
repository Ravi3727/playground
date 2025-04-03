const validateSchema  = require("../Middlewares/validate.middleware");
const { Router } = require("express");
const {departmentSchema, updateDepartmentSchema}  = require("../Validations/department.validation");
const { postDepartment, getDepartment, getDepartmentById, updateDepartment } = require("../Controllers/department.controller");

const router = Router();

router.route("/").post(validateSchema(departmentSchema), postDepartment);
// Middleware required for authentication, should be put before validdate Schema middleware
// Middleware should return status 403 if not authenticated.

router.route("/").get(getDepartment);
router.route("/:id").get(getDepartmentById);
router.route("/:id").put(validateSchema(updateDepartmentSchema), updateDepartment);
// Middleware required for authentication, should be put before validdate Schema middleware
// Middleware should return status 403 if not authenticated.

module.exports = router;
