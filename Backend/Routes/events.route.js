import { Router } from "express";
import { verifyClerkAuth, authorizeRoles, verifyEventAccess } from "../Middlewares/clerkAuth.js"
import validate from "../Middlewares/validate.js";
import { createEventSchema, updateEventSchema } from "../Validations/event.validation.js";
import {handleCreateEvent, handleGetAllEvents, handleDeleteEvent, handleUpdateEvent, handleUserRegistration} from "../Controllers/events.controller.js";
const router = Router();

router.get("/", verifyEventAccess ,handleGetAllEvents);
router.post("/create", verifyClerkAuth, authorizeRoles("admin"), verifyEventAccess ,validate(createEventSchema), handleCreateEvent);
router.patch("/update/:id",  verifyClerkAuth, authorizeRoles("admin"), verifyEventAccess ,validate(updateEventSchema), handleUpdateEvent);
router.patch("/register/:id", verifyClerkAuth, authorizeRoles("admin" , "member") , handleUserRegistration);
router.delete("/delete/:id", handleDeleteEvent);

export default router;
