import asyncHandler from "express-async-handler";
import { clerkClient } from "@clerk/clerk-sdk-node";
import User from "../Models/user.model.js";

// Middleware to verify Clerk authentication
const verifyClerkAuth = asyncHandler(async (req, res, next) => {
  try {
    const sessionToken =
      req.cookies?.sessionToken ||
      req.header("Authorization")?.replace("Bearer ", "").trim();
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No session token provided",
      });
    }
    console.log("Session token:", sessionToken);
    const session = await clerkClient.sessions.getSession(sessionToken);
    if (!session) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired session token" });
    }
    const clerkUser = await clerkClient.users.getUser(session.userId);
console.log(clerkUser)
    const user = await User.findOne({ clerk_id: clerkUser.id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Clerk authentication error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// Middleware to authorize roles
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied: Insufficient permissions",
      });
    }
    next();
  };
};

// Middleware to submit a blog for approval or publish directly
const submitBlogForApproval = asyncHandler(async (req, res, next) => {
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
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// Middleware to verify event access
const verifyEventAccess = asyncHandler(async (req, res, next) => {
  try {
    if (req.method === "GET") {
      return next();
    }
    if (req.method === "POST") {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: User not authenticated",
        });
      }
      if (req.user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Access Denied: Insufficient permissions to add events",
        });
      }
      return next();
    }
    res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (error) {
    console.error("Event access error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export {
  verifyClerkAuth,
  authorizeRoles,
  submitBlogForApproval,
  verifyEventAccess,
};