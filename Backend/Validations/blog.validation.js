import { z } from "zod";

// Define allowed tags
const allowedTags = ["AI/ML", "DSA/CP", "Web Dev", "App Dev", "UI/UX", "Cyber security"];

export const blogschema = z.object({
  title: z
    .string({ required_error: "TITLE IS REQUIRED" })
    .trim()
    .min(2, { message: "TITLE MUST BE OF 2 CHARS" }),

  description: z
    .string({ required_error: "DESCRIPTION IS REQUIRED" })
    .trim()
    .min(10, { message: "DESCRIPTION MUST BE OF 10 CHARS" }),

  blog: z
    .string({ required_error: "BLOG IS REQUIRED" })
    .trim()
    .min(10, { message: "BLOG MUST BE OF 10 CHARS" }),

  tag: z.enum(allowedTags, {
    required_error: "TAG IS REQUIRED",
    invalid_type_error: "Invalid tag selected",
  }),

  isVerified: z.boolean().optional().default(false),

  likedBy: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/)) // MongoDB ObjectId validation
    .optional()
    .default([]),

  writer: z
    .string({ required_error: "WRITER ID IS REQUIRED" })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid writer ObjectId")
    .optional(),
});
export const commentValidationSchema = z.object({
  userId: z.string().min(1, "User ID is required").optional(),
  comment: z.string().trim().min(1, "Comment text is required"),
});

