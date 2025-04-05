import { Router } from "express";
import { getTeam } from "../Controllers/team.controller.js";

const router = Router();


router.route("/").get(getTeam);

export default router;
