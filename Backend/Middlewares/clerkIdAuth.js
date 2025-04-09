// import clerk from "@clerk/clerk-sdk-node";
const clerk = (await import("@clerk/clerk-sdk-node")).default;
import asyncHandler from "express-async-handler";
import User from "../Models/user.model.js";

// Middleware to verify Clerk authentication using clerkId
export const verifyClerkAuth = asyncHandler(async (req, res, next) => {
    try {
        const clerkId = req.header("clerk-id");
        if (!clerkId) {
            return res.status(401).json({ success: false, message: "Unauthorized: Clerk ID is missing" });
        }

        // Fetch user from Clerk
        const clerkUser = await clerk.users.getUser(clerkId);
        if (!clerkUser) {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid Clerk ID" });
        }

        // Match Clerk user with local User model
        const user = await User.findOne({ clerk_id: clerkId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found in local database" });
        }

        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        console.error("Clerk authentication error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});