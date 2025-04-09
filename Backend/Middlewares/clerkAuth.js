<<<<<<< HEAD
const asyncHandler = require("express-async-handler");
const { sessions, users } = require("@clerk/clerk-sdk-node");
const { User } = require("../Models/user.model");
const clerkClient = require("@clerk/clerk-sdk-node");
=======
import asyncHandler from "express-async-handler";
import { clerkClient } from "@clerk/clerk-sdk-node";
import User from "../Models/user.model.js";
>>>>>>> parent of da71cb8 (Merge pull request #23 from AYUSH-0305/ayushman)

// Middleware to verify Clerk authentication
const verifyClerkAuth = asyncHandler(async (req, res, next) => {
    try {
        const sessionToken = req.cookies?.sessionToken || req.header("Authorization")?.replace("Bearer ", "").trim();
        if (!sessionToken) {
            return res.status(401).json({ success: false, message: "Unauthorized: No session token provided" });
        }
        const session = await sessions.getSession(sessionToken);
        if (!session) {
            return res.status(401).json({ success: false, message: "Invalid or expired session token" });
        }
        const clerkUser = await users.getUser(session.userId);
        const user = await User.findOne({ clerkId: clerkUser.id });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Clerk authentication error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Middleware to authorize roles
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "Access Denied: Insufficient permissions" });
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
        // If user is an admin, publish the blog immediately
        if (req.user.role === "admin") {
            req.blogStatus = "published";
            return next();
        }
        // Otherwise, submit the blog for admin approval
        const approver = await User.findOne({ role: "admin" });
        if (approver) {
            approver.verificationQueue = approver.verificationQueue || [];
            approver.verificationQueue.push({
                blogId: req.body.blogId,
                title: req.body.title,
                submittedBy: req.user.id
            });
            await approver.save();
        }
        return res.json({ message: "Blog submitted for approval" });
    } catch (error) {
        console.log("Blog approval error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Middleware to verify event access
const verifyEventAccess = asyncHandler(async (req, res, next) => {
    try {
        // Allow all users to view events
        if (req.method === "GET") {
            return next();
        }
        // Only allow admins to add events
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

module.exports = { verifyClerkAuth, authorizeRoles, submitBlogForApproval, verifyEventAccess };