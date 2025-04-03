const { Router } = require("express");
const { getTeam } = require("../Controllers/team.controller");

const router = Router();


router.route("/").get(getTeam);

module.exports = router;
