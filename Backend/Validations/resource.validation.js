import { z } from "zod";

// Resource validation schema for creation
export const resourceValidationSchema = z.object({
  userId: z.string().min(1, "Resource must be shared by a user."),
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  resourceUrl: z
    .array(z.string().url("Each resource URL must be a valid URL"))
    .nonempty("At least one resource URL is required"),
  tag: z.enum([
    "AI/ML",
    "DSA/CP",
    "Web Dev",
    "App Dev",
    "UI/UX",
    "Cyber Security",
    "Open Source",
    "Other",
  ]),
});

// Resource validation schema for updates (all fields optional)
export const resourceUpdateValidationSchema = resourceValidationSchema
  .partial()
  .extend({
    // Add isVerified only to the update schema
    isVerified: z.boolean().optional(),
  });

// Comment validation schema
export const commentValidationSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  comment: z.string().trim().min(1, "Comment text is required"),
});


