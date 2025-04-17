import express from "express"
import { createDoubt, getAllDoubts, updateDoubt, deleteDoubt, createReply, getAllReplies, updateReply, deleteReply, doubtLikes, replyLikes } from "../Controllers/doubt.controller.js"
import { verifyClerkAuth } from "../Middlewares/clerkAuth.js"

const router = express.Router()

router.post("/create", verifyClerkAuth, createDoubt);
router.get("/get", verifyClerkAuth, getAllDoubts);
router.put("/update/:id", verifyClerkAuth, updateDoubt);
router.delete("/delete/:id", verifyClerkAuth, deleteDoubt);

router.post("/:id/reply", verifyClerkAuth, createReply);
router.get("/:id/replies", verifyClerkAuth, getAllReplies);
router.put("/:id/replies/:rid/update", verifyClerkAuth, updateReply);
router.delete("/:id/replies/:rid/delete", verifyClerkAuth, deleteReply);

router.put("/:id/like", verifyClerkAuth, doubtLikes);
router.put("/:id/replies/:rid/like", verifyClerkAuth, replyLikes);

export default router;