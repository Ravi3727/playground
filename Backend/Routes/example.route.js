import { Router } from "express";
import asyncHandler from "express-async-handler";
import { verifyClerkAuth } from "../Middlewares/clerkIdAuth.js";

const router = Router();

router.post(
  "/example",
  verifyClerkAuth,
  asyncHandler(async (req, res) => {
    const { clerk_id, data } = req.body;

    if (!clerk_id || !data) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    console.log("Clerk ID:", clerk_id);
    console.log("Data received:", data);

    res.status(201).json({ success: true, message: "Data saved successfully" });
  })
);

export default router;
