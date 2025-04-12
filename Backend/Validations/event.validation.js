import { z } from "zod";
import { Types } from "mongoose";

// ObjectId validator
const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

// Reusable enums
const departmentEnum = z.enum([
  "web dev",
  "cybersecurity",
  "AI/ML",
  "Open Source",
  "App dev",
  "UI/UX",
]);

const eventTypeEnum = z.enum([
  "Hackathon",
  "Speaker Session",
  "Workshop",
  "Meetup",
]);

const winnerPositionEnum = z.enum(["1st", "2nd", "3rd"]);

// Winner object
const winnerSchema = z.object({
  user_id: objectIdSchema,
  position: winnerPositionEnum,
});

// Venue schema
const venueSchema = z.object({
  mode: z.enum(["online", "offline"]),
  place: z.string().min(1, "Venue place is required"),
});

// Main event schema
const createEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  on_date: z.coerce.date({ invalid_type_error: "Invalid date format" }),
  venue: venueSchema,
  department: z.array(departmentEnum).min(1, "At least one department is required"),
  type_of_event: eventTypeEnum,
  createdBy: objectIdSchema,
  registered_user_id: z.array(objectIdSchema).optional(),
  winners: z.array(winnerSchema).optional(),
});

const updateEventSchema = createEventSchema.partial();

export { createEventSchema, updateEventSchema }; 