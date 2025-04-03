const { Router } = require("express");
const router = Router();
const departmentRouter =require("./department.route");
const teamRouter = require("./team.route");

router.use("/department", departmentRouter);
router.use("/team", teamRouter);

module.exports = router;