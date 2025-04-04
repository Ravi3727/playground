const express = require("express");
const {handleCreateEvent, handleGetAllEvents, handleDeleteEvent, handleUpdateEvent, handleUserRegistration} = require("../Controllers/events");
const router = express.Router();

router.get("/", handleGetAllEvents);
router.post("/create", handleCreateEvent);
router.patch("/update", handleUpdateEvent);
router.patch("/register", handleUserRegistration);
router.delete("/delete", handleDeleteEvent);

module.exports = router;
