import { Router } from "express";
import validate from "../Middlewares/validate.js";
import { createEventSchema, updateEventSchema } from "../Validations/event.validation.js";
import {handleCreateEvent, handleGetAllEvents, handleDeleteEvent, handleUpdateEvent, handleUserRegistration} from "../Controllers/events.controller.js";
const router = Router();

router.get("/", handleGetAllEvents);
router.post("/create", validate(createEventSchema), handleCreateEvent);
router.patch("/update/:id", validate(updateEventSchema), handleUpdateEvent);
router.patch("/register/:id", handleUserRegistration);
router.delete("/delete/:id", handleDeleteEvent);

export default router;
