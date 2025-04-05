import {Types} from "mongoose";
import { z } from "zod";

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
    message : "Invalid ObjectId"
})

const departmentSchema = z.object({
    name: z.string().min(3, "Department name must be at least 3 characters long"),
    shortDescription: z.string().max(48, "Department description must be at max 48 characters long"),
    longDescription : z.string(),
    numberOfMembers : z.number().optional(),
    departmentHead : objectIdSchema.optional(),
    departmentCohead : z.array(objectIdSchema).optional()
});

const updateDepartmentSchema = departmentSchema.partial();

export {
    departmentSchema,
    updateDepartmentSchema
};
