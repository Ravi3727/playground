const express = require("express");
const {handleCreateEvent, handleGetAllEvents, handleDeleteEvent, handleUpdateEvent, handleUserRegistration} = require("../Controllers/events");
const router = express.Router();

router.get("/", handleGetAllEvents);
router.post("/create", handleCreateEvent);
router.patch("/update/:id", handleUpdateEvent);
router.patch("/register/:id", handleUserRegistration);
router.delete("/delete/:id", handleDeleteEvent);

module.exports = router;
