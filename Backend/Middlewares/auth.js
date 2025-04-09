import User from "../Models/user.model.js";
import asyncHandler from "../API/asyncHandler.js";
import * as Clerk from "@clerk/clerk-sdk-node"; // Correct way to import Clerk SDK in ESM

console.log("Clerk Sessions Object:", Clerk.sessions);

export const verifyClerkAuth = asyncHandler(async (req, res, next) => {
  try {
    const sessionToken =
      req.cookies?.sessionToken ||
      req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!sessionToken) {
      console.error("Session token missing");
      return res.status(401).json({ success: false, message: "Unauthorized: No session token provided" });
    }

    console.log("Session token:", sessionToken);

    const session = await Clerk.sessions.getSession(sessionToken); // Corrected
    if (!session) {
      console.error("Invalid or expired session token");
      return res.status(401).json({ success: false, message: "Invalid or expired session token" });
    }

    const clerkUser = await Clerk.users.getUser(session.userId); // Corrected
    if (!clerkUser) {
      console.error("Clerk user not found");
      return res.status(404).json({ success: false, message: "User not found in Clerk" });
    }

    const user = await User.findOne({ clerk_id: clerkUser.id });
    if (!user) {
      console.error("User not found in local database");
      return res.status(404).json({ success: false, message: "User not found in local database" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Clerk authentication error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Access Denied: Insufficient permissions" });
    }
    next();
  };
};

export const submitBlogForApproval = asyncHandler(async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (req.user.role === "admin") {
      req.blogStatus = "published";
      return next();
    }
    const approver = await User.findOne({ role: "admin" });
    if (approver) {
      approver.verificationQueue = approver.verificationQueue || [];
      approver.verificationQueue.push({
        blogId: req.body.blogId,
        title: req.body.title,
        submittedBy: req.user.id,
      });
      await approver.save();
    }
    return res.json({ message: "Blog submitted for approval" });
  } catch (error) {
    console.log("Blog approval error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export const verifyEventAccess = asyncHandler(async (req, res, next) => {
  try {
    if (req.method === "GET") {
      return next();
    }
    if (req.method === "POST") {
      if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized: User not authenticated" });
      }
      if (req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Access Denied: Insufficient permissions to add events" });
      }
      return next();
    }
    res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (error) {
    console.error("Event access error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
